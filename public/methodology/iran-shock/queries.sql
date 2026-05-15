-- ============================================================
-- Iran Shock — India Economic Impact SQL Queries
-- Case Study: The Iran Shock
-- Author    : Salomi Gandra
-- Database  : PPAC / RBI / World Bank commodity prices (PostgreSQL)
-- ============================================================

-- ── TABLE SCHEMA (reference) ─────────────────────────────────────────────────
-- commodity_prices(date DATE, commodity VARCHAR, price_usd DECIMAL, source VARCHAR)
-- exchange_rates(date DATE, currency_pair VARCHAR, rate DECIMAL)
-- india_oil_imports(month DATE, origin_country VARCHAR, volume_mb DECIMAL, route VARCHAR)
-- pump_prices(date DATE, city VARCHAR, fuel_type VARCHAR, price_inr DECIMAL)
-- ─────────────────────────────────────────────────────────────────────────────


-- Q1: Brent crude price shock — daily % change from baseline (Jan 2026)
-- ─────────────────────────────────────────────────────────────────────
WITH baseline AS (
    SELECT AVG(price_usd) AS base_price
    FROM commodity_prices
    WHERE commodity = 'Brent Crude'
      AND date BETWEEN '2026-01-01' AND '2026-01-31'
)
SELECT
    cp.date,
    cp.price_usd                                            AS brent_usd,
    ROUND((cp.price_usd / b.base_price - 1) * 100, 2)     AS pct_change_from_baseline,
    ROUND(cp.price_usd - b.base_price, 2)                  AS usd_increase
FROM commodity_prices cp, baseline b
WHERE cp.commodity = 'Brent Crude'
  AND cp.date >= '2026-01-01'
ORDER BY cp.date;


-- Q2: INR depreciation vs. USD during shock period
-- ─────────────────────────────────────────────────
WITH fx_baseline AS (
    SELECT AVG(rate) AS base_rate
    FROM exchange_rates
    WHERE currency_pair = 'USD/INR'
      AND date BETWEEN '2026-01-01' AND '2026-01-31'
)
SELECT
    er.date,
    er.rate                                                  AS usd_inr,
    ROUND((er.rate / fb.base_rate - 1) * 100, 3)           AS inr_depreciation_pct,
    -- Dual impact: higher USD price + weaker rupee
    cp.price_usd * er.rate                                   AS effective_inr_per_barrel,
    ROUND(
        (cp.price_usd * er.rate
         / (SELECT AVG(price_usd) * AVG(rate)
            FROM commodity_prices, exchange_rates
            WHERE commodity = 'Brent Crude'
              AND currency_pair = 'USD/INR'
              AND commodity_prices.date = exchange_rates.date
              AND commodity_prices.date BETWEEN '2026-01-01' AND '2026-01-31')
         - 1) * 100,
        2
    ) AS effective_cost_increase_pct
FROM exchange_rates er
JOIN commodity_prices cp
  ON er.date = cp.date
 AND cp.commodity = 'Brent Crude'
JOIN fx_baseline fb ON TRUE
WHERE er.currency_pair = 'USD/INR'
  AND er.date >= '2026-02-01'
ORDER BY er.date;


-- Q3: India's oil import origin before and after Hormuz closure
-- ─────────────────────────────────────────────────────────────
SELECT
    origin_country,
    route,
    SUM(CASE WHEN month < '2026-03-01' THEN volume_mb END)  AS pre_closure_mb,
    SUM(CASE WHEN month >= '2026-03-04' THEN volume_mb END) AS post_closure_mb,
    ROUND(
        (
            SUM(CASE WHEN month >= '2026-03-04' THEN volume_mb END)
          / NULLIF(SUM(CASE WHEN month < '2026-03-01' THEN volume_mb END), 0)
          - 1
        ) * 100,
        1
    ) AS volume_change_pct
FROM india_oil_imports
WHERE month BETWEEN '2026-01-01' AND '2026-05-31'
GROUP BY origin_country, route
ORDER BY pre_closure_mb DESC;


-- Q4: Petrol pump price changes across major cities
-- ─────────────────────────────────────────────────
SELECT
    city,
    fuel_type,
    MAX(CASE WHEN date = '2026-01-01' THEN price_inr END) AS price_jan2026,
    MAX(CASE WHEN date = '2026-05-01' THEN price_inr END) AS price_may2026,
    ROUND(
        MAX(CASE WHEN date = '2026-05-01' THEN price_inr END)
      - MAX(CASE WHEN date = '2026-01-01' THEN price_inr END),
        2
    ) AS absolute_increase,
    ROUND(
        (
            MAX(CASE WHEN date = '2026-05-01' THEN price_inr END)
          / MAX(CASE WHEN date = '2026-01-01' THEN price_inr END)
          - 1
        ) * 100,
        2
    ) AS pct_increase
FROM pump_prices
WHERE date IN ('2026-01-01','2026-05-01')
  AND fuel_type IN ('Petrol','Diesel')
GROUP BY city, fuel_type
ORDER BY pct_increase DESC;


-- Q5: Correlation between oil price shocks and CPI food inflation (lagged 6 weeks)
-- ─────────────────────────────────────────────────────────────────────────────────
-- (Approx: food transport costs feed into retail prices with ~6-week lag)
SELECT
    DATE_TRUNC('month', cp.date)                          AS month,
    AVG(cp.price_usd)                                     AS avg_brent,
    -- 6-week lag: use commodity price from 6 weeks earlier
    AVG(LAG(cp.price_usd, 42) OVER (ORDER BY cp.date))   AS brent_6wk_lag,
    cpi.yoy_food_inflation_pct
FROM commodity_prices cp
JOIN (
    SELECT month, yoy_inflation_pct AS yoy_food_inflation_pct
    FROM cpi_monthly
    WHERE category = 'Food & beverages' AND series = 'Urban'
) cpi ON DATE_TRUNC('month', cp.date) = cpi.month
WHERE cp.commodity = 'Brent Crude'
  AND cp.date >= '2024-01-01'
GROUP BY DATE_TRUNC('month', cp.date), cpi.yoy_food_inflation_pct
ORDER BY month;
