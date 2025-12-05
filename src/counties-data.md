```js
let ncCountiesHousehold = FileAttachment("./data/census-2023/all-nc-counties-2023-census-snap-households.csv").csv({typed: true})
```
```js
ncCountiesHousehold
```
```js
Inputs.table(ncCountiesHousehold)
```
```js
let wcMedianIncomes = FileAttachment("./data/census-2023/wc-median-household-income.csv").csv({typed: true})
```
```js
let wcSnapChildren = FileAttachment("./data/census-2023/wc-snap-households-with-children.csv").csv({typed:true})
```
```js
wcSnapChildren
```
```js
Inputs.table(wcMedianIncomes)
```
```js
wcMedianIncomes
```
```js
Plot.plot({
  marks:[
    Plot.barY(wcMedianIncomes,
    {
      x:"area",
      y:"snapHouseholdIncome",
      fill: "red",
      tip: true,
    }),
    Plot.ruleY([0]),
    Plot.ruleY([59000]),
  ]
})
```
```js
Plot.plot({
  marks: [
    Plot.barY(wcMedianIncomes,
      {
        x:"area",
        y:"nonSnapHouseholdIncome",
        fill: "green",
        tip: true,
      }
    ),
    Plot.ruleY([0]),
    Plot.ruleY([59000]),
  ]
})
```
```js
Plot.plot({
  width: 800,
  height: 400,
  y: {
    grid: true,
    label: "# of Households"
  },
  color: {
    legend: true, // Show the color legend
    scheme: "spectral" // Optional color scheme
  },
  marks: [
    Plot.barY(wcSnapChildren,
      {
        x:"area",
        y:"population",
        fill: "snapHouseholdWithChildren",
        tip:true
      }
    ),
    Plot.ruleY([0]),
  ]
})
```
```js

```
```js
snapCount
```

# Number of Wake County Households Receiving SNAP
```js
let snapCount= FileAttachment("./data/wc-snap-count/b19058.csv").csv({typed: true})
Plot.plot({
  width: 1000,
  height: 600,
  marginLeft: 50,
  y: {
    grid: true,
    label: "# of Households"
  },
  x: {
    label: "Year",
  },
  color: {
    legend: true, // Show the color legend
    scheme: "spectral" // Optional color scheme
  },
  marks: [
    Plot.line(snapCount,
      {
        x:"year",
        y:"withSnap",
        stroke: "white",
        tip:true
      },
    ),
    Plot.line(snapCount,
      {
        x: "year",
        y: "total",
        stroke: "blue",
        tip: true,
      },
    ),
     Plot.line(snapCount,
      {
        x: "year",
        y: "noSnap",
        stroke: "red",
        tip: true,
      },
    ),
    Plot.ruleY([0]),
  ]
})
```