# Methodology — The Price You Never Knew You'd Pay (Hospital Pricing)

## Business Question
Why does the same procedure cost 10× more at one US hospital than another — and who ultimately bears that cost?

## Tools Used
| Tool | Role |
|---|---|
| **Python (pandas, numpy)** | CMS price file parsing, price ratio computation, disparity analysis |
| **Excel** | OECD benchmarking table, compliance audit summary, uninsured premium model |
| **React / JS** | Interactive procedure price explorer, hospital type selector, OECD chart |

## Data Sources
| # | Source | URL | Year | Used For |
|---|---|---|---|---|
| 1 | CMS Hospital Price Transparency | cms.gov/hospital-price-transparency | 2023 | Machine-readable price files (chargemaster + negotiated rates) |
| 2 | OECD Health Statistics | stats.oecd.org | 2023 | International procedure cost benchmarks |
| 3 | KFF Health System Tracker | healthsystemtracker.org | 2023 | Hospital type breakdown, insured/uninsured breakdown |
| 4 | Patient Rights Advocate Report | patientrightsadvocate.org | 2023 | Compliance audit data |
| 5 | CMS Compliance Letters | cms.gov | 2023 | Non-compliance notices and fines |

## Key Calculations

### 1. Price Ratio (Negotiated Max / Negotiated Min)
```
price_ratio = max_negotiated_rate / min_negotiated_rate

Across hospital types: nonprofit, for-profit, government, critical access

Example: Hip replacement
  max = $26,800 (for-profit)
  min = $11,400 (critical access)
  ratio = 26,800 / 11,400 = 2.35×

vs. chargemaster high ($98,000):
  chargemaster_ratio = 98,000 / 11,400 = 8.6×
```

### 2. OECD Purchasing-Power-Parity Adjustment
OECD Health Statistics reports costs in national currency.
PPP adjustment: convert to USD using World Bank PPP conversion factor
to make international comparisons fair (removes currency/cost-of-living effects).

### 3. Transparency Compliance Rate
```
compliance_rate = compliant_hospitals / total_required × 100
               = 3,420 / 6,120 × 100 = 55.9%

Non-compliant = 2,700 hospitals (44.1%)
```

### 4. Uninsured Premium
```
uninsured_premium_pct = (self_pay_rate / insured_rate - 1) × 100

Example: Hip replacement
  (28,600 / 20,400 - 1) × 100 = +40.2%
  Uninsured patients pay 40% more than insured
```

## Files in This Folder
- `analysis.py` — Full Python script with all calculations
- `hospital_data.xlsx` — Excel workbook: procedure prices, OECD table, compliance data
- `README.md` — This file

## Assumptions & Limitations
- Prices represent median negotiated rates (individual negotiated rates vary)
- CMS machine-readable files may be incomplete or incorrectly formatted
- OECD benchmarks include all-in cost (facility + physician); US data is facility only
- Compliance audit is based on a sample — full 6,120 hospital audit not completed
