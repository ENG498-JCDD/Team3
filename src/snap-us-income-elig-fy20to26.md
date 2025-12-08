# SQ3: Are SNAP benefits becoming harder to access?

**National SNAP Income Eligibility and Benefits Distribution Data from the United States Department of Agriculture (USDA), and North Carolina SNAP/Food and Nutrition Services Applications Data from the NC Department of Health and Human Services (NCDHHS)**

```js
//Attached datasets I want to work with
const snapBenefitsPerPerson = FileAttachment("./data/usda/FY69-24-SNAP-Annual-Avg-Benefits-per-Person.csv").csv({typed: true})

const snapNCAppsByMonth2019To2025 = FileAttachment("./data/usda/CY2019-25-Annual-NC-Snap-Applications.csv").csv({typed: true})

const incomeEligibilityDatasets = [
  ["48 States/DC/Guam/Virgin Islands", await FileAttachment("./data/usda/contig_states.csv").csv({typed: true})],
  ["Alaska", await FileAttachment("./data/usda/alaska.csv").csv({typed: true})],
  ["Hawaii", await FileAttachment("./data/usda/hawaii.csv").csv({typed: true})],
];
```

```js
//Converted datasets to arrays for graphing
const benefitsArray = Array.from(snapBenefitsPerPerson)

const appsArray = Array.from(snapNCAppsByMonth2019To2025)

const incomeArray = incomeEligibilityDatasets.flatMap(([recipient, rows]) =>
  rows.map(row => ({ recipient, ...row }))
);
```
## FY 2020-2026 SNAP Gross Monthly Income Limits for Household of 4 (in Contiguous United States/D.C./Guam/Virgin Islands, Alaska, and Hawaii)
```js
  //Rendered line graph
Plot.plot({
  //added grid, axis labels, domain limits for y-axis
  x: {grid: true, label: "Fiscal Year"},
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
      In 2025, a family of four would need an annual gross income of $111,040 (or $9,250 per month) to live comfortably and cover their basic needs in Wake County (<i>NC Budget and Tax Center 2025 Living Income Standard Report</i>).
      </li>
    </ul>
    </p>
  </div>


## FY 1969-2024 SNAP Average Monthly Benefits Per Person in Dollars (National)
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
    </p>
  </div>


## SNAP/FNS Applications Received in North Carolina, 2019-2025 (in Thousands)
```js
Plot.plot({
  y: {
    grid: true,
    domain: [0, 1000]
  },
  marks: [
    Plot.ruleY([0]),
    Plot.barY(appsArray, {x: "Year", y: "Applications Received", sort: true})
  ]
})
```

  <div class="note">
    <p>
    </p>
  </div>
