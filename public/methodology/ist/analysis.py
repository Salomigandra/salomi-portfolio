"""
Indian Stretchable Time (IST) — Data Analysis Script
======================================================
Case Study: A Nation Running Late
Author   : Salomi Gandra
Tools    : Python (pandas, numpy)
Purpose  : Calculate economic cost of chronic lateness in India,
           model behavioural scenarios, and correlate cultural indices.

Data Sources
------------
1. KPMG India — "Cost of Meetings" workplace survey (2023)
   → avg_delay_minutes, meetings_per_day
2. World Bank — India GDP & employed workforce (2023)
   → gdp_usd, employed_population
3. Hofstede Insights — Power Distance Index (PDI) scores by country
   → pdi_scores dict
4. Nash Equilibrium framing — game theory textbooks (Osborne 2004)
"""

import pandas as pd
import numpy as np

# ── STEP 1: CORE PARAMETERS ──────────────────────────────────────────────────

avg_delay_minutes      = 19.0      # KPMG India workplace survey 2023
meetings_per_person_day = 2.3      # KPMG India workplace survey 2023
working_days_per_year  = 250
india_working_population = 560_000_000  # World Bank 2023
india_gdp_usd          = 3_730_000_000_000  # World Bank 2023 ($ 3.73 trillion)

# Average hourly wage (GDP per worker / working hours per year)
working_hours_per_year = working_days_per_year * 8
gdp_per_worker         = india_gdp_usd / india_working_population   # ~$6,661
avg_hourly_wage_usd    = gdp_per_worker / working_hours_per_year     # ~$3.33

# ── STEP 2: GDP LOSS CALCULATION ─────────────────────────────────────────────
#
#   Formula:
#   GDP_loss = (avg_delay_min / 60) × meetings_per_day × working_days
#              × employed_population × avg_hourly_wage
#
delay_hours_per_person_per_year = (
    (avg_delay_minutes / 60) * meetings_per_person_day * working_days_per_year
)
total_gdp_loss_usd = (
    delay_hours_per_person_per_year
    * india_working_population
    * avg_hourly_wage_usd
)
gdp_loss_billion   = total_gdp_loss_usd / 1e9
gdp_loss_pct       = (total_gdp_loss_usd / india_gdp_usd) * 100

print("── GDP LOSS FROM LATENESS ──")
print(f"  Delay hours per person/year : {delay_hours_per_person_per_year:.1f} h")
print(f"  Total GDP loss (USD)        : ${total_gdp_loss_usd:,.0f}")
print(f"  Total GDP loss (billion)    : ${gdp_loss_billion:.1f}B")
print(f"  As % of India GDP           : {gdp_loss_pct:.2f}%")

# ── STEP 3: SCENARIO TABLE ───────────────────────────────────────────────────
#   What if lateness reduced by 25%, 50%, 75%?

scenarios = pd.DataFrame({
    "scenario"        : ["Business as usual", "25% reduction", "50% reduction", "75% reduction"],
    "avg_delay_min"   : [19.0, 14.25, 9.5, 4.75],
})
scenarios["gdp_loss_billion"] = scenarios["avg_delay_min"].apply(
    lambda d: (
        (d / 60) * meetings_per_person_day * working_days_per_year
        * india_working_population * avg_hourly_wage_usd
    ) / 1e9
)
scenarios["gdp_saved_billion"] = gdp_loss_billion - scenarios["gdp_loss_billion"]

print("\n── SCENARIO TABLE ──")
print(scenarios.to_string(index=False))

# ── STEP 4: HOFSTEDE PDI CORRELATION ─────────────────────────────────────────
#   Higher PDI → meetings more likely to start when authority arrives
#   → higher effective delay

pdi_scores = {
    "India"        : 77,
    "Germany"      : 35,
    "Japan"        : 54,
    "USA"          : 40,
    "Brazil"       : 69,
    "Switzerland"  : 34,
}
# Estimated avg delay (minutes) from cross-country studies
avg_delays = {
    "India"        : 19,
    "Germany"      : 3,
    "Japan"        : 1,
    "USA"          : 8,
    "Brazil"       : 22,
    "Switzerland"  : 2,
}

df_pdi = pd.DataFrame({
    "country"    : list(pdi_scores.keys()),
    "pdi"        : list(pdi_scores.values()),
    "avg_delay"  : list(avg_delays.values()),
})

correlation = df_pdi[["pdi", "avg_delay"]].corr().loc["pdi", "avg_delay"]
print(f"\n── HOFSTEDE PDI CORRELATION ──")
print(df_pdi.to_string(index=False))
print(f"  Pearson r (PDI vs avg delay): {correlation:.3f}")

# ── STEP 5: FD REAL RETURN CALCULATOR ────────────────────────────────────────
#   Time lost to waiting = time not earning; model opportunity cost

def fd_real_return(principal, fd_rate_pct, inflation_pct, years):
    """Returns real value after inflation adjustment."""
    nominal = principal * ((1 + fd_rate_pct / 100) ** years)
    real    = principal * ((1 + (fd_rate_pct - inflation_pct) / 100) ** years)
    return {"nominal": nominal, "real": real, "loss": nominal - real}

print("\n── FD OPPORTUNITY COST (₹1,00,000 over 5 years) ──")
for fd_rate in [6.5, 7.0, 7.5]:
    result = fd_real_return(100_000, fd_rate, 5.5, 5)
    print(f"  FD {fd_rate}% | Nominal ₹{result['nominal']:,.0f} | Real ₹{result['real']:,.0f} | Inflation loss ₹{result['loss']:,.0f}")

# ── EXPORT ───────────────────────────────────────────────────────────────────
df_pdi.to_csv("pdi_delay_correlation.csv", index=False)
scenarios.to_csv("ist_scenarios.csv", index=False)
print("\nExported: pdi_delay_correlation.csv, ist_scenarios.csv")
