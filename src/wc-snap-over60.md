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
    memberOver60: d.snapOneOver60,
    noMemberOver60: d.snapNoOver60,
    },
  nonSnap: {
    totalHouseholds: d.nonSnapHousehold,
    memberover60: d.nonSnapOneOver60,
    noMemberOver60: d.nonSnapNoOver60,
  },
}))
```
Mapped Grouping Output
```js
over60Households
```
```js
//Convert the map back into an array so we can use Plot.plot
let over60HouseholdsArray = Array.from(over60Households)

let stackedData = over60HouseholdsArray.flatMap(d => [
 
  {area: d.area, type: "SNAP Recipient Households Over 60", count: d.snap.snapOneOver60},
  {area: d.area, type: "Non-SNAP Recipient Households Over 60", count: d.snap.nonSnapOneOver60},
])
```
Gouping of Household Type (Over or Under 60) based on Area
```js
stackedData
```
```js
Plot.plot({
  title: "SNAP Benefits Recipients: Types of Households Over or Under 60",
  //move the margin so the town names are not cut off
  marginLeft:200,
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
    //shows the legend
    legend: true, 
    scheme: "spectral",
  },
  marks: [
    //barX puts the area name on the y axis. I chose this bc of how long the names are so I prevented a jumbled mess
    Plot.barX(stackedData,
    //Used the last grouped dataset (the one grouped by area, type, and count)
      {
        y:"area",
        x:"count",
        //filling by type will create the separately colored sections for each type of family
        fill: "type",
        tip:true,
      }
    ),
    //adds an axis line
    Plot.ruleY([0]),
  ]
})
```
```js
let over60WCHouseholds = Array.from(over60Households)
//grouping of only households with members over 60, snap and non snap
let membersOver60 = over60Households.flatMap(d => [
  {area: d.area, type: "SNAP: Member Over 60", count: d.snap.snapOneOver60},
  {area: d.area, type: "Non-SNAP: Member Over 60", count: d.nonSnap.nonSnapOneOver60},
])

```
SNAP status of households with members over 60 in Wake County
```js
membersOver60
```
```js
Plot.plot({
  title: "SNAP Benefits Recipients: Types of Households with Members Over 60",
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
    Plot.barX(membersOver60,
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