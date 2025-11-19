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


