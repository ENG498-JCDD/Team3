```js
import {InternMap,rollup,} from "d3-array";
```
```js
let snapDisabilities = FileAttachment("./data/census-2023/wc-snap-disability.csv").csv({typed: true})
```
Orginal Data
```js
snapDisabilities
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
let disabilityHouseholds = snapDisabilities.map(d => ({
  area: d.area,
  population: d.totalHouseholds,
  snap: {
    totalHouseholds: d.householdReceivedSNAPInPast12Months,
    disabledIndividualInHousehold: d.householdWithOneOrMorePersonsWithADisabilitySnap,noDisabledIndividuals: d.householdsWithNoPersonsWithADisabilitySnap,
    },
  nonSnap: {
    totalHouseholds: d.householdsDidNotReceiveSNAPInPast12Months,disabledIndividualInHousehold: d.householdsWithOneOrMorePersonsWithADisabilityNoSnap,noDisabledIndividuals: d.householdsWithNoPersonsWithADisabilityNoSnap,
  },
}))
    
```
```js
disabilityHouseholds
```
```js
let disabilityHouseholdsArray = Array.from(disabilityHouseholds)

let allDisabilityHouseholdsData = disabilityHouseholdsArray.flatMap(d => [
  {area: d.area, type: "SNAP: Disabled Individual in Household", count: d.snap.disabledIndividualInHousehold},
  {area: d.area, type: "SNAP: No Disable Individuals in Household", count: d.snap.noDisabledIndividuals},
  {area: d.area, type: "non-SNAP: Disabled Individual in Household", count: d.nonSnap.disabledIndividualInHousehold},
  {area: d.area, type: "non-SNAP: No Disable Individuals in Household", count: d.nonSnap.noDisabledIndividuals},
])

```
Gouping of Family Type (with Children) based on Area
```js
allDisabilityHouseholdsData
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
    Plot.barX(allDisabilityHouseholdsData,
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
let onlyDisabilityHouseholdsData = disabilityHouseholdsArray.flatMap(d => [
  {area: d.area, type: "SNAP: Disabled Individual in Household", count: d.snap.disabledIndividualInHousehold},
  // {area: d.area, type: "SNAP: No Disable Individuals in Household", count: d.snap.noDisabledIndividuals},
  {area: d.area, type: "non-SNAP: Disabled Individual in Household", count: d.nonSnap.disabledIndividualInHousehold},
  // {area: d.area, type: "non-SNAP: No Disable Individuals in Household", count: d.nonSnap.noDisabledIndividuals},
])
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
    Plot.barX(onlyDisabilityHouseholdsData,
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