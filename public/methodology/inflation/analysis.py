"""
India Inflation Decoded — Data Analysis Script
==============================================
Case Study: The Invisible Tax on Your Savings
Author   : Salomi Gandra
Tools    : Python (pandas, numpy) + SQL (see queries.sql)
Purpose  : Analyse India's CPI basket composition, compute category-level
           inflation vs. FD real returns, model purchasing power erosion.

Data Sources
------------
1. MOSPI — CPI Monthly Data (Base Year 2012=100) 2019–2024
   https://mospi.gov.in/consumer-price-indices
   → category-level CPI indices and basket weights
2. RBI — Monetary Policy Reports & CPI releases
   https://rbi.org.in
3. SBI / HDFC / ICICI FD rates (1-year term, 2019–2024)
   Compiled from bank rate cards
4. DBIE (RBI Data Warehouse) — inflation time series
   https://dbie.rbi.org.in
"""

import pandas as pd
import numpy as np

# ── STEP 1: CPI BASKET WEIGHTS (MOSPI 2012 base) ─────────────────────────────
#   Urban basket weights used (differ from rural)

basket = pd.DataFrame({
    "category"         : [
        "Food & beverages", "Pan tobacco & intoxicants", "Clothing & footwear",
        "Housing", "Fuel & light", "Miscellaneous",
    ],
    "urban_weight_pct" : [36.29, 2.34, 5.60, 21.67, 5.58, 28.32],
    "rural_weight_pct" : [54.18, 3.26, 6.07, 7.68, 7.94, 21.61],
    # CPI index values (April 2024, base 2012=100)
    "cpi_apr2024"      : [191.4, 208.6, 173.2, 167.3, 218.4, 180.2],
    # One-year change (April 2023 → April 2024)
    "yoy_inflation_pct": [8.7, 4.2, 3.1, 4.1, 5.2, 3.9],
})

# Weighted inflation contribution
basket["urban_contribution"] = (
    basket["urban_weight_pct"] / 100 * basket["yoy_inflation_pct"]
).round(3)

headline_inflation = basket["urban_contribution"].sum()
print("── CPI BASKET (Urban, April 2024) ──")
print(basket.to_string(index=False))
print(f"\n  Weighted headline CPI (urban): {headline_inflation:.2f}%")

# ── STEP 2: FOOD INFLATION DEEP-DIVE ─────────────────────────────────────────
#   Food sub-categories (Apr 2024 YoY %)

food_sub = pd.DataFrame({
    "sub_category" : ["Cereals & products", "Meat & fish", "Egg",
                      "Milk & products", "Oils & fats", "Vegetables",
                      "Fruits", "Pulses", "Sugar"],
    "yoy_pct"      : [8.4, 8.8, 8.1, 3.9, 1.6, 27.8, 6.9, 16.8, 3.8],
    "basket_share" : [9.67, 3.84, 0.43, 6.61, 3.56, 6.04, 2.89, 2.38, 1.36],
})
food_sub["contribution"] = (food_sub["basket_share"]/100 * food_sub["yoy_pct"]).round(3)
print("\n── FOOD SUB-CATEGORY INFLATION (Apr 2024) ──")
print(food_sub.to_string(index=False))

# ── STEP 3: FD REAL RETURN CALCULATION ───────────────────────────────────────
#   Real Return = ((1 + fd_rate) / (1 + inflation)) - 1

fd_rates_historical = pd.DataFrame({
    "year"           : [2019, 2020, 2021, 2022, 2023, 2024],
    "avg_1yr_fd_rate": [7.00, 5.40, 5.15, 5.30, 6.75, 6.85],  # % SBI 1-yr FD
    "headline_cpi"   : [3.73, 6.62, 5.13, 6.70, 5.65, 4.83],  # % annual avg
})

fd_rates_historical["real_return_pct"] = (
    ((1 + fd_rates_historical["avg_1yr_fd_rate"]/100)
     / (1 + fd_rates_historical["headline_cpi"]/100) - 1) * 100
).round(2)

# After-tax real return (30% tax bracket)
fd_rates_historical["post_tax_fd"]     = fd_rates_historical["avg_1yr_fd_rate"] * 0.70
fd_rates_historical["post_tax_real"]   = (
    ((1 + fd_rates_historical["post_tax_fd"]/100)
     / (1 + fd_rates_historical["headline_cpi"]/100) - 1) * 100
).round(2)

print("\n── FD REAL RETURN (SBI 1-yr FD, 2019–2024) ──")
print(fd_rates_historical.to_string(index=False))

neg_real_years = (fd_rates_historical["real_return_pct"] < 0).sum()
print(f"\n  Years with negative real return (pre-tax): {neg_real_years}/6")
post_neg = (fd_rates_historical["post_tax_real"] < 0).sum()
print(f"  Years with negative real return (post-tax): {post_neg}/6")

# ── STEP 4: PURCHASING POWER EROSION (₹1,00,000 over 5 years) ────────────────

def compound_real(principal, fd_rate, inflation, years):
    nominal = principal * (1 + fd_rate/100) ** years
    real    = principal * ((1 + fd_rate/100) / (1 + inflation/100)) ** years
    return {"nominal": round(nominal), "real": round(real),
            "purchasing_power_loss": round(nominal - real)}

print("\n── PURCHASING POWER EROSION (₹1,00,000, 5 years) ──")
scenarios = [
    ("FD 7%, CPI 5%",   7.0, 5.0),
    ("FD 7%, CPI 7%",   7.0, 7.0),
    ("FD 6%, CPI 8%",   6.0, 8.0),
    ("FD 7%, CPI 10%",  7.0, 10.0),
]
for label, fd, cpi in scenarios:
    r = compound_real(100_000, fd, cpi, 5)
    print(f"  {label:25s} → Nominal ₹{r['nominal']:,} | Real ₹{r['real']:,} | Loss ₹{r['purchasing_power_loss']:,}")

# ── EXPORT ───────────────────────────────────────────────────────────────────
basket.to_csv("cpi_basket_weights.csv", index=False)
fd_rates_historical.to_csv("fd_real_returns.csv", index=False)
food_sub.to_csv("food_subcategory_inflation.csv", index=False)
print("\nExported: cpi_basket_weights.csv, fd_real_returns.csv, food_subcategory_inflation.csv")
