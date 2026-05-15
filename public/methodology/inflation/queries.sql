-- ============================================================
-- India Inflation Decoded — SQL Queries
-- Case Study: The Invisible Tax on Your Savings
-- Author    : Salomi Gandra
-- Database  : RBI DBIE / MOSPI CPI data (PostgreSQL schema)
-- ============================================================

-- ── TABLE SCHEMA (reference) ─────────────────────────────────────────────────
-- cpi_monthly(month DATE, category VARCHAR, sub_category VARCHAR,
--             series VARCHAR, index_value DECIMAL, base_year INT)
-- fd_rates(date DATE, bank VARCHAR, tenure VARCHAR, rate_pct DECIMAL)
-- ─────────────────────────────────────────────────────────────────────────────


-- Q1: Headline CPI YoY inflation by category (Urban, FY2024)
-- ─────────────────────────────────────────────────────────
SELECT
    category,
    ROUND(
        (
            AVG(CASE WHEN EXTRACT(YEAR FROM month) = 2024 THEN index_value END)
          / AVG(CASE WHEN EXTRACT(YEAR FROM month) = 2023 THEN index_value END)
          - 1
        ) * 100,
        2
    ) AS yoy_inflation_pct
FROM cpi_monthly
WHERE series = 'Urban'
  AND EXTRACT(MONTH FROM month) BETWEEN 4 AND 3  -- April to March (Indian FY)
GROUP BY category
ORDER BY yoy_inflation_pct DESC;


-- Q2: Monthly CPI trend for Food & Beverages (last 24 months)
-- ─────────────────────────────────────────────────────────────
SELECT
    month,
    category,
    index_value,
    LAG(index_value, 12) OVER (PARTITION BY category ORDER BY month) AS index_12m_ago,
    ROUND(
        (index_value / LAG(index_value, 12) OVER (PARTITION BY category ORDER BY month) - 1) * 100,
        2
    ) AS yoy_change_pct
FROM cpi_monthly
WHERE category = 'Food & beverages'
  AND series   = 'Urban'
  AND month    >= CURRENT_DATE - INTERVAL '24 months'
ORDER BY month;


-- Q3: Volatile food items — highest 3-month standard deviation
-- ─────────────────────────────────────────────────────────────
SELECT
    sub_category,
    ROUND(STDDEV(index_value), 2)                        AS price_volatility,
    ROUND(AVG(index_value), 1)                           AS avg_index,
    ROUND(MAX(index_value) / MIN(index_value) * 100 - 100, 1) AS peak_to_trough_pct
FROM cpi_monthly
WHERE category = 'Food & beverages'
  AND series   = 'Urban'
  AND month    >= '2022-01-01'
GROUP BY sub_category
ORDER BY price_volatility DESC
LIMIT 10;


-- Q4: FD real return by bank and year (pre-tax and post-tax 30% bracket)
-- ─────────────────────────────────────────────────────────────────────
WITH headline AS (
    SELECT
        EXTRACT(YEAR FROM month)  AS year,
        AVG(index_value)          AS avg_index
    FROM cpi_monthly
    WHERE category = 'General'
      AND series   = 'Urban'
    GROUP BY 1
),
headline_inflation AS (
    SELECT
        year,
        ROUND(
            (avg_index / LAG(avg_index) OVER (ORDER BY year) - 1) * 100,
            2
        ) AS cpi_pct
    FROM headline
)
SELECT
    f.date,
    f.bank,
    f.tenure,
    f.rate_pct                                     AS fd_rate_pct,
    hi.cpi_pct                                     AS headline_cpi,
    ROUND(f.rate_pct - hi.cpi_pct, 2)             AS real_return_pretax,
    ROUND(f.rate_pct * 0.70 - hi.cpi_pct, 2)      AS real_return_post30pct_tax
FROM fd_rates f
JOIN headline_inflation hi
  ON EXTRACT(YEAR FROM f.date) = hi.year
WHERE f.tenure = '1 year'
  AND f.bank IN ('SBI', 'HDFC', 'ICICI')
ORDER BY f.date, f.bank;


-- Q5: Which income categories saw real consumption drop vs. income growth?
-- ─────────────────────────────────────────────────────────────────────────
-- (Cross-query: join CPI basket weights with HCES expenditure data)
SELECT
    c.category,
    c.urban_weight_pct,
    ROUND(
        (
            AVG(CASE WHEN EXTRACT(YEAR FROM c2.month) = 2024 THEN c2.index_value END)
          / AVG(CASE WHEN EXTRACT(YEAR FROM c2.month) = 2019 THEN c2.index_value END)
          - 1
        ) * 100,
        1
    ) AS cumulative_inflation_5yr
FROM cpi_basket_weights c
JOIN cpi_monthly c2
  ON c.category = c2.category
 AND c2.series  = 'Urban'
GROUP BY c.category, c.urban_weight_pct
ORDER BY cumulative_inflation_5yr DESC;
