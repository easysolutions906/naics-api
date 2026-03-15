#!/usr/bin/env node

/**
 * Build script for NAICS/SIC data.
 *
 * Attempts to download the NAICS 2022 codes from Census Bureau.
 * If download fails, uses the embedded fallback data.
 *
 * Usage: node scripts/build-data.js
 */

import { writeFileSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execSync } from 'node:child_process';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dirname, '..', 'src', 'data');

const buildMeta = (naicsCount, sicCount, crosswalkCount) => ({
  naicsVersion: '2022',
  sicVersion: '1987',
  naicsCount,
  sicCount,
  crosswalkCount,
  buildDate: new Date().toISOString(),
  source: 'US Census Bureau / OSHA',
});

// Try downloading NAICS xlsx from Census Bureau
const tryDownload = () => {
  const url = 'https://www.census.gov/naics/2022NAICS/2-6%20digit_2022_Codes.xlsx';
  console.log(`Attempting download from: ${url}`);
  try {
    execSync(`curl -sfL -o /tmp/naics2022.xlsx "${url}"`, { timeout: 15000 });
    console.log('Download succeeded — but xlsx parsing requires additional deps.');
    console.log('Using embedded data instead. Run with --parse-xlsx if you add xlsx dep.');
    return false;
  } catch {
    console.log('Download failed or timed out. Using embedded data.');
    return false;
  }
};

const main = () => {
  tryDownload();

  // Load embedded data
  const naicsPath = join(DATA_DIR, 'naics.json');
  const sicPath = join(DATA_DIR, 'sic.json');
  const crosswalkPath = join(DATA_DIR, 'crosswalk.json');

  if (!existsSync(naicsPath) || !existsSync(sicPath)) {
    console.error('Embedded data files not found. Ensure naics.json and sic.json exist in src/data/');
    process.exit(1);
  }

  const naics = JSON.parse(readFileSync(naicsPath, 'utf-8'));
  const sic = JSON.parse(readFileSync(sicPath, 'utf-8'));
  const crosswalk = existsSync(crosswalkPath) ? JSON.parse(readFileSync(crosswalkPath, 'utf-8')) : [];

  const meta = buildMeta(naics.length, sic.length, crosswalk.length);
  writeFileSync(join(DATA_DIR, 'meta.json'), JSON.stringify(meta, null, 2) + '\n');

  console.log(`NAICS codes: ${naics.length}`);
  console.log(`SIC codes: ${sic.length}`);
  console.log(`Crosswalk mappings: ${crosswalk.length}`);
  console.log(`Meta written to src/data/meta.json`);
};

main();
