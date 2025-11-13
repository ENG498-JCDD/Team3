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
```js
//Here I was testing out converting some data to percentages

// let percentageTest = snapChildren.map(area => ({
//   ...area,
//     percSnapChildren: (area.snapHouseholdWithChildren/area.snapHousehold)*100,
//     percSnapNoChildren: (area.snapNoChildren/area.snapHousehold)*100,
//   }
// )
// )
```
```js
// percentageTest
```
Cleaned Up Array of Objects (Map)
```js
//Since the data contains snap and non-snap households (as well as household with and without kids) I remapped the data to group together when outputted.

let childHouseholds = snapChildren.map(d => ({
  //each object contains data for area & population
  area: d.area,
  population: d.population,
  //Then there are two objects to select, snap households and non snap households
  snap: {
    //total # of households with snap
    totalHouseholds: d.snapHousehold,
    //Two more objects inside of the snap group: houses with kids (withChildren) and houses without kids (withoutChildren).
    withChildren: {
      //each of these final object has the total # of houses and counts of the the types of families
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
  //the pattern is repeated here with non-snap households
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
Mapped Grouping Output
```js
childHouseholds
```
```js
//Convert the map back into an array so we can use Plot.plot
let childHouseholdsArray = Array.from(childHouseholds)

//creating a flatMap to do another simple regrouping and prepare the data for a chart
// this data set looks at the types of families with children who are receiving snap
let stackedData = childHouseholdsArray.flatMap(d => [
  //each object contains area (categorical variable),
  //type: labels the type of family
  //count: the variable to total from and label. 
  // make sure you a navigating through the objects correctly. (ex., since single mom snap houses are nested within "withChildren" and "snap you must type snap.withChildren.singleMother)
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
  //move the margin so the town names are not cut off
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
let singleMotherHouseholds = Array.from(childHouseholds)
//grouping of only single mother households, snap and non snap
let singleMothers = singleMotherHouseholds.flatMap(d => [
  {area: d.area, type: "SNAP:Single Mother", count: d.snap.withChildren.singleMother},
  {area: d.area, type: "Non-SNAP: Single Mother", count: d.nonSnap.withChildren.singleMother},
])

```
SNAP status of single mothers in Wake County
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