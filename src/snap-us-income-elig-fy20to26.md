# SQ1: Are SNAP benefits becoming harder to access?

**The following line graphs show how SNAP accessibility has changed over time, both nationally and in Wake County, North Carolina.**

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
```

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
```js
  //Rendered line graph
Plot.plot({
  //added grid, axis labels, domain limits for y-axis
  x: {grid: true, label: "Fiscal Year", tickFormat: ""},
  y: {grid: true, domain: [2400, 4600], label: "Income Limit (Dollars)"},
  marks: [
    //added legend, pointer rule mark, tooltip to display details when hovering over data point
    Plot.ruleY([0]),
    Plot.ruleX(incomeArray, Plot.pointerX({x: "fiscal_year", py: "income_limit", stroke: "black"})),
    Plot.lineY(incomeArray, {x: "fiscal_year", y: "income_limit", stroke: "recipient", marker: true, tip: "x"}),
    Plot.text(incomeArray, Plot.selectLast({x: "Fiscal Year", y: "Income Limit", z: "Recipients", text: "Recipients", textAnchor: "start", dx: 3})),
    Plot.tip(incomeArray, Plot.pointerX({x: "fiscal_year", y: "income_limit"}))
  ],
  color: {
    legend: true
  }
})
```

  <div class="note">
    <p>
      The graph above charts annual changes in the monthly gross income limit (to qualify for SNAP benefits) for a 4-person household over six consecutive fiscal years (October 1, 2019 to September 30, 2026).
    </p>
    <p>
      The monthly gross income limit is 130% of the poverty level.
    </p>
    <p>
    The graph illustrates that <b>eligibility limits have increased very little (an average of $115.50 per fiscal year) over the past several years</b>, despite the elevated cost of living.
    <ul>
      <li>
      In 2025, a family of four would need an annual gross income of $111,040 (or $9,250 per month) to live comfortably and cover their basic needs in Wake County, data suggests.
      </li>
    </ul>
    </p>
    <p>
    <i>*The higher monthly gross income limits in Alaska and Hawaii are meant to compensate for the higher cost of living.</i>
    </p>
  </div>


## FY 1969-2024 SNAP Average Monthly Benefits Per Person in Dollars (National)*
```js
Plot.plot({
  x: {
    label: "Fiscal Year",
    domain: [1969, 2030],
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
    The graph above charts annual changes in average monthly SNAP benefits (in dollars) per SNAP participant nationally.
    </p>
    <p>
    The graph indicates a fairly steady increase in monthly SNAP benefits from FY1969 (first year of the SNAP program) until about FY2019. <b>Between FY2019 and FY2021, monthly benefits increased by about $85</b> (<i>compare this to the average yearly increase of approximately $2.46 between FY1969 and FY2019</i>).
    </p>
    <ul>
      <li>
      The dramatic increase in benefits is likely related to increased need during early COVID.
      </li>
    </ul>
    <p>
    <b>Between FY2022 and FY2024, monthly benefits dropped by $43.19, the most significant decrease in the nearly 60-year history of the SNAP program</b>. Prior to FY2022, the amount rarely ever decreased from year to year; if it did, it was by little more than $1.
    </p>
    <p>
    <i>*FY2025 data not yet available.</i>
    </p>
  </div>


## SNAP/FNS Applications Received in North Carolina, 2019-2025 (in Thousands)

```js
Plot.plot({
  //added grid, axis labels, domain limits for y-axis
  x: {grid: true, label: "Year", ticks: [2019, 2020, 2021, 2022, 2023], tickFormat: ""},
  y: {grid: true, domain: [0, 60], label: "% FI > SNAP Threshold"},
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
    </p>
  </div>

**Data Sources**
- USDA, SNAP Cost-of-Living Adjustment (COLA) Information
- USDA, SNAP Data Tables
- NC Budget and Tax Center, 2025 Living Income Standard Report
- Feeding America, Map the Meal Gap Data