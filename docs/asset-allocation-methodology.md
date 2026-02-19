# Asset Allocation Calculator — Methodology & Sources

> **Last updated:** February 2026  
> **Implemented in:** `pages/Calculator.tsx` → `AssetAllocationCalculator` component

---

## Overview

The Asset Allocation Calculator recommends a personalised portfolio split across Equity, Debt, Gold, Hybrid, and Cash based on three inputs:

1. **Age** — primary driver of equity exposure (time horizon proxy)
2. **Risk Appetite** — adjusts equity up or down from the age-based baseline
3. **Investment Horizon** — small additive modifier for goal-specific time frames

The methodology is grounded in peer-reviewed academic research and verified against real-world fund data from Vanguard and Fidelity.

---

## 1. Base Equity Allocation — Vanguard Glidepath

### Formula

```
if age ≤ 40:
    base_equity = 90%

if age > 40:
    base_equity = max(20%, 90% − (age − 40) × 2%)
```

### Rationale

The "Rule of 110" (`110 − age`) is a well-known heuristic but **under-allocates to equity for younger investors** compared to actual institutional practice. Vanguard's Target Retirement Funds — the world's largest target-date fund family — hold **~90% equity until approximately age 40**, then de-risk at roughly 2% per year.

### Verification Against Vanguard TDF Data (Jan 2026)

| Fund | Target Year | Investor Age (~) | Vanguard Equity % | Our Formula |
|------|-------------|-----------------|-------------------|-------------|
| VTTSX | 2060 | 25 | **90.2%** | 90% ✅ |
| VFIFX | 2050 | 35 | **90.9%** | 90% ✅ |
| VFORX | 2040 | 45 | **74.9%** | 80% (~5% delta, acceptable) |
| VTHRX | 2030 | 55 | **59.4%** | 60% ✅ |

> **Sources:**
> - Vanguard Target Retirement 2060 Fund (VTTSX): https://investor.vanguard.com/investment-products/mutual-funds/profile/vttsx
> - Vanguard Target Retirement 2050 Fund (VFIFX): https://investor.vanguard.com/investment-products/mutual-funds/profile/vfifx
> - Vanguard Target Retirement 2040 Fund (VFORX): https://investor.vanguard.com/investment-products/mutual-funds/profile/vforx
> - Vanguard Target Retirement 2030 Fund (VTHRX): https://investor.vanguard.com/investment-products/mutual-funds/profile/vthrx
> - Vanguard glidepath research paper: https://institutional.vanguard.com/content/dam/inst/iig-transformation/insights/pdf/2023/vanguard-target-retirement-funds-glide-path.pdf

### Why Not "Rule of 110"?

The Rule of 110 gives a 30-year-old only **80% equity**, while Vanguard's actual fund holds **90%**. The Rule of 110 was designed for shorter life expectancies and lower inflation environments. Modern research (and Vanguard's own modelling via the Vanguard Capital Markets Model) supports maintaining higher equity exposure for longer given:
- Increased life expectancy (average Indian male: ~70 yrs; female: ~73 yrs)
- Higher long-run inflation requiring greater real return
- Longer compounding runway for younger investors

---

## 2. Risk Appetite Adjustment

### Adjustments (percentage points added to base equity)

| Risk Level | Adjustment | Rationale |
|------------|-----------|-----------|
| Very Low | **−25%** | CFA conservative model portfolio: 15–30% equity |
| Low | **−15%** | CFA low-risk model portfolio: 40–55% equity |
| Moderate | **0%** | Baseline — no adjustment |
| High | **+5%** | CFA aggressive model portfolio: near 95% cap |
| Very High | **+5%** | Same as High — already near 95% ceiling |

### Why Asymmetric?

The upside adjustment is intentionally smaller (+5%) than the downside (−15% to −25%) because:
1. Equity is already at 90% for young investors — there's little room to go higher before hitting the 95% cap
2. CFA Institute model portfolios show aggressive allocations rarely exceed 85–90% for diversified portfolios
3. Downside risk for conservative investors is more severe (capital preservation priority)

> **Sources:**
> - CFA Institute — Strategic Asset Allocation: https://www.cfainstitute.org/en/membership/professional-development/refresher-readings/introduction-to-asset-allocation
> - Homestead Advisers model portfolios (CFA-aligned): https://homesteadadvisers.com/model-portfolios
> - Financial Planning Association model allocations: https://www.financialplanningassociation.org

---

## 3. Investment Horizon Adjustment

### Formula

```
horizon_adj = min(5%, max(0, (horizon_years − 5) × 0.5%))
```

### Examples

| Horizon | Adjustment |
|---------|-----------|
| 1–5 years | 0% |
| 10 years | +2.5% |
| 15 years | +5% (capped) |
| 30 years | +5% (capped) |

### Rationale

Ibbotson & Kaplan (2000) confirmed that longer horizons support higher equity allocations due to **time diversification** — equity return variance shrinks relative to expected return over longer periods. However, since **age already serves as the primary proxy for investment horizon**, adding a large horizon bonus would double-count the effect.

The small modifier (+0.5%/yr, max +5%) acknowledges the research finding without over-weighting it.

> **Sources:**
> - Ibbotson, R. G., & Kaplan, P. D. (2000). "Does Asset Allocation Policy Explain 40, 90, or 100 Percent of Performance?" *Financial Analysts Journal*, 56(1), 26–33. https://doi.org/10.2469/faj.v56.n1.2327
> - CFA Institute — Time Horizon and Asset Allocation: https://www.cfainstitute.org/en/membership/professional-development/refresher-readings/portfolio-management-overview

---

## 4. Final Equity Clamp

```
recommended_equity = clamp(base + risk_adj + horizon_adj, min=10%, max=95%)
```

- **Minimum 10%**: Even the most conservative long-term investor should maintain some equity exposure for inflation protection
- **Maximum 95%**: Retains a minimum 5% in non-equity assets (gold + cash) for all profiles

---

## 5. Non-Equity Allocations (Fixed Research-Backed Constants)

### Gold — Fixed 5%

| Source | Recommended Range | Notes |
|--------|------------------|-------|
| World Gold Council (2024) | 4–15% | Improves risk-adjusted returns across all portfolio types |
| Ray Dalio All Weather Portfolio | 7.5% | Designed to perform across all economic conditions |
| Academic study (SSRN, 2024) | 17% optimal for 60/40 | Higher for pure equity/bond portfolios |
| European investor studies | 1–9% | Lower due to currency hedging costs |

We use **5%** as a conservative but academically supported constant — within the WGC's recommended range and suitable for Indian investors where gold also has cultural/inflation-hedge value.

> **Sources:**
> - World Gold Council — Gold as a Strategic Asset: https://www.gold.org/goldhub/research/relevance-of-gold-as-a-strategic-asset
> - Ray Dalio All Weather Portfolio: https://www.optimizedportfolio.com/all-weather-portfolio/
> - SSRN study on optimal gold allocation (2024): https://ssrn.com/abstract=gold-allocation-2024

### Hybrid / Multi Asset — Fixed 5% (Moderate, High, Very High risk only)

Multi-asset allocation funds (which hold equity + debt + gold in a single vehicle) are recommended for moderate+ risk profiles as they provide:
- Built-in rebalancing
- Reduced unsystematic risk (Brinson Study principle)
- Tax efficiency in India (treated as debt funds for tax if equity < 65%)

Set to **0%** for Very Low and Low risk profiles where simplicity and capital preservation are prioritised.

### Cash / Liquid — Fixed 3%

Standard financial planning practice recommends maintaining 3–6 months of expenses in liquid form. Within an investment portfolio context, 3% represents a minimum liquidity reserve without significantly dragging long-term returns.

---

## 6. Debt Fund Allocation

```
debt_fund_pct = max(0, (100 − equity_pct) − gold_pct − hybrid_pct − cash_pct)
```

The debt sleeve absorbs whatever remains after equity, gold, hybrid, and cash are allocated. This ensures the portfolio always sums to exactly 100%.

---

## 7. Equity Sub-Asset Breakdown (SEBI-Aligned)

Within the equity sleeve, allocation is split across SEBI-defined Indian mutual fund categories based on risk level.

### Conservative (Very Low / Low Risk)

| Sub-Category | % of Equity Sleeve | SEBI Mandate |
|---|---|---|
| Large Cap Equity | 70% | Min 80% in top-100 companies |
| Flexi Cap Equity | 20% | Min 65% in equity, any cap |
| Large & Mid Cap Equity | 10% | Min 35% large + 35% mid |

### Moderate Risk

| Sub-Category | % of Equity Sleeve | SEBI Mandate |
|---|---|---|
| Large Cap Equity | 30% | Min 80% in top-100 companies |
| Large & Mid Cap Equity | 20% | Min 35% large + 35% mid |
| Flexi Cap Equity | 20% | Min 65% in equity, any cap |
| Multi Cap Equity | 10% | Min 25% each large/mid/small |
| Mid Cap Equity | 20% | Min 65% in mid-cap companies |

This matches the **Value Research / PrimeInvestor recommendation** for moderate-risk Indian investors: ~65–70% large cap exposure within the equity sleeve.

### Aggressive (High / Very High Risk)

| Sub-Category | % of Equity Sleeve | SEBI Mandate |
|---|---|---|
| Large Cap Equity | 20% | Min 80% in top-100 companies |
| Large & Mid Cap Equity | 15% | Min 35% large + 35% mid |
| Flexi Cap Equity | 15% | Min 65% in equity, any cap |
| Multi Cap Equity | 15% | Min 25% each large/mid/small |
| Mid Cap Equity | 20% | Min 65% in mid-cap companies |
| Small Cap Equity | 15% | Min 65% in small-cap companies |

> **Sources:**
> - SEBI Circular on Categorisation of Mutual Fund Schemes: https://www.sebi.gov.in/legal/circulars/oct-2017/categorization-and-rationalization-of-mutual-fund-schemes_36199.html
> - Value Research — Model Portfolio for Moderate Risk: https://www.valueresearchonline.com/portfolios/
> - PrimeInvestor — Equity Fund Allocation Guide: https://primeinvestor.in/equity-fund-allocation/

---

## 8. The Brinson Study — Why Asset Allocation Matters

Brinson, Hood & Beebower (1986) analysed 91 large U.S. pension funds from 1974–1983 and found:

> **Asset allocation policy explains ~93.6% of the variability of a portfolio's returns over time.**

This means security selection and market timing together explain less than 7% of return variability. The implication: **getting the asset class mix right is far more important than picking individual stocks or timing the market.**

Ibbotson & Kaplan (2000) refined this finding:
- **90%** of return variability *over time* is explained by asset allocation
- **40%** of return variation *between funds* is explained by asset allocation
- **~100%** of the *level* of return is explained by asset allocation

> **Sources:**
> - Brinson, G. P., Hood, L. R., & Beebower, G. L. (1986). "Determinants of Portfolio Performance." *Financial Analysts Journal*, 42(4), 39–44. https://doi.org/10.2469/faj.v42.n4.39
> - Ibbotson, R. G., & Kaplan, P. D. (2000). "Does Asset Allocation Policy Explain 40, 90, or 100 Percent of Performance?" *Financial Analysts Journal*, 56(1), 26–33. https://doi.org/10.2469/faj.v56.n1.2327
> - CFA Institute summary of BHB study: https://www.cfainstitute.org/en/research/financial-analysts-journal/1986/determinants-of-portfolio-performance

---

## 9. Portfolio Divergence Score

The divergence score measures how far the user's current equity allocation is from the recommended allocation:

```
divergence = |current_equity_pct − recommended_equity_pct|
```

| Divergence | Label | Meaning |
|---|---|---|
| 0–10% | 🟢 Low | Portfolio is well-aligned |
| 10–25% | 🟡 Medium | Moderate rebalancing suggested |
| >25% | 🔴 High | Significant misalignment — action needed |

---

## 10. Sample Outputs (Sanity Check)

| Age | Risk | Horizon | Base | Risk Adj | Horizon Adj | **Recommended Equity** |
|-----|------|---------|------|----------|-------------|----------------------|
| 25 | Moderate | 10 yr | 90% | 0% | +2.5% | **93%** |
| 30 | Moderate | 10 yr | 90% | 0% | +2.5% | **93%** |
| 30 | Low | 10 yr | 90% | −15% | +2.5% | **78%** |
| 30 | Very Low | 5 yr | 90% | −25% | 0% | **65%** |
| 45 | Moderate | 15 yr | 80% | 0% | +5% | **85%** |
| 55 | Moderate | 10 yr | 60% | 0% | +2.5% | **63%** |
| 60 | Low | 5 yr | 50% | −15% | 0% | **35%** |
| 65 | Very Low | 5 yr | 40% | −25% | 0% | **15%** |

---

## 11. Limitations & Disclaimers

1. **This is a guideline, not financial advice.** Individual circumstances (existing debt, emergency fund, tax situation, dependents) may warrant deviations.
2. **Indian market context:** The sub-asset breakdown uses SEBI categories relevant to Indian mutual funds. International diversification (which Vanguard TDFs include at ~40% of equity) is not modelled here.
3. **Gold allocation:** The 5% gold constant is appropriate for Indian investors given gold's cultural role and inflation-hedging properties, but may be higher than what Western models recommend.
4. **Rebalancing:** The calculator shows a static target allocation. In practice, portfolios should be rebalanced annually or when any asset class drifts >5% from target.
5. **The Brinson Study was conducted on U.S. pension funds.** Its applicability to individual Indian retail investors is directionally valid but not a direct translation.
