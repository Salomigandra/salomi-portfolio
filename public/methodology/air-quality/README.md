# Methodology — Breathing Numbers (Air Quality)

## Business Question
How does India's air quality crisis translate into measurable health burden — and which cities and seasons are worst?

## Tools Used
| Tool | Role |
|---|---|
| **Python (pandas, numpy)** | AQI data processing, health burden (GEMM model), source apportionment |
| **Excel** | City benchmarking table, WHO comparison charts, seasonal index |
| **React / JS** | Interactive AQI gauges, city selector, seasonal trend chart |

## Data Sources
| # | Source | URL | Year | Used For |
|---|---|---|---|---|
| 1 | CPCB AQI Station Data | app.cpcbccr.com | 2019–2023 | PM2.5 annual means by city |
| 2 | WHO Global Air Quality Guidelines | who.int | 2021 | 5 µg/m³ safe threshold |
| 3 | Health Effects Institute — State of Global Air | stateofglobalair.org | 2024 | GEMM coefficient (β = 0.00575) |
| 4 | CPCB / IIT Kanpur — Source Receptor Study | cpcb.nic.in | 2023 | PM2.5 source apportionment (Delhi) |
| 5 | UN World Population Prospects | population.un.org | 2023 | City population estimates |

## Key Calculations

### 1. PM2.5 Benchmark Ratio
```
times_over_who = city_pm25_annual_mean / 5 µg/m³

Example: Delhi (99.7 µg/m³)
         99.7 / 5 = 19.9× above WHO guideline
```

### 2. Health Burden — GEMM Model
Based on the Global Exposure Mortality Model (HEI 2024):
```
attributable_deaths = population × baseline_mortality_rate
                      × (1 - exp(-β × max(PM2.5 - CF, 0)))

Where:
  β    = 0.00575   (all-cause mortality coefficient, GEMM)
  CF   = 2.4 µg/m³ (counterfactual minimum)
  rate = 0.0074    (India crude death rate, World Bank 2023)

Example: Delhi (32.9M people, PM2.5 = 99.7)
  excess = 99.7 - 2.4 = 97.3 µg/m³
  frac   = 1 - exp(-0.00575 × 97.3) = 0.428
  deaths = 32.9M × 0.0074 × 0.428 ≈ 104,300/year
```

### 3. Seasonal Pattern
Monthly AQI derived from CPCB station averages (Delhi, 2022–23).
Winter months (Nov–Jan) show 4–5× higher PM2.5 than monsoon months
due to temperature inversions, stubble burning, and reduced dispersion.

## Files in This Folder
- `analysis.py` — Full Python script with all calculations
- `air_quality_data.xlsx` — Excel workbook: city benchmarks, seasonal data, source shares
- `README.md` — This file

## Assumptions & Limitations
- Annual PM2.5 means are station-level averages (spatial coverage varies by city)
- GEMM model gives population-attributable fraction, not individual-level risk
- Source apportionment for Delhi only — other cities use CPCB provisional data
- Health burden is conservative (excludes cardiovascular and respiratory morbidity)
