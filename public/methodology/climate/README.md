# Methodology — Degrees of Consequence (Climate)

## Business Question
How far off track are global warming trends vs. Paris Agreement pledges — and which sectors drive the gap?

## Tools Used
| Tool | Role |
|---|---|
| **Python (pandas, numpy)** | GISTEMP time-series processing, linear trend regression, carbon budget countdown |
| **Excel** | Emissions scenario tables, sector breakdown model, pledge gap visualisation data |
| **React / JS** | Animated warming chart, carbon clock widget, sector donut chart, country emissions explorer |

## Data Sources
| # | Source | URL | Year | Used For |
|---|---|---|---|---|
| 1 | NASA GISTEMP v4 | data.giss.nasa.gov/gistemp | 2023 | Annual temperature anomaly 1950–2023 |
| 2 | IPCC AR6 — Summary for Policymakers | ipcc.ch/ar6 | 2021 | Remaining carbon budget (1.5°C / 2°C) |
| 3 | Our World in Data — CO₂ Emissions | ourworldindata.org/co2 | 2023 | Country/sector emissions time series |
| 4 | UNEP Emissions Gap Report | unep.org/resources/emissions-gap-report | 2023 | NDC pledges vs. required reductions |
| 5 | Global Carbon Project | globalcarbonproject.org | 2023 | Current annual global emissions (37.4 GtCO₂) |

## Key Calculations

### 1. Warming Trend (Linear Regression on GISTEMP)
```
Fit: anomaly(year) = β₁ × year + β₀
Using numpy.polyfit on 1950–2023 data

Result: +0.189°C per decade (1950–2023 trend)
        +0.262°C per decade (1980–2023 trend — accelerating)

2023 anomaly vs. pre-industrial:
  GISTEMP baseline = 1951–1980
  Pre-industrial offset ≈ +0.29°C below 1951–1980 mean
  2023 anomaly = 1.17°C (vs. 1951-80) → ~1.46°C above pre-industrial
```

### 2. Carbon Budget Countdown
```
years_to_exhaust = remaining_budget / annual_emissions

1.5°C (67% prob): 380 GtCO₂ / 37.4 GtCO₂/yr = 10.2 years → exhaust ~2033
2.0°C (67% prob): 1,230 GtCO₂ / 37.4 GtCO₂/yr = 32.9 years → exhaust ~2056

Source: IPCC AR6 Table SPM.2, updated from 2020 to 2023 base year
```

### 3. NDC Pledge Gap
```
pledge_gap_1_5C = emissions_unconditional_NDC - required_for_1_5C
                = 53.4 GtCO₂e - 30.0 GtCO₂e
                = 23.4 GtCO₂e/yr gap remaining in 2030

pledge_gap_2C   = 53.4 - 41.0 = 12.4 GtCO₂e/yr gap
```

## Files in This Folder
- `analysis.py` — Full Python script with all calculations
- `climate_data.xlsx` — Excel workbook: GISTEMP anomaly series, NDC table, sector data
- `README.md` — This file

## Assumptions & Limitations
- GISTEMP anomaly is surface temperature; satellite records show slightly different trends
- Carbon budget numbers assume current emissions trajectory — any acceleration reduces years remaining
- NDC pledge data reflects 2023 submissions; not all NDCs have been updated post-COP28
- Sector emissions shares (OWID/GCP) include both CO₂ and non-CO₂ GHGs in CO₂e
