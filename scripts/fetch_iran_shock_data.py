#!/usr/bin/env python3
"""
fetch_iran_shock_data.py
────────────────────────
Fetches live USD/INR and Brent crude prices and updates
data/iran-shock-live.json in the portfolio repo.

Runs daily via GitHub Actions at 12:30 UTC = 6:00 PM IST
(after NSE close at 3:30 PM IST and RBI reference rate at ~4:45 PM IST).

Auto-updated fields:   usdInr.closing, usdInr.intradayLow, usdInr.changePercent,
                       brentCrude.current, brentCrude.peak, lastUpdated, lastUpdatedIST
Manual fields:         pumpPrices.*, omcLoss.*, forexReserves.*
                       (these have their own lastVerified dates — update when PPAC/RBI publish)
"""

import json
import os
import sys
from datetime import datetime, timezone, timedelta

try:
    import requests
except ImportError:
    print("[ERROR] requests not installed. Run: pip install requests")
    sys.exit(1)

# ── Paths ──────────────────────────────────────────────────────────────────
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_FILE  = os.path.join(SCRIPT_DIR, '..', 'data', 'iran-shock-live.json')

# ── Timezone ───────────────────────────────────────────────────────────────
IST     = timezone(timedelta(hours=5, minutes=30))
NOW_IST = datetime.now(IST)


# ── Fetchers ───────────────────────────────────────────────────────────────

def fetch_usd_inr() -> float | None:
    """
    Fetch live USD/INR from open.er-api.com.
    Free tier — no API key required. 1,500 req/month limit (we use ~30).
    Returns the INR rate per 1 USD, rounded to 2 decimal places.
    """
    try:
        resp = requests.get(
            'https://open.er-api.com/v6/latest/USD',
            timeout=12
        )
        resp.raise_for_status()
        data = resp.json()
        rate = round(float(data['rates']['INR']), 2)
        print(f"  [open.er-api.com] USD/INR = ₹{rate}")
        return rate
    except Exception as e:
        print(f"  [WARN] open.er-api.com failed: {e}")

    # Fallback: exchangerate-api.com (also free, no key)
    try:
        resp = requests.get(
            'https://api.exchangerate-api.com/v4/latest/USD',
            timeout=12
        )
        resp.raise_for_status()
        data = resp.json()
        rate = round(float(data['rates']['INR']), 2)
        print(f"  [exchangerate-api.com fallback] USD/INR = ₹{rate}")
        return rate
    except Exception as e:
        print(f"  [WARN] exchangerate-api.com fallback also failed: {e}")
        return None


def fetch_brent_crude() -> float | None:
    """
    Fetch live Brent crude (BZ=F) from Yahoo Finance.
    No API key required. Returns price in USD/barrel.
    """
    urls = [
        'https://query1.finance.yahoo.com/v8/finance/chart/BZ=F',
        'https://query2.finance.yahoo.com/v8/finance/chart/BZ=F',
    ]
    for url in urls:
        try:
            resp = requests.get(
                url,
                params={'interval': '1d', 'range': '1d'},
                headers={'User-Agent': 'Mozilla/5.0 (compatible; portfolio-bot/1.0)'},
                timeout=12
            )
            resp.raise_for_status()
            data  = resp.json()
            price = round(float(data['chart']['result'][0]['meta']['regularMarketPrice']), 2)
            print(f"  [Yahoo Finance BZ=F] Brent = ${price}/bbl")
            return price
        except Exception as e:
            print(f"  [WARN] {url} failed: {e}")
    return None


# ── Main ───────────────────────────────────────────────────────────────────

def main():
    print(f"\n{'─'*55}")
    print(f"  Iran Shock Data Updater")
    print(f"  {NOW_IST.strftime('%Y-%m-%d %H:%M IST')}")
    print(f"{'─'*55}")

    # Load existing data (never wipe it — only update fetched fields)
    with open(DATA_FILE, 'r', encoding='utf-8') as f:
        live = json.load(f)

    changes = []

    # ── USD/INR ──────────────────────────────────────────────────────────
    inr = fetch_usd_inr()
    if inr:
        baseline    = live['usdInr']['baseline']
        change_pct  = round(((inr - baseline) / baseline) * 100, 1)
        prev_close  = live['usdInr']['closing']

        # intradayLow tracks the most-depreciated rate ever seen (highest ₹ per $)
        prev_low    = live['usdInr'].get('intradayLow', inr)
        new_low     = round(max(inr, prev_low), 2)

        live['usdInr']['closing']       = inr
        live['usdInr']['intradayLow']   = new_low
        live['usdInr']['changePercent'] = change_pct

        changes.append(f"  USD/INR  ₹{prev_close} → ₹{inr}  ({change_pct:+}% vs baseline ₹{baseline})")
        if new_low > prev_low:
            changes.append(f"  ⚠️  New intraday low recorded: ₹{new_low}")
    else:
        print(f"  USD/INR  unchanged  ₹{live['usdInr']['closing']}")

    # ── Brent crude ───────────────────────────────────────────────────────
    brent = fetch_brent_crude()
    if brent:
        prev_current = live['brentCrude']['current']
        prev_peak    = live['brentCrude']['peak']

        live['brentCrude']['current'] = brent
        if brent > prev_peak:
            live['brentCrude']['peak'] = brent
            changes.append(f"  Brent    ${prev_current} → ${brent}  🔺 NEW PEAK")
        else:
            changes.append(f"  Brent    ${prev_current} → ${brent}")
    else:
        print(f"  Brent    unchanged  ${live['brentCrude']['current']}/bbl")

    # ── Timestamps ───────────────────────────────────────────────────────
    live['lastUpdated']    = NOW_IST.strftime('%Y-%m-%d')
    live['lastUpdatedIST'] = NOW_IST.strftime('%Y-%m-%d %H:%M IST')

    # ── Write back ────────────────────────────────────────────────────────
    with open(DATA_FILE, 'w', encoding='utf-8') as f:
        json.dump(live, f, indent=2, ensure_ascii=False)
        f.write('\n')

    print(f"\n{'─'*55}")
    if changes:
        print("  Changes written:")
        for c in changes:
            print(c)
    else:
        print("  No API data fetched — file timestamps updated only.")

    print(f"\n  ✓  {DATA_FILE}")
    print(f"{'─'*55}\n")


if __name__ == '__main__':
    main()
