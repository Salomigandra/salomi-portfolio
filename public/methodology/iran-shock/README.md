# Methodology — The Iran Shock

## Business Question
How does an oil price shock from the Iran-Israel conflict transmit into Indian household costs — fuel, food, and currency?

## Tools Used
| Tool | Role |
|---|---|
| **Python (pandas, numpy)** | Price transmission model, household budget simulation, import dependency mapping |
| **SQL (PostgreSQL)** | Brent crude daily shock series, INR depreciation analysis, city pump price queries |
| **Excel** | Household budget impact by quintile, OMC loss model, petrol price build-up |
| **React / JS** | Interactive shock simulator, city fuel price map, household cost calculator |

## Data Sources
| # | Source | URL | Year | Used For |
|---|---|---|---|---|
| 1 | PPAC — India Petroleum Data | ppac.gov.in | 2026 | Import volumes, Hormuz dependency (50%), OMC losses |
| 2 | RBI — Exchange Rate (USD/INR) | rbi.org.in / DBIE | 2026 | Daily INR/USD during shock period |
| 3 | CNBC / Business Standard | various | May 2026 | Brent crude spot prices, pump prices |
| 4 | World Bank Pink Sheet | worldbank.org/commodity | 2024–2026 | Brent crude historical prices |
| 5 | NSSO HCES 2022-23 | mospi.gov.in/hces | 2023 | Household budget shares by income quintile |
| 6 | Al Jazeera / Reuters | various | 2026 | Hormuz closure dates and shipping disruption |

## Key Calculations

### 1. Daily Import Cost Increase (Post-Shock)
```
extra_cost_per_day = hormuz_imports_mbpd × 1,000,000 barrels
                     × (price_shock - price_baseline) USD/barrel

= 2.3 mb/day × 1,000,000 × ($120.80 - $72.48)
= 2.3M × $48.32
= $111.1M/day

In INR: $111.1M × ₹94.50 = ₹1,050 Cr/day
OMC losses ≈ ₹1,700 Cr/day (includes under-recovery on capped pump prices)
```

### 2. Petrol Pump Price Build-Up (Cost-Plus Formula)
```
pump_price = ((brent_usd × refining_margin × USD_INR) / 158.99 litres)
             + dealer_margin + excise_duty + VAT

= ((120.80 × 1.15 × 94.50) / 158.99) + 3.87 + 19.90) × 1.265

Jan baseline:
= ((72.48 × 1.15 × 84.20) / 158.99 + 23.77) × 1.265
≈ ₹96.40/litre

May 2026:
≈ ₹116.30/litre (+₹19.90/litre, +20.6%)

Note: government absorbed partial increase via excise cut of ₹2/litre
```

### 3. Household Budget Impact (Income Quintile)
```
monthly_extra_spend = avg_litres_per_month × price_increase_per_litre

budget_impact_pct = monthly_extra_spend / monthly_expenditure × 100

Q1 (lowest): ₹8L × ₹19.9 = ₹159/month on ₹4,200 → 3.8% of budget
Q5 (highest): ₹65L × ₹19.9 = ₹1,294/month on ₹42,000 → 3.1% of budget

Regressive impact: lower quintiles spend higher % on fuel as share of income
```

### 4. INR Depreciation Compounding
```
effective_brent_cost_increase = (price_shock/price_baseline) × (inr_may/inr_jan) - 1

= (120.80/72.48) × (94.50/84.20) - 1
= 1.667 × 1.122 - 1
= +87.1%

Headline oil price rose 66.7% in USD, but India paid 87.1% more in INR
due to simultaneous currency depreciation.
```

## SQL Query Summary (see queries.sql)
| Query | Purpose |
|---|---|
| Q1 | Daily Brent crude % change from Jan 2026 baseline |
| Q2 | INR depreciation + effective INR/barrel cost increase |
| Q3 | Oil import origin before/after Hormuz closure |
| Q4 | Petrol pump price changes across cities |
| Q5 | Lagged correlation: oil shock → food CPI (6-week lag) |

## Files in This Folder
- `analysis.py` — Full Python script with all calculations
- `queries.sql` — SQL queries for price shock and import analysis
- `iran_shock_data.xlsx` — Excel workbook: timeline, pump price model, household impact
- `README.md` — This file

## Assumptions & Limitations
- Hormuz share (50%) is based on PPAC 2025-26 import origin data
- Pump price formula uses fixed excise/VAT rates (actual varies by state)
- Household fuel consumption (litres/month) estimated from NSSO transport expenditure
- OMC loss figures sourced from industry reports, not official government data
- Oil price and exchange rate data for May 2026 are as of mid-month
