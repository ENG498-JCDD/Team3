# Processing USDA Income Eligibility Data

```js
const snapIncomeLimitsContigStates = FileAttachment("./data/usda/FY20-26-SNAP-Income-Eligibility-Limits-Contig-States.csv").csv({typed: true})
```

```js
Array.from(snapIncomeLimitsContigStates)
```

```js
Plot.plot({
  x: {axis: null},
  y: {tickFormat: "s", grid: true},
  color: {scheme: "spectral", legend: true},
  marks: [
    Plot.barY(snapIncomeLimitsContigStates, {
      x: "house_size",
      y: "income_limit",
      fill: "house_size",
      fx: "fiscal_year",
      color: {legend: true},
      sort: {x: null, color: null, fx: {value: "-y", reduce: "sum"}}
    }),
    Plot.ruleY([0])
  ]
})
```

```js
const datasets = [
  ["48 States/DC/Guam/VI", await FileAttachment("./data/usda/contig_states.csv").csv({typed: true})],
  ["Alaska", await FileAttachment("./data/usda/alaska.csv").csv({typed: true})],
  ["Hawaii", await FileAttachment("./data/usda/hawaii.csv").csv({typed: true})],
];

const array = datasets.flatMap(([recipient, rows]) =>
  rows.map(row => ({ recipient, ...row }))
);
```

```js

Plot.plot({
  style: "overflow: visible;",
  y: {grid: true, domain: [2000, 4000]},
  marks: [
    Plot.ruleY([0]),
    Plot.ruleX(array, Plot.pointerX({x: "fiscal_year", py: "income_limit", stroke: "red"})),
    Plot.lineY(array, {x: "fiscal_year", y: "income_limit", stroke: "recipient", marker: true}),
    Plot.text(array, Plot.selectLast({x: "Fiscal Year", y: "Income Limit", z: "Recipients", text: "Recipients", textAnchor: "start", dx: 3})),
    Plot.tip(array, Plot.pointerX({x: "fiscal_year", y: "income_limit"}))
  ]
})
// NEXT: change x-axis year to date format (remove comma); then, add graph title and legend
```

