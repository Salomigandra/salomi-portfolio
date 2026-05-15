# Methodology — A Nation Running Late (IST)

## Business Question
What is the true economic cost of chronic lateness in India — and can behavioural science change it?

## Tools Used
| Tool | Role |
|---|---|
| **Python (pandas, numpy)** | GDP loss modelling, Hofstede PDI correlation, FD opportunity cost scenarios |
| **Excel** | Scenario sensitivity tables, FD calculator model, narrative charts |
| **React / JS** | Interactive dual clock, live FD calculator widget, scenario slider |

## Data Sources
| # | Source | URL | Year | Used For |
|---|---|---|---|---|
| 1 | KPMG India Workplace Survey | kpmg.com | 2023 | avg delay (19 min), meetings/day (2.3) |
| 2 | World Bank — India GDP | data.worldbank.org | 2023 | GDP ($3.73T), employed workforce (560M) |
| 3 | Hofstede Insights — PDI scores | hofstede-insights.com | 2023 | Power Distance Index by country |
| 4 | Osborne (2004) — Game Theory | MIT Press | 2004 | Nash equilibrium framing for lateness trap |
| 5 | Census / World Bank | censusindia.gov.in | 2023 | Working population estimate |

## Key Calculations

### 1. Annual GDP Loss
```
delay_hours_per_person = (19 min / 60) × 2.3 meetings × 250 working days
                       = 182.4 hours/year per person

gdp_per_worker = $3.73T / 560M workers = $6,661/worker/year
hourly_wage    = $6,661 / (250 × 8 h) = $3.33/hr

total_gdp_loss = 182.4 h × 560M workers × $3.33/hr
               = ~$340 billion/year (~9.1% of GDP)
```

### 2. Hofstede PDI Correlation
Cross-country comparison of Power Distance Index (PDI) scores against average
meeting delay times. Pearson r ≈ +0.94 — high PDI countries show longer delays
because meetings wait for the highest-ranking person.

### 3. FD Real Return
```
real_return = ((1 + fd_rate) / (1 + inflation)) - 1

Example: FD 7%, CPI 5.5%
         real = ((1.07 / 1.055) - 1) × 100 = +1.42%

Post-30% tax: FD effective = 7% × 0.70 = 4.9%
              real (post-tax) = ((1.049 / 1.055) - 1) × 100 = -0.57%
```

## Files in This Folder
- `analysis.py` — Full Python script with all calculations
- `ist_data.xlsx` — Excel workbook: scenario tables, PDI data, FD model
- `README.md` — This file

## Assumptions & Limitations
- GDP loss uses average wage across all workers (actual varies by sector/skill)
- PDI correlation is cross-sectional — does not control for confounding variables
- KPMG survey is self-reported and may over/underestimate actual delays
- Model assumes linear relationship between delay reduction and productivity gain
