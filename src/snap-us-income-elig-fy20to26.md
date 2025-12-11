```js
// LINDGREN: Let's import charts!
import {monthlyNationalGrossSnapIncome} from "./components/charts.js"
/** LINDGREN:
 * No need to import Observable libs
 * in an Observable Framework notebook file
 * context. Only in other files like .js.
**/
// import {FileAttachment} from "observablehq:stdlib";

/** LINDGREN
 * A better method is to add this
 * file ref to the 'head' property
 * in the config file. Did so for you.
**/
// html`<link href="${await FileAttachment("style.css").url()}" rel="stylesheet" />`
```

# SQ1: Are SNAP benefits becoming harder to access?

**The following line graphs show changes in SNAP accessibility over time, both nationally and in Wake County, North Carolina.** 

<!-- Attach the data -->
```js
//Attached datasets I want to work with
const snapBenefitsPerPerson = FileAttachment("./data/usda/FY69-24-SNAP-Annual-Avg-Benefits-per-Person.csv").csv({typed: true})

const snapNCAppsByMonth2019To2025 = FileAttachment("./data/usda/CY2019-25-Annual-NC-Snap-Applications.csv").csv({typed: true})

const incomeEligibilityDatasets = [
  ["48 States/DC/Guam/Virgin Islands", await FileAttachment("./data/usda/contig_states.csv").csv({typed: true})],
  ["Alaska", await FileAttachment("./data/usda/alaska.csv").csv({typed: true})],
  ["Hawaii", await FileAttachment("./data/usda/hawaii.csv").csv({typed: true})],
];

const aboveSNAPThresholdDatasets = [
  ["Wake County", await FileAttachment("./data/map-the-meal-gap/FI-above-SNAP-threshold-WC.csv").csv({typed: true})],
  ["North Carolina", await FileAttachment("./data/map-the-meal-gap/FI-above-SNAP-threshold-NC.csv").csv({typed: true})],
];

// LINDGREN: Added to provide contrast to median national monthly gross income
const monthlyGrossIncome = FileAttachment("./data/acs/us-median-monthly-gross-income.csv").csv({type:true});
```

<!-- Initial flattening - data processing -->
```js
//Converted datasets to arrays for graphing
const benefitsArray = Array.from(snapBenefitsPerPerson)
const appsArray = Array.from(snapNCAppsByMonth2019To2025)
const incomeArray = incomeEligibilityDatasets.flatMap(([recipient, rows]) =>
  rows.map(row => ({ recipient, ...row }))
);
const aboveSNAPThresholdArray = aboveSNAPThresholdDatasets.flatMap(([area, rows]) =>
  rows.map(row => ({ area, ...row }))
);
```

## FY 2020-2026 SNAP Gross Monthly Income Limits for Household of 4 (in Contiguous United States/D.C./Guam/Virgin Islands, Alaska, and Hawaii)*

<!-- LINDGREN
  Wanted to show you how to simplify your notebook space
  by exporting/importing your chart components.

  Note how I needed to set a height size with `style="grid-auto-rows: 600px;"`.
  The resize() method is Observable's way of making responsive displays.
-->
<div class="grid grid-cols-1" style="grid-auto-rows: 600px;">

  <div class="card">
    <!-- Import the chart here -->
    ${resize((width, height) => monthlyNationalGrossSnapIncome(width, height, {d1: incomeArray, d2: monthlyGrossIncome}, "fiscal_year", "income_limit", "recipient"))}
  </div>

</div>

<!-- LINDGREN
  I like the use of the note pattern throughout your work!
  I might suggest using a tooltip (Plot.tip()) to display 1-2 of such points,
  so such important information is displayed in vivo within its data context.
-->
<div class="note">
  <p>
    The graph above charts annual changes in the monthly gross income limit (to qualify for SNAP benefits) for a 4-person household over six consecutive fiscal years (October 1, 2019 to September 30, 2026). [<em>Data from the USDA website.</em>]
  </p>
  <p>
    The monthly gross income limit is 130% of the poverty level.
  </p>
  <p>
  The graph illustrates that <strong>eligibility limits have increased very little (an average of $115.50 per fiscal year) over the past several years</strong>, despite the elevated cost of living.
  <ul>
    <li>
    In 2025, a family of four would need an annual gross income of $111,040 (or $9,250 per month) to live comfortably and cover their basic needs in Wake County, data suggests.
    </li>
  </ul>
  </p>
  <p>
  <em>*The higher monthly gross income limits in Alaska and Hawaii are meant to compensate for the higher cost of living.</em>
  </p>
</div>

## FY 1969-2024 SNAP Average Monthly Benefits Per Person in Dollars (National)*

<!-- LINDGREN
  I would always provice at least 1-2 sentences to frame the chart.
  Yet, I appreciate your thoughtful headings throughout your work.
-->

```js
Plot.plot({
  x: {
    label: "Fiscal Year",
    domain: [1969, 2030]
  },
  y: {
    label: "Avg. Benefits (Dollars)",
    grid: true
  },
  marks: [
    Plot.ruleY([0]),
    Plot.ruleX(benefitsArray, Plot.pointerX({x: "fiscal_year", py: "avg_benefits", stroke: "red"})),
    Plot.line(benefitsArray, {x: "fiscal_year", y: "avg_benefits"}),
    Plot.tip(benefitsArray, Plot.pointerX({x: "fiscal_year", y: "avg_benefits"}))
  ]
})
```

<div class="note">
  <p>
    The graph above charts annual changes in average monthly SNAP benefits (in dollars) per SNAP participant nationally from FY1969 to FY2024. [<em>Data from the USDA website.</em>]
  </p>
  <p>
    The graph indicates a fairly steady increase in monthly SNAP benefits from FY1969 (first year of the SNAP program) until about FY2019. <strong>Between FY2019 and FY2021, monthly benefits increased by about $85</strong> (<em>compare this to an average yearly increase of approximately $2.46 between FY1969 and FY2019</em>).
  </p>
  <ul>
    <li>
    The dramatic increase in benefits is likely related to increased need during early COVID.
    </li>
  </ul>
  <p>
  <strong>Between FY2022 and FY2024, monthly benefits dropped by $43.19, the most significant decrease in the nearly 60-year history of the SNAP program</strong>. Prior to FY2022, the amount rarely ever decreased from year to year; if it did, it was by little more than $1.
  </p>
  <p>
  <em>*FY2025 data not yet available.</em>
  </p>
</div>


## [Food Insecure Individuals > SNAP Threshold in North Carolina] vs. [Food Insecure Individuals > SNAP Threshold in Wake County], 2019 - 2023*

```js
Plot.plot({
  //added grid, axis labels, domain limits for y-axis
  x: {grid: true, label: "Year", ticks: [2019, 2020, 2021, 2022, 2023], tickFormat: ""},
  /** LINDGREN:
   * Either use d3.max() to help establish the domain,
   * or if using a discrete scale like percentages 0-100,
   * then just use that scale.
   * Toggle the below to see the differences in scale rendered.
  **/
  // y: {grid: true, domain: [0, 60], label: "% FI > SNAP Threshold"},
  // y: {grid: true, domain: [0, d3.max(aboveSNAPThresholdArray, d => d.percentage)], label: "% FI > SNAP Threshold"},
  y: {grid: true, domain: [0, 100], label: "% FI > SNAP Threshold"},
  marks: [
    //added legend, pointer rule mark, tooltip to display details when hovering over data point
    Plot.ruleY([0]),
    Plot.ruleX(aboveSNAPThresholdArray, Plot.pointerX({x: "year", py: "percentage", stroke: "black"})),
    Plot.lineY(aboveSNAPThresholdArray, {x: "year", y: "percentage", stroke: "Area", marker: true, tip: "x"}),
    Plot.text(aboveSNAPThresholdArray, Plot.selectLast({x: "Year", y: "Percentage", z: "Year", text: "Year", textAnchor: "start", dx: 3})),
    Plot.tip(aboveSNAPThresholdArray, Plot.pointerX({x: "Year", y: "Percentage"}))
  ],
  color: {
    domain: ["North Carolina", "Wake County"],
    range: ["green", "blue"],
    legend: true
  }
})
```

  <div class="note">
    <p>
    The graph above compares the percentage of food insecure individuals who fall above the SNAP threshold (i.e., those who earn too much to qualify for SNAP benefits) in North Carolina and the percentage of food insecure individuals who fall above the SNAP threshold in North Carolina’s Wake County (from 2019 to 2023). [<em>Data from Feeding America</em>].
    </p>
    <p>
    The graph reveals that <strong>Wake County food insecurity needs are not being met at a rate that is consistently higher than average for the state</strong>.
    </p>
    <p>
    <em>*Based on 2023 Data</em>
    </p>
  </div>

**From this data, one can reasonably conclude that (1) <em>SNAP income eligibility requirements are too strict considering skyrocketing living expenses</em>, (2) <em>there are too few SNAP benefits to go around</em>, and (3) <em>food insecurity in Wake County has not been managed sufficiently by SNAP.</em>**

**Data Sources**
- USDA, [SNAP Cost-of-Living Adjustment (COLA) Information](https://www.fns.usda.gov/snap/allotment/cola)
- USDA, [SNAP Data Tables](https://www.fns.usda.gov/pd/supplemental-nutrition-assistance-program-snap)
- NC Budget and Tax Center, [2025 Living Income Standard Report](https://ncbudget.org/2025-living-income-standard/)
- Feeding America, [Map the Meal Gap Data](https://www.feedingamerica.org/research/map-the-meal-gap/overall-executive-summary)