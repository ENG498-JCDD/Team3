# Processing USDA Income Eligibility Data

```js
const snapIncomeLimitsFY2020To2026 = FileAttachment("./data/usda/FY20-26-SNAP-Income-Eligibility-Limits-for-Household-of-3.csv").csv({typed: true})
```

```js
Array.from(snapIncomeLimitsFY2020To2026)
```

```js
Plot.plot({
  style: "overflow: visible;",
  y: {grid: true},
  marks: [
    Plot.ruleY([0]),
    Plot.lineY(stocks, {x: "fiscal_year", y: "income_limit", stroke: "Symbol"}),
    Plot.text(stocks, Plot.selectLast({x: "Date", y: "Close", z: "Symbol", text: "Symbol", textAnchor: "start", dx: 3}))
  ]
})
```


