import { readFileSync } from 'node:fs';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = new URL('./data/', import.meta.url).pathname;

// --- Load data ---

const naicsCodes = JSON.parse(readFileSync(`${DATA_DIR}naics.json`, 'utf-8'));
const sicCodes = JSON.parse(readFileSync(`${DATA_DIR}sic.json`, 'utf-8'));
const crosswalkData = JSON.parse(readFileSync(`${DATA_DIR}crosswalk.json`, 'utf-8'));
const meta = JSON.parse(readFileSync(`${DATA_DIR}meta.json`, 'utf-8'));

// --- Index maps for fast lookup ---

const naicsMap = new Map(naicsCodes.map((c) => [c.code, c]));
const sicMap = new Map(sicCodes.map((c) => [c.code, c]));
const crosswalkByNaics = new Map();
const crosswalkBySic = new Map();

crosswalkData.forEach((entry) => {
  if (!crosswalkByNaics.has(entry.naics)) {
    crosswalkByNaics.set(entry.naics, []);
  }
  crosswalkByNaics.get(entry.naics).push(entry);

  if (!crosswalkBySic.has(entry.sic)) {
    crosswalkBySic.set(entry.sic, []);
  }
  crosswalkBySic.get(entry.sic).push(entry);
});

// --- NAICS functions ---

const naicsLookup = (code) => {
  const normalized = String(code).replace(/[^0-9-]/g, '');
  const entry = naicsMap.get(normalized);
  if (!entry) { return null; }

  // Build hierarchy
  const hierarchy = [];
  const clean = normalized.replace('-', '');
  for (let len = 2; len < clean.length; len++) {
    const parentCode = clean.slice(0, len);
    const parent = naicsMap.get(parentCode);
    if (parent) { hierarchy.push({ code: parent.code, title: parent.title, level: parent.level }); }
  }

  // Find children (one level deeper)
  const codeLen = clean.length;
  const children = naicsCodes
    .filter((c) => {
      const cClean = c.code.replace('-', '');
      return cClean.length === codeLen + 1 && cClean.startsWith(clean);
    })
    .map((c) => ({ code: c.code, title: c.title, level: c.level }));

  // Crosswalk
  const crosswalk = crosswalkByNaics.get(normalized) || [];

  return {
    ...entry,
    hierarchy,
    children,
    crosswalk: crosswalk.map((cw) => ({ sic: cw.sic, sicTitle: cw.sicTitle })),
  };
};

const naicsSearch = (query, limit = 25) => {
  const q = String(query).toLowerCase().trim();
  if (!q) { return { results: [], total: 0 }; }

  const clampedLimit = Math.min(Math.max(parseInt(limit, 10) || 25, 1), 100);

  // Score each code
  const scored = naicsCodes
    .map((entry) => {
      const titleLower = entry.title.toLowerCase();
      const codeLower = entry.code.toLowerCase();

      // Exact code match
      if (codeLower === q) { return { ...entry, score: 100 }; }
      // Code starts with query
      if (codeLower.startsWith(q)) { return { ...entry, score: 80 }; }
      // Exact title match
      if (titleLower === q) { return { ...entry, score: 90 }; }
      // Title starts with query
      if (titleLower.startsWith(q)) { return { ...entry, score: 70 }; }
      // All query words appear in title
      const words = q.split(/\s+/);
      const allMatch = words.every((w) => titleLower.includes(w));
      if (allMatch) { return { ...entry, score: 60 }; }
      // Any word matches
      const anyMatch = words.some((w) => titleLower.includes(w));
      if (anyMatch) {
        const matchCount = words.filter((w) => titleLower.includes(w)).length;
        return { ...entry, score: 30 + (matchCount / words.length) * 20 };
      }

      return null;
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.code.localeCompare(b.code));

  return {
    results: scored.slice(0, clampedLimit).map(({ score, ...rest }) => rest),
    total: scored.length,
    showing: Math.min(clampedLimit, scored.length),
  };
};

const naicsSector = (sectorCode) => {
  const normalized = String(sectorCode).replace(/[^0-9-]/g, '');
  const sector = naicsMap.get(normalized);
  if (!sector) { return null; }

  const codes = naicsCodes.filter((c) => {
    const cClean = c.code.replace('-', '');
    const nClean = normalized.replace('-', '');
    return cClean.startsWith(nClean) && c.code !== normalized;
  });

  return {
    sector: { code: sector.code, title: sector.title, level: sector.level },
    codes: codes.map((c) => ({ code: c.code, title: c.title, level: c.level })),
    total: codes.length,
  };
};

// --- SIC functions ---

const sicLookup = (code) => {
  const normalized = String(code).replace(/\D/g, '');
  const entry = sicMap.get(normalized);
  if (!entry) { return null; }

  // Build hierarchy
  const hierarchy = [];
  for (let len = 2; len < normalized.length; len++) {
    const parentCode = normalized.slice(0, len);
    const parent = sicMap.get(parentCode);
    if (parent) { hierarchy.push({ code: parent.code, title: parent.title, level: parent.level }); }
  }

  // Find children
  const children = sicCodes
    .filter((c) => c.code.length === normalized.length + 1 && c.code.startsWith(normalized))
    .map((c) => ({ code: c.code, title: c.title, level: c.level }));

  // Crosswalk
  const crosswalk = crosswalkBySic.get(normalized) || [];

  return {
    ...entry,
    hierarchy,
    children,
    crosswalk: crosswalk.map((cw) => ({ naics: cw.naics, naicsTitle: cw.naicsTitle })),
  };
};

const sicSearch = (query, limit = 25) => {
  const q = String(query).toLowerCase().trim();
  if (!q) { return { results: [], total: 0 }; }

  const clampedLimit = Math.min(Math.max(parseInt(limit, 10) || 25, 1), 100);

  const scored = sicCodes
    .map((entry) => {
      const titleLower = entry.title.toLowerCase();
      const codeLower = entry.code.toLowerCase();

      if (codeLower === q) { return { ...entry, score: 100 }; }
      if (codeLower.startsWith(q)) { return { ...entry, score: 80 }; }
      if (titleLower === q) { return { ...entry, score: 90 }; }
      if (titleLower.startsWith(q)) { return { ...entry, score: 70 }; }

      const words = q.split(/\s+/);
      const allMatch = words.every((w) => titleLower.includes(w));
      if (allMatch) { return { ...entry, score: 60 }; }

      const anyMatch = words.some((w) => titleLower.includes(w));
      if (anyMatch) {
        const matchCount = words.filter((w) => titleLower.includes(w)).length;
        return { ...entry, score: 30 + (matchCount / words.length) * 20 };
      }

      return null;
    })
    .filter(Boolean)
    .sort((a, b) => b.score - a.score || a.code.localeCompare(b.code));

  return {
    results: scored.slice(0, clampedLimit).map(({ score, ...rest }) => rest),
    total: scored.length,
    showing: Math.min(clampedLimit, scored.length),
  };
};

// --- Crosswalk ---

const crosswalkLookup = (naicsCode) => {
  const normalized = String(naicsCode).replace(/\D/g, '');
  const matches = crosswalkByNaics.get(normalized);
  if (!matches || matches.length === 0) { return null; }

  return {
    naics: normalized,
    naicsTitle: naicsMap.get(normalized)?.title || null,
    sicMappings: matches.map((m) => ({ sic: m.sic, sicTitle: m.sicTitle })),
  };
};

// --- Batch lookup ---

const batchLookup = (codes) => codes.map((code) => {
  const str = String(code).replace(/[^0-9-]/g, '');

  // Try NAICS first
  const naicsResult = naicsLookup(str);
  if (naicsResult) {
    return { code: str, system: 'NAICS', ...naicsResult };
  }

  // Try SIC
  const sicResult = sicLookup(str);
  if (sicResult) {
    return { code: str, system: 'SIC', ...sicResult };
  }

  return { code: str, system: null, error: 'Code not found in NAICS or SIC' };
});

// --- Stats ---

const buildStats = () => {
  const naicsBySector = {};
  const naicsByLevel = {};

  naicsCodes.forEach((c) => {
    naicsByLevel[c.level] = (naicsByLevel[c.level] || 0) + 1;

    if (c.level === 'sector') {
      naicsBySector[c.code] = { title: c.title, count: 0 };
    }
  });

  naicsCodes.forEach((c) => {
    const clean = c.code.replace('-', '');
    // Find which sector this code belongs to
    Object.keys(naicsBySector).forEach((sectorCode) => {
      const sClean = sectorCode.replace('-', '');
      if (clean.startsWith(sClean) && c.code !== sectorCode) {
        naicsBySector[sectorCode].count++;
      }
    });
  });

  const sicByLevel = {};
  sicCodes.forEach((c) => {
    sicByLevel[c.level] = (sicByLevel[c.level] || 0) + 1;
  });

  return {
    naics: {
      totalCodes: naicsCodes.length,
      version: meta.naicsVersion,
      byLevel: naicsByLevel,
      bySector: naicsBySector,
    },
    sic: {
      totalCodes: sicCodes.length,
      version: meta.sicVersion,
      byLevel: sicByLevel,
    },
    crosswalk: {
      totalMappings: crosswalkData.length,
    },
    buildDate: meta.buildDate,
  };
};

// --- Exports ---

const totalNaics = naicsCodes.length;
const totalSic = sicCodes.length;
const totalCrosswalk = crosswalkData.length;

export {
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
};
