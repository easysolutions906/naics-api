# NAICS/SIC Industry Code Lookup API

Look up NAICS 2022 and SIC 1987 industry codes with keyword search, sector browsing, batch lookup, and NAICS-to-SIC crosswalk mapping.

## Data

- **NAICS 2022**: ~1,800 codes from the US Census Bureau (2-digit sectors through 6-digit national industries)
- **SIC 1987**: ~1,000 codes from the Standard Industrial Classification system (still used in SEC filings, OSHA, and many legacy systems)
- **Crosswalk**: ~130 NAICS-to-SIC mappings for the most commonly used codes

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/` | API info and endpoint list |
| GET | `/health` | Health check |
| GET | `/data-info` | Data build date and record counts |
| GET | `/lookup?code=541511` | Look up a NAICS code |
| GET | `/search?q=software&limit=25` | Search NAICS codes by keyword |
| GET | `/sector/:code` | List all codes in a NAICS sector |
| GET | `/sic/lookup?code=7372` | Look up a SIC code |
| GET | `/sic/search?q=software` | Search SIC codes by keyword |
| GET | `/crosswalk?naics=541511` | NAICS to SIC crosswalk |
| POST | `/lookup/batch` | Batch lookup (NAICS or SIC) |
| GET | `/stats` | Code counts by sector and level |

## MCP Tools

When running as an MCP server (stdio mode or via `/mcp` endpoint):

- `naics_lookup` — Look up a NAICS code with hierarchy and crosswalk
- `naics_search` — Search NAICS codes by keyword
- `sic_lookup` — Look up a SIC code with hierarchy and crosswalk
- `sic_search` — Search SIC codes by keyword

## Quick Start

```bash
# Generate data files
npm run build-data

# Install dependencies
npm install

# Run locally (HTTP mode)
PORT=3000 node src/index.js

# Run as MCP server (stdio mode)
node src/index.js
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `PORT` | No | HTTP port (if set, runs in HTTP mode; if unset, runs in MCP stdio mode) |
| `ADMIN_SECRET` | No | Secret for admin key management endpoints |
| `STRIPE_SECRET_KEY` | No | Stripe API key for billing |
| `STRIPE_WEBHOOK_SECRET` | No | Stripe webhook signature verification |

## Data Refresh

```bash
npm run build-data
```

This runs the data generation scripts and writes `meta.json` with the build date. The NAICS codes are updated by Census Bureau on a 5-year cycle (next revision: 2027). SIC codes have not been updated since 1987.

## Deploy to Railway

```bash
railway up
```

The `Procfile` tells Railway to run `node src/index.js`. Set the `PORT` environment variable in Railway's dashboard (Railway sets it automatically).
