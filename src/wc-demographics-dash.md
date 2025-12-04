---
theme: dashboard
title: Example dashboard
toc: false
---

# Wake County SNAP Demographics

<!-- Load and transform the data -->

```js
const launches = FileAttachment("data/launches.csv").csv({typed: true});
let snapCount= FileAttachment("./data/wc-snap-count/b19058.csv").csv({typed: true})
```

<!-- A shared color scale for consistency, sorted by the number of launches -->

```js
const typeOfCount = [
  ...snapCount.map(d => ({year: d.year, value: d.withSnap, householdType: "With SNAP"})),
  ...snapCount.map(d => ({year: d.year, value: d.total, householdType: "Total Households"})),
  ...snapCount.map(d => ({year: d.year, value: d.noSnap, householdType: "No SNAP"}))
]
```

<!-- Cards with big numbers -->

<div class="grid grid-cols-4">
  <div class="card">
    <h2>Wake County Households<span class="muted"> 2024</span></h2>
    <span class="big">499,951</span>
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

<!-- Plot of launch history -->

```js
function launchSnapCount(data, {width} = {}) {
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
    //tickFormat: d3.utcFormat("%Y"),
  },
  color: {
    legend: true,
  },
  marks: [
    Plot.line(typeOfCount,
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

<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => launchSnapCount(snapCount, {width}))}
  </div>
</div>

<!-- Plot of launch vehicles -->

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
