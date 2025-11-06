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
    }),
    Plot.ruleY([0]),
    Plot.ruleY([59000]),
  ]
})
```