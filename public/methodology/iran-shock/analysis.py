"""
Iran Shock — India Economic Impact Analysis Script
==================================================
Case Study: The Iran Shock
Author   : Salomi Gandra
Tools    : Python (pandas, numpy) + SQL (see queries.sql)
Purpose  : Model oil price shock transmission to Indian household costs —
           fuel, food, transport, and currency via import dependency mapping.

Data Sources
------------
1. PPAC (Petroleum Planning & Analysis Cell) — India oil import data
   https://ppac.gov.in
   → import volume, origin country breakdown, Hormuz dependency
2. RBI — Exchange Rate Data (USD/INR daily)
   https://rbi.org.in / DBIE portal
3. CNBC / Business Standard / Al Jazeera — May 2026 live pricing
   → Brent crude spot, petrol pump prices
4. World Bank Pink Sheet — Global commodity prices
   → Brent crude historical (2024–2026)
5. NSSO HCES 2022-23 — Household Consumer Expenditure Survey
   → household budget shares by income quintile
"""

import pandas as pd
import numpy as np

# ── STEP 1: OIL PRICE SHOCK TIMELINE ─────────────────────────────────────────

timeline = pd.DataFrame({
    "date"       : ["Jan 2026", "Feb 2026", "Mar 4 2026",
                    "Mar 15 2026", "Apr 2026", "May 2026"],
    "brent_usd"  : [72.48, 79.30, 93.20, 112.57, 118.40, 120.80],
    "usd_inr"    : [84.20, 84.85, 87.40, 90.20, 92.10, 94.50],
    "event"      : [
        "Baseline — pre-conflict",
        "Tensions escalate",
        "Hormuz effectively closed",
        "Peak supply disruption",
        "Emergency reserves deployed",
        "Partial Hormuz reopening (contested)",
    ],
})
timeline["oil_shock_pct"] = (
    (timeline["brent_usd"] / timeline.loc[0,"brent_usd"] - 1) * 100
).round(1)
timeline["inr_depreciation_pct"] = (
    (timeline["usd_inr"] / timeline.loc[0,"usd_inr"] - 1) * 100
).round(2)

print("── OIL SHOCK TIMELINE ──")
print(timeline.to_string(index=False))

# ── STEP 2: INDIA IMPORT DEPENDENCY MAPPING ───────────────────────────────────
#   PPAC data: India imports ~88% of crude oil demand
#   ~50% passes through Strait of Hormuz

total_import_mb_per_day = 4.6   # million barrels/day (PPAC 2025-26)
hormuz_share_pct        = 50    # % via Strait of Hormuz
hormuz_mb_per_day       = total_import_mb_per_day * hormuz_share_pct / 100

price_baseline = 72.48   # USD/barrel
price_shock    = 120.80  # USD/barrel
price_increase = price_shock - price_baseline
extra_cost_per_day_usd = hormuz_mb_per_day * 1_000_000 * price_increase
extra_cost_per_day_inr = extra_cost_per_day_usd * 94.50

print(f"\n── IMPORT COST IMPACT ──")
print(f"  Hormuz-routed imports     : {hormuz_mb_per_day:.2f} million barrels/day")
print(f"  Extra cost/day (USD)      : ${extra_cost_per_day_usd:,.0f}")
print(f"  Extra cost/day (INR Cr)   : ₹{extra_cost_per_day_inr/1e7:,.0f} Cr")
print(f"  Extra cost/10 weeks (INR) : ₹{extra_cost_per_day_inr * 70 / 1e9:,.1f}B (≈ ₹{extra_cost_per_day_inr*70/1e9/10:.0f}K Cr)")

# ── STEP 3: PUMP PRICE TRANSMISSION MODEL ─────────────────────────────────────
#   Formula:
#   pump_price = (crude_cost × refining_margin × USD_INR) / barrel_to_litre
#                + excise_duty + dealer_margin + VAT
#
#   1 barrel = 158.99 litres

BARREL_TO_LITRE = 158.99
REFINING_MARGIN = 1.15      # 15% refining & transport margin
EXCISE_DUTY_INR = 19.90     # ₹ per litre (petrol, May 2026)
DEALER_MARGIN   = 3.87      # ₹ per litre
VAT_RATE        = 0.265     # avg state VAT ~26.5%

def calc_pump_price(brent_usd, usd_inr):
    crude_inr_per_litre = (brent_usd * REFINING_MARGIN * usd_inr) / BARREL_TO_LITRE
    pre_tax = crude_inr_per_litre + DEALER_MARGIN
    pump    = (pre_tax + EXCISE_DUTY_INR) * (1 + VAT_RATE)
    return round(pump, 2)

scenarios = pd.DataFrame({
    "scenario"   : ["Jan 2026 (baseline)", "Mar 4 (Hormuz closed)",
                    "Apr 2026 (peak)", "May 2026 (current)"],
    "brent_usd"  : [72.48, 93.20, 118.40, 120.80],
    "usd_inr"    : [84.20, 87.40, 92.10, 94.50],
})
scenarios["petrol_pump_price"] = scenarios.apply(
    lambda r: calc_pump_price(r.brent_usd, r.usd_inr), axis=1
)
scenarios["increase_from_baseline"] = (
    scenarios["petrol_pump_price"] - scenarios.loc[0,"petrol_pump_price"]
).round(2)

print("\n── PETROL PUMP PRICE TRANSMISSION ──")
print(scenarios.to_string(index=False))

# ── STEP 4: HOUSEHOLD BUDGET IMPACT BY INCOME QUINTILE ───────────────────────
#   NSSO HCES 2022-23 monthly household expenditure (₹) by quintile
#   Fuel/transport share of household budget

quintiles = pd.DataFrame({
    "quintile"           : ["Q1 (lowest 20%)", "Q2", "Q3", "Q4", "Q5 (top 20%)"],
    "monthly_expenditure": [4200, 7800, 12400, 19800, 42000],
    "fuel_transport_share": [0.082, 0.094, 0.101, 0.108, 0.112],  # HCES 2022-23
})
quintiles["fuel_monthly_spend"]  = (
    quintiles["monthly_expenditure"] * quintiles["fuel_transport_share"]
).round(0)

# Petrol price increase: ₹19.40/litre (from baseline to May 2026)
petrol_increase_per_litre = scenarios.loc[3,"petrol_pump_price"] - scenarios.loc[0,"petrol_pump_price"]
AVG_LITRES_PER_MONTH_Q = [8, 15, 22, 35, 65]  # estimated litres/month per quintile
quintiles["avg_litres_month"]    = AVG_LITRES_PER_MONTH_Q
quintiles["monthly_extra_spend"] = (
    quintiles["avg_litres_month"] * petrol_increase_per_litre
).round(0)
quintiles["budget_impact_pct"]   = (
    quintiles["monthly_extra_spend"] / quintiles["monthly_expenditure"] * 100
).round(2)

print(f"\n── HOUSEHOLD BUDGET IMPACT (petrol +₹{petrol_increase_per_litre:.1f}/L) ──")
print(quintiles[["quintile","monthly_expenditure","monthly_extra_spend","budget_impact_pct"]]
      .to_string(index=False))

# ── EXPORT ───────────────────────────────────────────────────────────────────
timeline.to_csv("oil_shock_timeline.csv", index=False)
scenarios.to_csv("pump_price_model.csv", index=False)
quintiles.to_csv("household_budget_impact.csv", index=False)
print("\nExported: oil_shock_timeline.csv, pump_price_model.csv, household_budget_impact.csv")
