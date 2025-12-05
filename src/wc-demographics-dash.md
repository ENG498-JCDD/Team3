```js
import {parseYear,snapYearFunc, snapCountsFunc, cleanAreaFunc} from "./components/utils.js";
```
# Wake County SNAP Demographics

<!-- Load and transform the data -->

```js
const launches = FileAttachment("data/launches.csv").csv({typed: true});
let snapCount= FileAttachment("./data/wc-snap-count/b19058.csv").csv({typed: true})
let wcMedianIncomes = FileAttachment("./data/census-2023/wc-median-household-income.csv").csv({typed: true})
```

<!-- Cards with big numbers -->

<div class="grid grid-cols-3">
  <div class="card">
    <h2>Wake County Households<span class="muted"> 2024</span></h2>
    <span class="big">499,951</span>
  </div>
  <div class="card">
    <h2>Households Receiving SNAP<span class="muted"> 2024</span></h2>
    <span class="big">29,856</span>
  </div>
  <div class="card">
    <h2>Percentage of Wake County Households Receiving SNAP</h2>
    <span class="big">5.97%</span>
  </div>
</div>

<!-- Plot of launch history -->

```js
let formatSnapYears = snapYearFunc(snapCount)
console.log(formatSnapYears)

let snapHouseGroupCounts = snapCountsFunc(formatSnapYears)

function launchSnapCount(data, {width} = {}) {
(snapHouseGroupCounts)
  return Plot.plot({
  title: "Number of Households in Wake County (2010-2024)",
  style: {
    fontSize: "18px",       // increases overall font size
    fontFamily: "sans-serif",
    fontWeight: "bold"
  },
  width: 1500,
  height: 500,
  marginLeft: 60,
  marginBottom: 60,
  y: {
    grid: true,
    label: "# of Households"
  },
  x: {
    label: "Year",
    tickPadding: 5,
  },
  color: {
    legend: true,
  },
  marks: [
    Plot.line(snapHouseGroupCounts,
      {
        x:"year",
        y:"value",
        stroke: "householdType",
        tip:true
      },
    ),
    Plot.ruleY([0]),
  ]
})
}
```
<!-- div skeleton -->
<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => launchSnapCount(snapCount, {width}))}
  </div>
</div>


```js
let cleanedWCIncomes = cleanAreaFunc(wcMedianIncomes)

function launchWCIncomes(data, {width} = {}) {
(cleanedWCIncomes)
  return Plot.plot({
  title: "Median SNAP Household Annual Income",
  marginBottom: 100,
  y: {
    grid: true,
    label: "Annual Household Income",
  },
  x: {
    tickPadding: 5,
    tickRotate: -50,
    label: "Wake County Township",
  },
  tip: true,
  marks:[
    Plot.barY(cleanedWCIncomes,
    {
      x:"area",
      y:"snapHouseholdIncome",
      fill: "#1f77b4",
      tip: true,
    }),
    Plot.ruleY([0]),
    Plot.ruleY([59000], {
      stroke: "red",
      tip: true,
      title: d => "Poverty Line ($59,000)",
  }),
  ]
})
}
```
<!-- Plot of launch vehicles -->
<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => launchWCIncomes(cleanedWCIncomes, {width}))}
  </div>
</div>
  <div class="card">
    <h2>Households Receiving SNAP<span class="muted"> 2024</span></h2>
    <span class="big">29,856</span>
  </div>
  <div class="card">
    <h2>China 🇨🇳</h2>
    <span class="big"></span>
  </div>
  <div class="card">
    <h2>Other</h2>
    <span class="big"></span>
  </div>
</div>

```js
function vehicleChart(data, {width}) {
  return Plot.plot({
    title: "Popular launch vehicles",
    width,
    height: 300,
    marginTop: 0,
    marginLeft: 50,
    x: {grid: true, label: "Launches"},
    y: {label: null},
    //color: {...color, legend: true},
    marks: [
      Plot.rectX(data, Plot.groupY({x: "count"}, {y: "family", fill: "state", tip: true, sort: {y: "-x"}})),
      Plot.ruleX([0])
    ]
  });
}
```

<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => vehicleChart(launches, {width}))}
  </div>
</div>

Data: Jonathan C. McDowell, [General Catalog of Artificial Space Objects](https://planet4589.org/space/gcat)
