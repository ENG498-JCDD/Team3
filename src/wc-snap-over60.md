```js
import {InternMap,rollup,} from "d3-array";
```
```js
let snapOver60 = FileAttachment("./data/census-2023/wc-snap-people-over-60-years.csv").csv({typed: true})
```
Original Data
```js
snapOver60
```
Cleaned Up Array of Objects (Map)
```js
let over60Households = snapOver60.map(d => ({
  area: d.area,
  population: d.population,

  snap: {
    totalHouseholds: d.snapHousehold,
    over60: d.snapOneOver60,
  },

  nonSnap: {
    totalHouseholds: d.nonSnapHousehold,
    over60: d.nonSnapOneOver60,
  },
}))
```
Mapped Grouping Output
```js
over60Households
```
```js
let over60HouseholdsArray = Array.from(over60Households)

let stackedData = over60HouseholdsArray.flatMap(d => [

  {area: d.area, type: "SNAP recepient over 60", count: d.snap.snapOneOver60},
  {area: d.area, type: "Non-SNAP recepient over 60", count: d.nonSnap.nonSnapOneOver60},
])
```
Grouping based on area 
```js
stackedData
```
```js
//grouping of only 'over 60' households, snap and non snap
let over60s = over60Households.flatMap(d => [
  {area: d.area, type: "SNAP: Member over 60", count: d.snap.snapOneOver60},
  {area: d.area, type: "Non-SNAP: Member over 60", count: d.nonSnap.nonSnapOneOver60},
])
```
SNAP status of people over 60 in Wake County
```js
over60s 
```
```js
Plot.plot({
  title: "SNAP Benefits Recipients: Types of Households with Members over 60",
  marginLeft:150,
  width: 1000,
  height: 700,
  x: {
    grid: true,
    label: "# of Households"
  },
  y: {
    grid: true,
    label: "Township",
  },
  color: {
    legend: true, // Show the color legend
    scheme: "spectral" // Optional color scheme
  },
  marks: [
    Plot.barX(over60s,
      {
        y:"area",
        x:"count",
        fill: "type",
        tip:true
      }
    ),
    Plot.ruleY([0]),
  ]
})
```