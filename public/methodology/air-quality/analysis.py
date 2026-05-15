"""
India Air Quality Crisis — Data Analysis Script
================================================
Case Study: Breathing Numbers
Author   : Salomi Gandra
Tools    : Python (pandas, numpy)
Purpose  : Process CPCB AQI data, compute health burden estimates,
           benchmark cities against WHO PM2.5 guidelines.

Data Sources
------------
1. CPCB (Central Pollution Control Board) — AQI Station Data (2019–2023)
   https://app.cpcbccr.com/AQI_India/
2. WHO Global Air Quality Guidelines 2021
   PM2.5 safe threshold: 5 µg/m³ (annual mean)
3. Health Effects Institute — State of Global Air 2024
   Concentration-response coefficient for PM2.5 → premature death
4. Census of India 2011 / UN Population Projection 2023
   → city populations for burden calculation
"""

import pandas as pd
import numpy as np

# ── STEP 1: CITY AQI DATA (annual PM2.5 µg/m³ means) ────────────────────────
#   Source: CPCB annual average compiled from station data

city_data = pd.DataFrame({
    "city"            : ["Delhi", "Mumbai", "Kolkata", "Chennai", "Bengaluru",
                         "Hyderabad", "Ahmedabad", "Lucknow", "Patna", "Jaipur"],
    "pm25_annual_mean": [99.7, 46.4, 67.2, 36.1, 29.5,
                         41.8, 72.3, 114.0, 118.3, 68.9],   # µg/m³
    "population_mn"   : [32.9, 20.7, 14.8, 10.9, 12.7,
                         10.5, 8.4, 3.7, 2.5, 3.9],
})

WHO_SAFE_THRESHOLD   = 5.0    # µg/m³ — WHO 2021 annual mean guideline
INDIA_STANDARD_NAAQS = 40.0   # µg/m³ — India's own NAAQS annual limit

city_data["times_over_who"]   = city_data["pm25_annual_mean"] / WHO_SAFE_THRESHOLD
city_data["meets_india_std"]  = city_data["pm25_annual_mean"] <= INDIA_STANDARD_NAAQS

print("── CITY PM2.5 BENCHMARK ──")
print(city_data[["city","pm25_annual_mean","times_over_who","meets_india_std"]].to_string(index=False))

# ── STEP 2: HEALTH BURDEN ESTIMATION ─────────────────────────────────────────
#
#   Formula (based on HEI GEMM model):
#   Attributable deaths = population × baseline_mortality_rate
#                         × (1 - exp(-β × max(PM2.5 - CF, 0)))
#
#   β  = 0.00575  (GEMM coefficient for all-cause mortality, HEI 2024)
#   CF = 2.4      counterfactual minimum concentration (µg/m³)
#   baseline_mortality_rate ≈ 0.0074 (India crude death rate per person per year)

BETA       = 0.00575
CF         = 2.4
MORT_RATE  = 0.0074

def attributable_deaths(pm25, population_mn):
    excess   = max(pm25 - CF, 0)
    frac     = 1 - np.exp(-BETA * excess)
    pop      = population_mn * 1_000_000
    return round(pop * MORT_RATE * frac)

city_data["attributable_deaths_annual"] = city_data.apply(
    lambda r: attributable_deaths(r.pm25_annual_mean, r.population_mn), axis=1
)

print("\n── ESTIMATED ANNUAL PREMATURE DEATHS (PM2.5 exposure) ──")
print(city_data[["city","pm25_annual_mean","population_mn","attributable_deaths_annual"]].to_string(index=False))
total_burden = city_data["attributable_deaths_annual"].sum()
print(f"\n  Total across these 10 cities: {total_burden:,} premature deaths/year")

# ── STEP 3: SEASONAL PATTERN (Delhi example) ─────────────────────────────────
#   Monthly PM2.5 index derived from CPCB station averages (Delhi, 2022–23)

delhi_monthly = pd.DataFrame({
    "month"    : ["Jan","Feb","Mar","Apr","May","Jun",
                  "Jul","Aug","Sep","Oct","Nov","Dec"],
    "pm25_mean": [188, 162, 121, 87, 74, 62, 48, 44, 58, 142, 221, 243],
})
delhi_monthly["who_ratio"] = (delhi_monthly["pm25_mean"] / WHO_SAFE_THRESHOLD).round(1)

print("\n── DELHI MONTHLY PM2.5 (2022-23 avg) ──")
print(delhi_monthly.to_string(index=False))

# ── STEP 4: SOURCE APPORTIONMENT ─────────────────────────────────────────────
#   Share of PM2.5 by source category (CPCB/IIT Kanpur source receptor study)

sources = pd.DataFrame({
    "source"      : ["Vehicles", "Industry", "Crop burning", "Dust & construction",
                     "Household biomass", "Other"],
    "share_pct"   : [28, 22, 17, 16, 12, 5],
})
print("\n── PM2.5 SOURCE APPORTIONMENT (Delhi, CPCB 2023) ──")
print(sources.to_string(index=False))

# ── EXPORT ───────────────────────────────────────────────────────────────────
city_data.to_csv("city_aqi_burden.csv", index=False)
delhi_monthly.to_csv("delhi_monthly_pm25.csv", index=False)
sources.to_csv("pm25_sources.csv", index=False)
print("\nExported: city_aqi_burden.csv, delhi_monthly_pm25.csv, pm25_sources.csv")
