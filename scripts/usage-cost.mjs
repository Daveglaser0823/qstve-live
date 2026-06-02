#!/usr/bin/env node
/**
 * usage-cost.mjs — convert agent token counts into API-rate dollars.
 *
 * The cost of an agent run is just rate × volume. This script holds the
 * rate tables so that once you have token counts (from `/cost`, `ccusage`,
 * or a provider dashboard) you get dollars without needing to reach the
 * machine the agent runs on.
 *
 * Usage:
 *   # Manual: pass token counts for one model
 *   node scripts/usage-cost.mjs --model opus \
 *        --input 5560 --output 3850 --cache-write 18328 --cache-read 27031
 *
 *   node scripts/usage-cost.mjs --model gpt-4o --input 120000 --output 8000
 *
 *   # Pipe ccusage's JSON straight in and re-price every day it reports:
 *   npx ccusage@latest --json | node scripts/usage-cost.mjs
 *
 *   # List the rate tables and exit:
 *   node scripts/usage-cost.mjs --rates
 *
 * Rates are USD per 1,000,000 tokens, accurate to early 2026. Providers
 * change pricing — edit RATES below if these drift.
 */

// USD per 1M tokens. cacheWrite/cacheRead default to input pricing when a
// provider does not bill them separately.
const RATES = {
  // --- Anthropic (Claude) ---
  "opus":         { label: "Claude Opus 4.x",   input: 15.0, output: 75.0, cacheWrite: 18.75, cacheRead: 1.50 },
  "sonnet":       { label: "Claude Sonnet 4.x", input: 3.0,  output: 15.0, cacheWrite: 3.75,  cacheRead: 0.30 },
  "haiku":        { label: "Claude Haiku 4.5",  input: 1.0,  output: 5.0,  cacheWrite: 1.25,  cacheRead: 0.10 },

  // --- OpenAI (ChatGPT / API) --- cache = "cached input" pricing
  "gpt-4o":       { label: "OpenAI GPT-4o",      input: 2.50, output: 10.0, cacheWrite: 2.50, cacheRead: 1.25 },
  "gpt-4o-mini":  { label: "OpenAI GPT-4o mini", input: 0.15, output: 0.60, cacheWrite: 0.15, cacheRead: 0.075 },
  "gpt-4.1":      { label: "OpenAI GPT-4.1",     input: 2.00, output: 8.0,  cacheWrite: 2.00, cacheRead: 0.50 },
  "o1":           { label: "OpenAI o1",          input: 15.0, output: 60.0, cacheWrite: 15.0, cacheRead: 7.50 },
  "o3-mini":      { label: "OpenAI o3-mini",     input: 1.10, output: 4.40, cacheWrite: 1.10, cacheRead: 0.55 },
};

const M = 1_000_000;

function priceOf(model, t) {
  const r = RATES[model];
  if (!r) throw new Error(`unknown model "${model}" — try one of: ${Object.keys(RATES).join(", ")}`);
  const input = (t.input || 0) / M * r.input;
  const output = (t.output || 0) / M * r.output;
  const cacheWrite = (t.cacheWrite || 0) / M * r.cacheWrite;
  const cacheRead = (t.cacheRead || 0) / M * r.cacheRead;
  return { input, output, cacheWrite, cacheRead, total: input + output + cacheWrite + cacheRead };
}

const usd = (n) => "$" + n.toFixed(4).replace(/(\.\d*?)0+$/, "$1").replace(/\.$/, "");
const n = (x) => (x || 0).toLocaleString("en-US");

function printRates() {
  console.log("Rate tables (USD per 1M tokens, early 2026 — edit RATES to update):\n");
  for (const [key, r] of Object.entries(RATES)) {
    console.log(
      `  ${key.padEnd(13)} ${r.label.padEnd(20)} ` +
      `in $${r.input}  out $${r.output}  cache-write $${r.cacheWrite}  cache-read $${r.cacheRead}`
    );
  }
}

function printRow(model, t) {
  const c = priceOf(model, t);
  const r = RATES[model];
  console.log(`\n${r.label}  (${model})`);
  console.log(`  input        ${n(t.input).padStart(12)} tok   ${usd(c.input)}`);
  console.log(`  output       ${n(t.output).padStart(12)} tok   ${usd(c.output)}`);
  if (t.cacheWrite) console.log(`  cache write  ${n(t.cacheWrite).padStart(12)} tok   ${usd(c.cacheWrite)}`);
  if (t.cacheRead)  console.log(`  cache read   ${n(t.cacheRead).padStart(12)} tok   ${usd(c.cacheRead)}`);
  console.log(`  ${"TOTAL".padEnd(13)}${" ".repeat(13)}      ${usd(c.total)}`);
  return c.total;
}

// --- arg parsing ---
const argv = process.argv.slice(2);
const args = {};
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  if (a.startsWith("--")) {
    const key = a.slice(2);
    const next = argv[i + 1];
    if (next === undefined || next.startsWith("--")) { args[key] = true; }
    else { args[key] = next; i++; }
  }
}

if (args.rates) { printRates(); process.exit(0); }
if (args.help) {
  console.log("See header of scripts/usage-cost.mjs for usage. `--rates` lists models.");
  process.exit(0);
}

// Mode 1: explicit --model with token flags.
if (args.model) {
  const t = {
    input: Number(args.input) || 0,
    output: Number(args.output) || 0,
    cacheWrite: Number(args["cache-write"]) || 0,
    cacheRead: Number(args["cache-read"]) || 0,
  };
  printRow(String(args.model), t);
  process.exit(0);
}

// Mode 2: read ccusage --json from stdin and re-price each daily entry.
if (!process.stdin.isTTY) {
  let raw = "";
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", (c) => (raw += c));
  process.stdin.on("end", () => {
    let data;
    try { data = JSON.parse(raw); }
    catch { console.error("stdin was not valid JSON. Pass --model for manual mode, or pipe `ccusage --json`."); process.exit(1); }

    // ccusage shape: { daily: [ { date, modelBreakdowns: [ { modelName, inputTokens, outputTokens, cacheCreationTokens, cacheReadTokens } ] } ] }
    const days = data.daily || data.monthly || [];
    if (!Array.isArray(days) || days.length === 0) {
      console.error("No `daily`/`monthly` array found in JSON. Expected `ccusage --json` output.");
      process.exit(1);
    }

    let grand = 0;
    for (const day of days) {
      console.log(`\n=== ${day.period || day.date || day.month || "period"} ===`);
      const breakdowns = day.modelBreakdowns || [];
      for (const b of breakdowns) {
        const model = mapModel(b.modelName || "");
        if (!model) { console.log(`  (skipping unmapped model "${b.modelName}")`); continue; }
        grand += printRow(model, {
          input: b.inputTokens, output: b.outputTokens,
          cacheWrite: b.cacheCreationTokens, cacheRead: b.cacheReadTokens,
        });
      }
    }
    console.log(`\nGRAND TOTAL (recomputed at API rates): ${usd(grand)}`);
  });
} else {
  console.log("Nothing to do. Pass --model ... or pipe `ccusage --json`. Use --rates to list models, --help for usage.");
}

// Map a provider's model string onto a rate-table key.
function mapModel(name) {
  const s = name.toLowerCase();
  if (s.includes("opus")) return "opus";
  if (s.includes("sonnet")) return "sonnet";
  if (s.includes("haiku")) return "haiku";
  if (s.includes("4o-mini")) return "gpt-4o-mini";
  if (s.includes("4o")) return "gpt-4o";
  if (s.includes("4.1")) return "gpt-4.1";
  if (s.includes("o3-mini")) return "o3-mini";
  if (s.includes("o1")) return "o1";
  return null;
}
