# scripts

## usage-cost.mjs

Convert agent token counts into API-rate dollars. Cost is just rate × volume —
this script holds the rate tables so you can price usage from token counts
without reaching the machine an agent runs on.

```bash
# Manual — one model
node scripts/usage-cost.mjs --model opus \
  --input 5560 --output 3850 --cache-write 18328 --cache-read 27031

node scripts/usage-cost.mjs --model gpt-4o --input 120000 --output 8000

# Pipe ccusage and re-price every day it reports
npx ccusage@latest --json | node scripts/usage-cost.mjs

# List supported models / rates
node scripts/usage-cost.mjs --rates
```

Models: `opus`, `sonnet`, `haiku`, `gpt-4o`, `gpt-4o-mini`, `gpt-4.1`, `o1`,
`o3-mini`. Rates are USD per 1M tokens, accurate to early 2026 — edit the
`RATES` table in `usage-cost.mjs` if provider pricing changes.

> Note: `ccusage` reads Claude Code's local logs. If an agent runs on the
> OpenAI/ChatGPT plan instead, its usage lives in the OpenAI dashboard — feed
> those token counts in via the manual `--model gpt-* ` mode.
