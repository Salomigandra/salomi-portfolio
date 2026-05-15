"""
Global Climate Warming Trends — Data Analysis Script
====================================================
Case Study: Degrees of Consequence
Author   : Salomi Gandra
Tools    : Python (pandas, numpy)
Purpose  : Process NASA GISTEMP anomaly data, model warming trajectories,
           compare NDC pledges against emissions pathways, compute 1.5°C budget.

Data Sources
------------
1. NASA GISTEMP v4 — Global Surface Temperature Change
   https://data.giss.nasa.gov/gistemp/
   → annual temperature anomaly vs. 1951–1980 baseline
2. IPCC Sixth Assessment Report (AR6, 2021)
   → remaining carbon budget for 1.5°C / 2°C
3. Our World in Data — CO₂ & Greenhouse Gas Emissions (2023)
   → country/sector emissions time series
4. UNEP Emissions Gap Report 2023
   → NDC pledges vs. required reductions
"""

import pandas as pd
import numpy as np

# ── STEP 1: GISTEMP ANOMALY DATA (1950–2023) ──────────────────────────────────
#   Annual global mean temperature anomaly (°C) vs. 1951–1980 baseline
#   Source: NASA GISTEMP v4

years       = list(range(1950, 2024))
# Condensed representative values derived from GISTEMP dataset
anomalies   = [
    -0.17,-0.01,-0.03,-0.07,-0.13,-0.14,-0.04, 0.02,-0.04,-0.07,  # 1950–59
    -0.02,-0.07, 0.04,-0.01, 0.05, 0.03,-0.04,-0.07,-0.07,-0.07,  # 1960–69
     0.01,-0.08, 0.01, 0.16, 0.07,-0.01,-0.10,-0.17,-0.07, 0.08,  # 1970–79
     0.26, 0.32, 0.14, 0.31, 0.16, 0.12, 0.18, 0.33, 0.40, 0.29,  # 1980–89
     0.45, 0.41, 0.23, 0.24, 0.31, 0.45, 0.35, 0.46, 0.63, 0.40,  # 1990–99
     0.42, 0.54, 0.63, 0.62, 0.54, 0.68, 0.61, 0.66, 0.54, 0.64,  # 2000–09
     0.72, 0.61, 0.64, 0.68, 0.75, 0.87, 1.01, 0.92, 0.85, 0.98,  # 2010–19
     1.02, 0.85, 0.89, 1.17,                                        # 2020–23
]

df_gistemp = pd.DataFrame({"year": years, "anomaly_c": anomalies})

# Linear trend via least-squares
coeffs = np.polyfit(df_gistemp["year"], df_gistemp["anomaly_c"], 1)
df_gistemp["trend"] = np.polyval(coeffs, df_gistemp["year"])

print("── GISTEMP WARMING TREND ──")
print(f"  Warming rate: {coeffs[0]*10:.3f} °C per decade")
print(f"  2023 anomaly: {df_gistemp.iloc[-1]['anomaly_c']:.2f} °C above 1951-80 baseline")
print(f"  Pre-industrial adjustment: +0.29 °C → 2023 ≈ {df_gistemp.iloc[-1]['anomaly_c']+0.29:.2f} °C above pre-industrial")

# ── STEP 2: CARBON BUDGET COUNTDOWN ──────────────────────────────────────────
#   IPCC AR6 Table SPM.2 (2021 assessment)

CURRENT_YEAR     = 2023
remaining_budget_1_5 = 380  # GtCO₂ from Jan 2023 (67% probability, IPCC AR6)
remaining_budget_2_0 = 1230 # GtCO₂ from Jan 2023 (67% probability)
current_annual_emissions = 37.4  # GtCO₂/yr — Global Carbon Project 2023

years_left_1_5 = remaining_budget_1_5 / current_annual_emissions
years_left_2_0 = remaining_budget_2_0 / current_annual_emissions

print(f"\n── CARBON BUDGET ──")
print(f"  Remaining budget (1.5°C, 67%) : {remaining_budget_1_5} GtCO₂")
print(f"  Remaining budget (2.0°C, 67%) : {remaining_budget_2_0} GtCO₂")
print(f"  Current annual emissions       : {current_annual_emissions} GtCO₂/yr")
print(f"  Years to exhaust 1.5°C budget : {years_left_1_5:.1f} yrs → ~{CURRENT_YEAR + years_left_1_5:.0f}")
print(f"  Years to exhaust 2.0°C budget : {years_left_2_0:.1f} yrs → ~{CURRENT_YEAR + years_left_2_0:.0f}")

# ── STEP 3: NDC PLEDGE GAP ────────────────────────────────────────────────────
#   UNEP Emissions Gap Report 2023
#   All values in GtCO₂e/yr by 2030

pledge_scenarios = pd.DataFrame({
    "scenario"            : [
        "Current policies (no new action)",
        "Unconditional NDCs implemented",
        "Conditional NDCs implemented",
        "Required for 2°C (67%)",
        "Required for 1.5°C (67%)",
    ],
    "emissions_2030"      : [58.5, 53.4, 48.6, 41.0, 30.0],
})
baseline = pledge_scenarios.loc[0, "emissions_2030"]
pledge_scenarios["gap_from_current"] = pledge_scenarios["emissions_2030"] - baseline

print("\n── NDC PLEDGE GAP (2030, GtCO₂e/yr) ──")
print(pledge_scenarios.to_string(index=False))

# ── STEP 4: SECTOR EMISSIONS BREAKDOWN ───────────────────────────────────────
#   Source: Our World in Data / Global Carbon Project 2023

sectors = pd.DataFrame({
    "sector"   : ["Energy (power & heat)", "Transport", "Industry",
                  "Agriculture", "Buildings", "Land use change", "Other"],
    "share_pct": [34, 15, 24, 11, 6, 7, 3],
    "trend"    : ["+2.1%/yr", "+1.8%/yr", "+3.1%/yr",
                  "+0.5%/yr", "-0.2%/yr", "variable", "+0.8%/yr"],
})
print("\n── SECTOR EMISSIONS BREAKDOWN (2023) ──")
print(sectors.to_string(index=False))

# ── EXPORT ───────────────────────────────────────────────────────────────────
df_gistemp.to_csv("gistemp_anomaly.csv", index=False)
pledge_scenarios.to_csv("ndc_pledge_gap.csv", index=False)
sectors.to_csv("sector_emissions.csv", index=False)
print("\nExported: gistemp_anomaly.csv, ndc_pledge_gap.csv, sector_emissions.csv")
