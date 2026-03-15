#!/usr/bin/env node

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express from 'express';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';

import {
  naicsLookup,
  naicsSearch,
  naicsSector,
  sicLookup,
  sicSearch,
  crosswalkLookup,
  batchLookup,
  buildStats,
  totalNaics,
  totalSic,
  totalCrosswalk,
  meta,
} from './lookup.js';

import {
  PLANS,
  authMiddleware,
  incrementUsage,
  createKey,
  revokeKey,
} from './keys.js';

import { createCheckoutSession, handleWebhook } from './stripe.js';

// --- Express API ---

const buildExpressApp = () => {
  const app = express();
  app.use(express.json({ limit: '1mb' }));
  app.use((_req, res, next) => {
    res.set({
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
    });
    next();
  });

  // GET / — API info
  app.get('/', (_req, res) => {
    res.json({
      name: 'NAICS/SIC Industry Code Lookup API',
      version: '1.0.0',
      description: 'Look up NAICS 2022 and SIC industry codes with keyword search, sector browsing, and crosswalk mapping',
      data: {
        naicsVersion: meta.naicsVersion,
        sicVersion: meta.sicVersion,
        naicsCodes: totalNaics,
        sicCodes: totalSic,
        crosswalkMappings: totalCrosswalk,
        buildDate: meta.buildDate,
      },
      endpoints: {
        'GET /': 'API info',
        'GET /health': 'Health check',
        'GET /data-info': 'Data build date and record counts',
        'GET /lookup?code=541511': 'Look up a NAICS code',
        'GET /search?q=software&limit=25': 'Search NAICS codes by keyword',
        'GET /sector/:code': 'List all codes in a NAICS sector (2-digit)',
        'GET /sic/lookup?code=7372': 'Look up a SIC code',
        'GET /sic/search?q=software': 'Search SIC codes by keyword',
        'GET /crosswalk?naics=541511': 'NAICS to SIC crosswalk',
        'POST /lookup/batch': 'Batch lookup (NAICS or SIC)',
        'GET /stats': 'Code counts by sector and level',
      },
    });
  });

  // GET /health
  app.get('/health', (_req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      naicsCodes: totalNaics,
      sicCodes: totalSic,
    });
  });

  // GET /data-info
  app.get('/data-info', (_req, res) => {
    res.json({
      naicsVersion: meta.naicsVersion,
      sicVersion: meta.sicVersion,
      naicsCodes: totalNaics,
      sicCodes: totalSic,
      crosswalkMappings: totalCrosswalk,
      buildDate: meta.buildDate,
      source: meta.source,
    });
  });

  // GET /lookup — NAICS code lookup
  app.get('/lookup', authMiddleware, (req, res) => {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Query parameter "code" is required' });
    }

    const result = naicsLookup(code);
    if (!result) {
      return res.status(404).json({ error: `NAICS code "${code}" not found`, code });
    }

    incrementUsage(req.identifier, 1);
    res.json(result);
  });

  // GET /search — NAICS keyword search
  app.get('/search', authMiddleware, (req, res) => {
    const { q, limit } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const result = naicsSearch(q, limit);
    incrementUsage(req.identifier, 1);
    res.json(result);
  });

  // GET /sector/:code — list codes in a sector
  app.get('/sector/:code', authMiddleware, (req, res) => {
    const { code } = req.params;
    const result = naicsSector(code);

    if (!result) {
      return res.status(404).json({ error: `Sector "${code}" not found` });
    }

    incrementUsage(req.identifier, 1);
    res.json(result);
  });

  // GET /sic/lookup — SIC code lookup
  app.get('/sic/lookup', authMiddleware, (req, res) => {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({ error: 'Query parameter "code" is required' });
    }

    const result = sicLookup(code);
    if (!result) {
      return res.status(404).json({ error: `SIC code "${code}" not found`, code });
    }

    incrementUsage(req.identifier, 1);
    res.json(result);
  });

  // GET /sic/search — SIC keyword search
  app.get('/sic/search', authMiddleware, (req, res) => {
    const { q, limit } = req.query;

    if (!q) {
      return res.status(400).json({ error: 'Query parameter "q" is required' });
    }

    const result = sicSearch(q, limit);
    incrementUsage(req.identifier, 1);
    res.json(result);
  });

  // GET /crosswalk — NAICS to SIC crosswalk
  app.get('/crosswalk', authMiddleware, (req, res) => {
    const { naics } = req.query;

    if (!naics) {
      return res.status(400).json({ error: 'Query parameter "naics" is required' });
    }

    const result = crosswalkLookup(naics);
    if (!result) {
      return res.status(404).json({ error: `No crosswalk mapping found for NAICS code "${naics}"` });
    }

    incrementUsage(req.identifier, 1);
    res.json(result);
  });

  // POST /lookup/batch — batch lookup
  app.post('/lookup/batch', authMiddleware, (req, res) => {
    const { codes } = req.body || {};

    if (!codes || !Array.isArray(codes) || codes.length === 0) {
      return res.status(400).json({ error: 'Request body must include a non-empty "codes" array' });
    }

    if (codes.length > req.plan.batchLimit) {
      return res.status(400).json({
        error: `Maximum ${req.plan.batchLimit} codes per batch on ${req.planName} plan`,
        limit: req.plan.batchLimit,
        upgrade: req.planName === 'free' ? 'Add an API key to increase batch size' : null,
      });
    }

    const results = batchLookup(codes);
    incrementUsage(req.identifier, codes.length);
    res.json({ total: results.length, results });
  });

  // GET /stats
  app.get('/stats', (_req, res) => {
    res.json(buildStats());
  });

  // --- Admin endpoints ---

  const adminAuth = (req, res, next) => {
    const secret = process.env.ADMIN_SECRET;
    if (!secret) { return res.status(503).json({ error: 'Admin not configured' }); }
    if (req.headers['x-admin-secret'] !== secret) {
      return res.status(401).json({ error: 'Invalid admin secret' });
    }
    next();
  };

  app.post('/admin/keys', adminAuth, (req, res) => {
    const { plan = 'pro', email = null } = req.body || {};
    if (!PLANS[plan]) {
      return res.status(400).json({ error: `Invalid plan. Options: ${Object.keys(PLANS).join(', ')}` });
    }
    const result = createKey(plan, email);
    res.json(result);
  });

  app.delete('/admin/keys/:key', adminAuth, (req, res) => {
    const revoked = revokeKey(req.params.key);
    res.json({ revoked });
  });

  app.get('/admin/plans', adminAuth, (_req, res) => {
    res.json(PLANS);
  });

  // --- Checkout ---

  app.post('/checkout', async (req, res) => {
    const { plan, successUrl, cancelUrl } = req.body || {};
    if (!plan || !PLANS[plan] || plan === 'free') {
      return res.status(400).json({
        error: `Invalid plan. Options: ${Object.keys(PLANS).filter((p) => p !== 'free').join(', ')}`,
      });
    }
    try {
      const session = await createCheckoutSession(plan, successUrl, cancelUrl);
      res.json(session);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  // --- Stripe webhook ---

  app.post('/webhook/stripe', express.raw({ type: 'application/json' }), (req, res) => {
    try {
      const result = handleWebhook(req.body.toString(), req.headers['stripe-signature']);
      res.json({ received: true, result: result || null });
    } catch (err) {
      console.error('Stripe webhook error:', err.message);
      res.status(400).json({ error: 'Webhook processing failed' });
    }
  });

  return app;
};

// --- MCP Server ---

const buildMcpServer = () => {
  const server = new McpServer({
    name: 'naics-sic-lookup',
    version: '1.0.0',
  });

  server.tool(
    'naics_lookup',
    `Look up a NAICS (North American Industry Classification System) 2022 code. Returns the code title, level (sector/subsector/industry group/industry/national industry), hierarchy, children, and SIC crosswalk if available. Database contains ${totalNaics.toLocaleString()} codes.`,
    { code: z.string().describe('NAICS code to look up (2-6 digits, e.g., "541511", "54", "31-33")') },
    async ({ code }) => {
      const result = naicsLookup(code);
      if (!result) {
        return { content: [{ type: 'text', text: JSON.stringify({ error: `NAICS code "${code}" not found` }) }] };
      }
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    },
  );

  server.tool(
    'naics_search',
    `Search ${totalNaics.toLocaleString()} NAICS 2022 industry codes by keyword. Returns matching codes sorted by relevance. Useful for finding the right NAICS code when you know the industry but not the code.`,
    {
      query: z.string().describe('Search term (e.g., "software", "restaurant", "construction")'),
      limit: z.number().optional().describe('Max results to return (default 25, max 100)'),
    },
    async ({ query, limit }) => ({
      content: [{ type: 'text', text: JSON.stringify(naicsSearch(query, limit), null, 2) }],
    }),
  );

  server.tool(
    'sic_lookup',
    `Look up an SIC (Standard Industrial Classification) code. Returns the code title, level, hierarchy, children, and NAICS crosswalk if available. Database contains ${totalSic.toLocaleString()} codes.`,
    { code: z.string().describe('SIC code to look up (2-4 digits, e.g., "7372", "73", "20")') },
    async ({ code }) => {
      const result = sicLookup(code);
      if (!result) {
        return { content: [{ type: 'text', text: JSON.stringify({ error: `SIC code "${code}" not found` }) }] };
      }
      return { content: [{ type: 'text', text: JSON.stringify(result, null, 2) }] };
    },
  );

  server.tool(
    'sic_search',
    `Search ${totalSic.toLocaleString()} SIC industry codes by keyword. Returns matching codes sorted by relevance. SIC codes are still used in many regulatory filings and older systems.`,
    {
      query: z.string().describe('Search term (e.g., "software", "banking", "manufacturing")'),
      limit: z.number().optional().describe('Max results to return (default 25, max 100)'),
    },
    async ({ query, limit }) => ({
      content: [{ type: 'text', text: JSON.stringify(sicSearch(query, limit), null, 2) }],
    }),
  );

  return server;
};

// --- Start ---

const main = async () => {
  const port = process.env.PORT;

  if (port) {
    const app = buildExpressApp();
    const mcpServer = buildMcpServer();
    const transports = {};

    app.post('/mcp', async (req, res) => {
      const sessionId = req.headers['mcp-session-id'];
      let transport = transports[sessionId];

      if (!transport) {
        transport = new StreamableHTTPServerTransport({
          sessionIdGenerator: () => randomUUID(),
        });
        transport.onclose = () => {
          if (transport.sessionId) {
            delete transports[transport.sessionId];
          }
        };
        await mcpServer.connect(transport);
        transports[transport.sessionId] = transport;
      }

      await transport.handleRequest(req, res, req.body);
    });

    app.get('/mcp', async (req, res) => {
      const sessionId = req.headers['mcp-session-id'];
      const transport = transports[sessionId];
      if (!transport) {
        res.status(400).json({ error: 'No active session. Send a POST to /mcp first.' });
        return;
      }
      await transport.handleRequest(req, res);
    });

    app.delete('/mcp', async (req, res) => {
      const sessionId = req.headers['mcp-session-id'];
      const transport = transports[sessionId];
      if (!transport) {
        res.status(400).json({ error: 'No active session.' });
        return;
      }
      await transport.handleRequest(req, res);
    });

    app.listen(parseInt(port, 10), () => {
      console.log(`NAICS/SIC Industry Code API running on port ${port}`);
      console.log(`REST endpoints: http://localhost:${port}/`);
      console.log(`MCP endpoint: http://localhost:${port}/mcp`);
    });
  } else {
    const mcpServer = buildMcpServer();
    const transport = new StdioServerTransport();
    await mcpServer.connect(transport);
  }
};

main().catch((err) => {
  console.error('Failed to start NAICS/SIC server:', err);
  process.exit(1);
});
