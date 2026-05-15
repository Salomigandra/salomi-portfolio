# Methodology — The Invisible Tax on Your Savings (Inflation)

## Business Question
How does India's CPI basket design affect real purchasing power for working households — and are fixed deposits keeping up?

## Tools Used
| Tool | Role |
|---|---|
| **Python (pandas, numpy)** | Basket weight analysis, real return computation, purchasing power erosion model |
| **SQL (PostgreSQL)** | YoY inflation by category, FD real return join, volatile item ranking |
| **Excel** | Scenario sensitivity model, basket weight pie, FD rate comparison table |
| **React / JS** | Interactive inflation calculator, category CPI explorer, FD real return chart |

## Data Sources
| # | Source | URL | Year | Used For |
|---|---|---|---|---|
| 1 | MOSPI — CPI Monthly Data | mospi.gov.in | 2019–2024 | Category-level CPI indices and basket weights |
| 2 | RBI Monetary Policy Reports | rbi.org.in | 2019–2024 | Headline CPI targets and actual inflation |
| 3 | SBI / HDFC / ICICI FD Rate Cards | respective bank sites | 2019–2024 | 1-year term deposit interest rates |
| 4 | RBI DBIE Data Warehouse | dbie.rbi.org.in | 2024 | Historical CPI and inflation series |
| 5 | NSSO HCES 2022-23 | mospi.gov.in/hces | 2023 | Urban/rural basket weight breakdown |

## Key Calculations

### 1. Weighted Headline CPI (Urban)
```
headline_cpi = Σ (category_weight / 100) × category_yoy_inflation

Example (April 2024):
  Food & beverages: (36.29% × 8.7%) = 3.16
  Housing:          (21.67% × 4.1%) = 0.89
  Miscellaneous:    (28.32% × 3.9%) = 1.10
  + other categories…
  Total ≈ 4.83%
```

### 2. FD Real Return
```
real_return = ((1 + fd_rate/100) / (1 + cpi/100) - 1) × 100

Pre-tax example (2023): fd = 6.75%, cpi = 5.65%
  real = ((1.0675 / 1.0565) - 1) × 100 = +1.04%

Post-30% tax: effective fd = 6.75% × 0.70 = 4.725%
  real = ((1.04725 / 1.0565) - 1) × 100 = -0.87% (negative real return)
```

### 3. Purchasing Power Erosion (5-year compound)
```
real_value = principal × ((1 + fd_rate/100) / (1 + inflation/100))^years

₹1,00,000 at FD 7%, CPI 7%, 5 years:
  nominal = 1,00,000 × (1.07)^5 = ₹1,40,255
  real    = 1,00,000 × (1.07/1.07)^5 = ₹1,00,000
  Purchasing power: flat (zero real gain)
```

## SQL Query Summary (see queries.sql)
| Query | Purpose |
|---|---|
| Q1 | YoY CPI by category using window function |
| Q2 | Monthly food CPI trend with 12-month lag |
| Q3 | Most volatile food sub-categories by STDDEV |
| Q4 | FD real return JOIN with headline CPI by year |
| Q5 | 5-year cumulative inflation by basket category |

## Files in This Folder
- `analysis.py` — Full Python script with all calculations
- `queries.sql` — SQL queries for CPI trend analysis and FD real return
- `inflation_data.xlsx` — Excel workbook: basket weights, FD rates, real return scenarios
- `README.md` — This file

## Assumptions & Limitations
- Urban basket weights used throughout (rural basket is heavier on food)
- FD rates represent public sector bank (SBI) rates; private bank rates may differ
- Real return ignores TDS deduction at source (actual take-home may be lower)
- CPI base year 2012=100; absolute index comparisons are relative to that base
