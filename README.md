# MCP NAICS/SIC Server

A [Model Context Protocol](https://modelcontextprotocol.io) (MCP) server for looking up NAICS 2022 and SIC industry codes with keyword search, sector browsing, and NAICS-to-SIC crosswalk mapping.

## Tools (4 total)

| Tool | Description |
|------|-------------|
| `naics_lookup` | Look up a NAICS code with title, hierarchy, children, and SIC crosswalk |
| `naics_search` | Search NAICS codes by keyword (e.g., "software", "restaurant") |
| `sic_lookup` | Look up a SIC code with title, hierarchy, children, and NAICS crosswalk |
| `sic_search` | Search SIC codes by keyword |

## Install

```bash
npx @easysolutions906/naics-api
```

### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "naics": {
      "command": "npx",
      "args": ["-y", "@easysolutions906/naics-api"]
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "naics": {
      "command": "npx",
      "args": ["-y", "@easysolutions906/naics-api"]
    }
  }
}
```

## REST API

Set `PORT` env var to run as an HTTP server.

- `GET /lookup?code=541511` -- look up a NAICS code
- `GET /search?q=software` -- search NAICS codes by keyword
- `GET /sector/:code` -- list all codes in a NAICS sector
- `GET /sic/lookup?code=7372` -- look up a SIC code
- `GET /sic/search?q=software` -- search SIC codes by keyword
- `GET /crosswalk?naics=541511` -- NAICS to SIC crosswalk
- `POST /lookup/batch` -- batch lookup NAICS or SIC codes

## Data Source

NAICS 2022 codes from the [US Census Bureau](https://www.census.gov/naics/). SIC 1987 codes from the Standard Industrial Classification system. NAICS is revised on a 5-year cycle (next: 2027). SIC has not been updated since 1987. Run `npm run build-data` to regenerate.

## Transport

- **stdio** (default) -- for local use with Claude Desktop and Cursor
- **HTTP** -- set `PORT` env var to start in Streamable HTTP mode on `/mcp`
