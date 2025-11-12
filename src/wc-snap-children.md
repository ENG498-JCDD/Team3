```js
import {InternMap,rollup,} from "d3-array";
```
```js
let snapChildren = FileAttachment("./data/census-2023/wc-snap-households-with-children.csv").csv({typed: true})
```
Orginal Data
```js
snapChildren
```
<!-- ```js
let snapChildrenHouseholdMakeup = d3.group(
  snapChildren,
  (d) => d.area,
    //(d) => d.snapHouseholdWithChildren,
      //(d) => d.snapMarriedWithChildren,
//       (d) => d.snapSingleMother,
//       (d) => d.snapSingleFather,
// )
)
```
```js
snapChildrenHouseholdMakeup
```
```js
let percentageTest = snapChildren.map(area => ({
  ...area,
    percSnapChildren: (area.snapHouseholdWithChildren/area.snapHousehold)*100,
    percSnapNoChildren: (area.snapNoChildren/area.snapHousehold)*100,
  }
)
)
```
```js
percentageTest
``` -->
Cleaned Up Array of Objects (Map)
```js
let childHouseholds = snapChildren.map(d => ({
  area: d.area,
  population: d.population,
  snap: {
    totalHouseholds: d.snapHousehold,
    withChildren: {
      total: d.snapHouseholdWithChildren,
      married: d.snapMarriedWithChildren,
      singleFather: d.snapSingleFather,
      singleMother: d.snapSingleMother,
      nonFamilyHouseholds: d.snapNonFamily,
    },
    withoutChildren: {
      total: d.snapNoChildren,
      married: d.snapMarriedNoChildren,
      singleMale: d.snapSingleMale,
      singleFemale: d.snapSingleFemale,
      nonFamilyHouseholds: d.snapNonFamilyNoChildren,
    },
  },
  nonSnap: {
    totalHouseholds: d.nonSnapHousehold,
    withChildren: {
      total: d.nonSnapHouseholdWithChildren,
      married: d.nonSnapMarriedWithChildren,
      singleFather: d.nonSnapSingleFather,
      singleMother: d.nonSnapSingleMother,
      nonFamilyHouseholds: d.nonSnapNonFamily,
    },
    withoutChildren: {
      total: d.nonSnapNoChildren,
      married: d.nonSnapMarriedNoChildren,
      singleMale: d.nonSnapSingleMale,
      singleFemale: d.nonSnapSingleFemale,
      nonFamilyHouseholds: d.nonSnapNonFamilyNoChildren,
    },
  },
}))
```
```js
childHouseholds
```
```js
let childHouseholdsArray = Array.from(childHouseholds)

let stackedData = childHouseholdsArray.flatMap(d => [
  {area: d.area, type: "Single Mother", count: d.snap.withChildren.singleMother},
  {area: d.area, type: "Single Father", count: d.snap.withChildren.singleFather},
  {area: d.area, type: "Married With Children", count: d.snap.withChildren.married},
  {area: d.area, type: "Non-Family With Children", count: d.snap.withChildren.nonFamilyHouseholds}
])

```
Gouping of Family Type (with Children) based on Area
```js
stackedData
```
```js
Plot.plot({
  title: "SNAP Benefits Recipients: Types of Households with Children",
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
    Plot.barX(stackedData,
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
```js
let singleMotherHouseholds = Array.from(childHouseholds)

let singleMothers = singleMotherHouseholds.flatMap(d => [
  {area: d.area, type: "SNAP:Single Mother", count: d.snap.withChildren.singleMother},
  {area: d.area, type: "Non-SNAP: Single Mother", count: d.nonSnap.withChildren.singleMother},
])

```
Gouping of Family Type (with Children) based on Area
```js
singleMothers
```
```js
Plot.plot({
  title: "SNAP Benefits Recipients: Types of Households with Children",
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
    Plot.barX(singleMothers,
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