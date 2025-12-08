```js
import {parseYear,snapYearFunc, snapCountsFunc, cleanAreaFunc, householdMappingFunc, snapChildrenPercFunc, stackedChildrenData, singleFemaleFunc, singleFemalePercFunc, stackedHouseFunc, houseMapYearFunc, stackedHousePercFunc, singleMotherFunc, singleMotherCompFunc, disabilityCountFunc, disabilityMapFunc, onlyDisabledIndivFunc, over60MapFunc, over60SnapFlatMapFunc, over60OnlyFlatMapFunc } from "./components/utils.js";
import * as d3 from "d3";
import {regressionLinear, regressionPolynomial} from "npm:d3-regression"
import {InternMap,rollup,} from "d3-array";
```
# Wake County SNAP Demographics

<!-- Load and transform the data -->

```js
const launches = FileAttachment("data/launches.csv").csv({typed: true});
let snapCount= FileAttachment("./data/wc-snap-count/b19058.csv").csv({typed: true})
let wcMedianIncomes = FileAttachment("./data/census-2023/wc-median-household-income.csv").csv({typed: true})
let snapChildren = FileAttachment("./data/census-2023/wc-snap-households-with-children.csv").csv({typed: true})
let countyGeoJSON = FileAttachment("./data/wc-geo/Townships.geojson").json()
let wcHouseYears = FileAttachment("./data/wc-snap-count/acs-b22002.csv").csv({typed: true})
let snapDisabilities = FileAttachment("./data/census-2023/wc-snap-disability.csv").csv({typed: true})
let snapOver60 = FileAttachment("./data/census-2023/wc-snap-people-over-60-years.csv").csv({typed: true})
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
        strokeWidth: 3,
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

From 2010 to 2024, the population in Wake County has steadily increased. However, the number of households receiving SNAP has remained relatively the same. As cost-of-living has risen over the past few years, we would expect that more households would rely on SNAP for groceries. This trend shows the opposite despite the fact that 126,110 Wake County residents are food insecure (Wake.gov)

## Income

<!-- IncomeFunc -->
```js
let cleanedWCIncomes = cleanAreaFunc(wcMedianIncomes)

function launchWCIncomes(data, {width} = {}) {
(cleanedWCIncomes)
  return Plot.plot({
  title: "Median SNAP Household Annual Income (2024)",
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

<!-- Plot of Incomes -->
<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => launchWCIncomes(cleanedWCIncomes, {width}))}
  </div>
  </div>
</div>

The majority of SNAP Households in Wake County fall beneath the poverty line with most townships' SNAP households making less than $40,000 per year.

***Note***: Bartons Creek, Buckhorn, and White Oak did not have any SNAP households in 2024.

## Household Types (based on presence of children)

<!-- children household func -->
```js
let childrenPerc = snapChildrenPercFunc(snapChildren)
let snapChildrenMap = householdMappingFunc(childrenPerc)
let finalChildrenData = stackedChildrenData(snapChildrenMap)

function childHouseChart(finalChildrenData, {width}) {
  return Plot.plot({
  title: "Types of SNAP Households with Children",
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
    scheme: "Observable10",
  },
  marks: [
    //barX puts the area name on the y axis. I chose this bc of how long the names are so I prevented a jumbled mess
    Plot.barX(finalChildrenData,
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
}
```
<!-- SINGLE FEMALE FUNC -->
```js
let singleFemale = singleFemaleFunc(snapChildrenMap)

function singleFemaleChart(data, {width}){
  return Plot.plot({
  title: "Comparison of Single Female Households",
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
    scheme: "Observable10"
  },
  marks: [
    Plot.barX(singleFemale,
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
}
```
<!-- spatial func -->
```js
let areaPercChild = new Map(childrenPerc.map(d => [d.area, d.percSnapChildren]))

countyGeoJSON.features.map(f => {
  let areaName = f.properties.NAME;
  f.properties.percSnapChildren = areaPercChild.get(areaName)
})
let projection = d3.geoMercator().fitSize([1200, 800], countyGeoJSON)
let path = d3.geoPath(projection)
let centroids = countyGeoJSON.features.map(f => {
  let [lon, lat] = d3.geoCentroid(f);
  return {lon, lat, name: f.properties.NAME};
})

function spatialChildren(data, {width}){
  return Plot.plot({
    title: "Percentage of Households w/ Children Receiving SNAP",
  width: 1200,
  height: 800,
  projection,
  color: {
    type: "linear",
    scheme: "Turbo",
    domain: [0, 100],
    legend: true,
    label: "Percentage",
  },
  marks: [
    Plot.geo(countyGeoJSON,{
      stroke: "black",
      fill: "percSnapChildren",
      tip: true
    }),
    Plot.text(centroids, {
      x: "lon",
      y: "lat",
      text: "name",
      fill: "white",
      fontSize: 18,
      textAnchor: "middle",
      stroke: "black",
      strokeWidth: 2
    })
  ]
})}
```
```js
let singleFemalePerc = singleFemalePercFunc(snapChildrenMap)

let areaPercSingleFemale = new Map(
  singleFemalePerc.map(d => [d.area, d.percSnapSingleFemale])
);

countyGeoJSON.features.forEach(f => {
  let areaName = f.properties.NAME;
  f.properties.singleFemalePerc = areaPercSingleFemale.get(areaName);
});

let projection = d3.geoMercator().fitSize([1200, 800], countyGeoJSON);
let path = d3.geoPath(projection);

let centroids = countyGeoJSON.features.map(f => {
  let [lon, lat] = d3.geoCentroid(f);
  return { lon, lat, name: f.properties.NAME };
});


function spatialSingleFemale(data, {width}){
  return Plot.plot({
    title: "Percentage of Single Female Households (w/ Children) Receiving SNAP",
  width: 1200,
  height: 800,
  projection,
  color: {
    type: "linear",
    scheme: "Turbo",
    domain: [0, 100],
    legend: true,
    label: "Percentage",
    ticks: 5,
  },
  marks: [
    Plot.geo(countyGeoJSON,{
      stroke: "black",
      fill: "singleFemalePerc",
      tip: true
    }),
    Plot.text(centroids, {
      x: "lon",
      y: "lat",
      text: "name",
      fill: "white",
      fontSize: 18,
      textAnchor: "middle",
      stroke: "black",
      strokeWidth: 2
    })
  ]
})}
```
<div class="grid grid-cols-2">
  <div class="card">
    ${resize((width) => childHouseChart(finalChildrenData, {width}))}
  </div>
  <div class="card"> ${resize((width) => singleFemaleChart(singleFemale, {width}))}
  </div>
  </div>
<div class="grid grid-cols-2">
  <div class = "card">${resize((width) => spatialChildren(countyGeoJSON, {width}))}
  </div>
  <div class = "card">${resize((width) => spatialSingleFemale(countyGeoJSON, {width}))}
  </div>
</div>

As we look at SNAP households with children, the majority of households are categorized as "Single Female". This group encompasses single mothers and other non-married single female householders with children. About 1/3 of all single female houses (with children) in Wake County receive SNAP benefits. Raleigh has the highest concentration of single women with kids who receive SNAP and households with children who receive SNAP. 

Single mothers likely receive SNAP benefits at a higher rate due to multiple economic factors. These include lower wages, increased cost of childcare, and having only a single source of income. Other factors like race and education also play a role in income. Unfortunately, ACS data does not show the intersections of these factors.


```js
let wcHouseYearsMap = houseMapYearFunc(wcHouseYears)
let singleMotherData = singleMotherFunc(wcHouseYearsMap)

let regression = regressionLinear()
  .x(d => d.year)
  .y(d => d.perc)

let regLine = regression(singleMotherData)


function launchHouseholdYears(data, {width} = {}) {
(singleMotherData)
  return Plot.plot({
  title: "Percentage of SNAP Households that were Single Female w/ Children",
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
    label: "% of Households",
    },
  x: {
    label: "Year",
    tickPadding: 5,
    domain: d3.range(2015, 2024), // explicit integer years
    tickFormat: d3.format("d"),   // format without commas/decimals
  },
  color: {
    scheme: "spectral",
    legend: true,
  },
  marks: [
    Plot.line(singleMotherData,
      {
        x:"year",
        y:"perc",
        stroke: "area",
        strokeWidth: 3,
        tip:true
      },
    ),
      // Regression line (county-wide trend)
    Plot.line(regLine, {
      x: d => d[0],
      y: d => d[1],
      stroke: "white",
      strokeDasharray: "4,2",
      strokeWidth: 5,
      tip: true,
      title: d => "Wake County Avg",
    }),
    Plot.ruleY([0]),
  ]
})
}
```

```js
let singleMotherCompData = singleMotherCompFunc(wcHouseYearsMap)
let regression = regressionLinear()
  .x(d => d.year)
  .y(d => d.perc)
let regLine = regression(singleMotherCompData)

function launchCompHouseholdYears(data, {width} = {}) {
(singleMotherCompData)
  return Plot.plot({
  title: "Percentage of  Single Female w/ Children Households that Received SNAP",
  style: {
    fontSize: "18px",       // increases overall font size
    fontFamily: "sans-serif",
    fontWeight: "bold"
  },
  width: 1500,
  height: 600,
  marginLeft: 60,
  marginBottom: 60,
  marginTop: 50,
  y: {
    grid: true,
    label: "% of Households",
    labelAnchor: "top",
    },
  x: {
    label: "Year",
    tickPadding: 5,
    domain: d3.range(2015, 2024), // explicit integer years
    tickFormat: d3.format("d"),   // format without commas/decimals
  },
  color: {
    scheme: "spectral",
    legend: true,
  },
  marks: [
    Plot.line(singleMotherCompData,
      {
        x:"year",
        y:"perc",
        stroke: "area",
        strokeWidth: 3,
        tip:true
      },
    ),
      // Regression line (county-wide trend)
    Plot.line(regLine, {
      x: d => d[0],
      y: d => d[1],
      stroke: "white",
      strokeDasharray: "4,2",
      strokeWidth: 5,
      tip: true,
      title: d => "Wake County Avg",
    }),
    Plot.ruleY([0]),
  ]
})
}
```
### Single Female Households (with children) Over the Last Decade
<!-- div skeleton -->
<div class="grid grid-cols-1">
  <div class="card">
    ${resize((width) => launchHouseholdYears(singleMotherData, {width}))}
  </div>
  <div class="card">
    ${resize((width) => launchCompHouseholdYears(singleMotherData, {width}))}
  </div>
</div>

Overall the percentage SNAP households with a female householder and children has remained steady over the past decade. The same is true when comparing SNAP and non-SNAP single women with children. Although each township shows individual variability over the years, the Wake County avg has slightly decreased over the past decade.

## Disability Status

```js
let snapDisCount = disabilityCountFunc(snapDisabilities)
let snapDisMap = disabilityMapFunc(snapDisCount)
let onlyDisabledIndiv = onlyDisabledIndivFunc(snapDisCount)

function launchDisCounts(data, {width} = {}) {
(snapDisMap)
  return Plot.plot({
  title: "SNAP Benefits Recipients: Households based on Disability Status",
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
    legend: true,
    scheme: "Observable10"
  },
  marks: [
    Plot.barX(snapDisMap,
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
}

function launchOnlyDisCounts(data, {width} = {}) {
(onlyDisabledIndiv)
  return Plot.plot({
  title: "Households with 1 or More Disabled Individuals",
  marginLeft:150,
  width: 1000,
  height: 700,
  x: {
    grid: true,
    label: "# of Households",
    color: "Red",
  },
  y: {
    grid: true,
    label: "Township",
  },
  color: {
    legend: true, // Show the color legend
    //scheme: "Set1" // Optional color scheme
  },
  marks: [
    Plot.barX(onlyDisabledIndiv,
      {
        y:"area",
        x:"count",
        fill: "type",
        tip:true
      }
    ),
    Plot.ruleY([0]),
  ]
})}
```

<!-- MAPS -->
```js
let snapDisCount = disabilityCountFunc(snapDisabilities)

let areaPercSnapWithDis = new Map(
  snapDisCount.map(d => [d.area, d.percSnapWithDis])
);

countyGeoJSON.features.forEach(f => {
  let areaName = f.properties.NAME;
  let match = snapDisCount.find(d => d.area === areaName);
  if (match) {
    f.properties.percSnapWithDis = match.percSnapWithDis;
  }
});

let projection = d3.geoMercator().fitSize([1200, 800], countyGeoJSON);
let path = d3.geoPath(projection);

let centroids = countyGeoJSON.features.map(f => {
  let [lon, lat] = d3.geoCentroid(f);
  return { lon, lat, name: f.properties.NAME };
});
console.log(countyGeoJSON.features[2].properties);

function spatialSnapWithDis(data, {width}){
  return Plot.plot({
    title: "Percentage of SNAP Households with 1+ Disabled Individual",
  width: 1200,
  height: 800,
  projection,
  color: {
    type: "linear",
    scheme: "Turbo",
    domain: [0, 100],
    legend: true,
    label: "Percentage",
    ticks: 5,
  },
  marks: [
    Plot.geo(countyGeoJSON,{
      stroke: "gray",
      fill: d => d.properties.percSnapWithDis,
      tip: true
    }),
    Plot.text(centroids, {
      x: "lon",
      y: "lat",
      text: "name",
      fill: "white",
      fontSize: 18,
      textAnchor: "middle",
      stroke: "black",
      strokeWidth: 2
    })
  ]
})}
```

```js
let wcDisPerc = disabilityCountFunc(snapDisabilities)
console.log(wcDisPerc)

let areaPercDisOnSnap = new Map(
  wcDisPerc.map(d => [d.area, d.percDisOnSnap])
);

countyGeoJSON.features.forEach(f => {
  let areaName = f.properties.NAME;
  let match = wcDisPerc.find(d => d.area === areaName);
  if (match) {
    f.properties.percDisOnSnap = match.percDisOnSnap;
  }
});

let projection = d3.geoMercator().fitSize([1200, 800], countyGeoJSON);
let path = d3.geoPath(projection);

let centroids = countyGeoJSON.features.map(f => {
  let [lon, lat] = d3.geoCentroid(f);
  return { lon, lat, name: f.properties.NAME };
});
console.log(countyGeoJSON.features[2].properties);

function spatialDisonSnap (data, {width}){
  return Plot.plot({
    title: "Percentage of Households with 1+ Disabled Individual Receiving SNAP",
  width: 1200,
  height: 800,
  projection,
  color: {
    type: "linear",
    scheme: "Turbo",
    domain: [0, 100],
    legend: true,
    label: "Percentage",
    ticks: 5,
  },
  marks: [
    Plot.geo(countyGeoJSON,{
      stroke: "gray",
      fill: d => d.properties.percDisOnSnap,
      tip: true
    }),
    Plot.text(centroids, {
      x: "lon",
      y: "lat",
      text: "name",
      fill: "white",
      fontSize: 18,
      textAnchor: "middle",
      stroke: "black",
      strokeWidth: 2
    })
  ]
})}
```

<div class="grid grid-cols-2">
  <div class="card">
    ${resize((width) => launchDisCounts(snapDisMap, {width}))}
  </div>
   <div class="card">
    ${resize((width) => spatialSnapWithDis(countyGeoJSON, {width}))}
  </div>
</div>

About half of all households that receive SNAP benefits have at least 1 individual with a disability. Approximately 8.6% of the Wake County population has a disability. A large portion of these individuals are unemployed and may not be able to work because of their disability. Disability come in many forms, from physical disabilities impacting mobility, vision, or hearing, developmental disabilities, and mental health conditions. Most workplaces and public services are not prepared to accomodate different disabilities making it harder for these individuals to find and keep work (or simply navigate to work). Potential SNAP cuts may prevent these residents (who have increased employment limitations) from receiving necessary supplemental income for food


<div class="grid grid-cols-2">
  <div class="card">
    ${resize((width) => launchOnlyDisCounts(snapDisMap, {width}))}
  </div>
  <div class="card">
    ${resize((width) => spatialDisonSnap(countyGeoJSON, {width}))}
  </div>
</div>

## Individuals Over 60 Years Old

```js
let snapOver60Cleaned = cleanAreaFunc(snapOver60)
let snapOver60Mapped = over60MapFunc(snapOver60Cleaned)
let snapOver60Final = over60SnapFlatMapFunc(snapOver60Mapped)
let only60 = over60OnlyFlatMapFunc(snapOver60Mapped)

function launchOverSixty(data, {width} = {}) {
(snapOver60Final)
  return Plot.plot({
  title: "SNAP Households Based on the Presence of Individuals 60+",
  marginLeft: 100,
  width: 1000,
  height: 700,
  x: {
    grid: true,
    label: "# of Households"
  },
  y: {
    label: "Township",
  },
  color: {
    legend: true, 
  },
  marks: [
    Plot.barX(snapOver60Final,
      {
        y:"area",
        x:"count",
        fill: "type",
        tip:true,
      }
    ),
    Plot.ruleY([0]),
  ]
})}
```
```js
function launchOnlyOverSixty(data, {width} = {}) {
(only60)
return Plot.plot({
  title: "SNAP Benefits Recipients: Types of Households with Members Over 60",
  marginLeft: 100,
  width: 1000,
  height: 700,
  x: {
    grid: true,
    label: "# of Households"
  },
  y: {
    label: "Township",
  },
  color: {
    legend: true, // Show the color legend
  },
  marks: [
    Plot.barX(only60,
      {
        y:"area",
        x:"count",
        fill: "type",
        tip:true
      }
    ),
    Plot.ruleY([0]),
  ]
})}
```
<!-- over 60 maps -->
```js
let areaPercSnapOver60 = new Map(
  snapOver60Mapped.map(d => [d.area, d.percSnapOver60])
);

countyGeoJSON.features.forEach(f => {
let areaName = f.properties.NAME.trim().toLowerCase();
let match = snapOver60Mapped.find(d => d.area.trim().toLowerCase() === areaName);
if (match) {
  f.properties.percSnapOver60 = +match.percSnapOver60; // force numeric
} else {
  f.properties.percSnapOver60 = 0; // fallback
}})


let projection = d3.geoMercator().fitSize([1200, 800], countyGeoJSON);
let path = d3.geoPath(projection);

let centroids = countyGeoJSON.features.map(f => {
  let [lon, lat] = d3.geoCentroid(f);
  return { lon, lat, name: f.properties.NAME };
});
console.log(countyGeoJSON.features.map(f => f.properties.percSnapOver60));


function spatialSnapOverSixty(geojson, {width}) {
  return Plot.plot({
    title: "Percentage of SNAP Households with 1+ 60+ Individual",
    width,
    height: 800,
    projection: d3.geoMercator().fitSize([width, 800], geojson),
    color: {
      type: "linear",
      scheme: "Turbo",
      domain: [0, 100],
      legend: true,
      label: "Percentage",
      ticks: 5,
    },
    marks: [
      Plot.geo(geojson, {
        stroke: "gray",
        fill: d => d.properties.percSnapOver60,
        tip: true
      }),
      Plot.text(
        geojson.features.map(f => {
          let [lon, lat] = d3.geoCentroid(f);
          return { lon, lat, name: f.properties.NAME };
        }),
        {
          x: "lon",
          y: "lat",
          text: "name",
          fill: "white",
          fontSize: 18,
          textAnchor: "middle",
          stroke: "black",
          strokeWidth: 2
        }
      )
    ]
  });
}
```
```js
let areapercOver60OnSnap = new Map(
  snapOver60Mapped.map(d => [d.area, d.percOver60OnSnap])
);

countyGeoJSON.features.forEach(f => {
let areaName = f.properties.NAME.trim().toLowerCase();
let match = snapOver60Mapped.find(d => d.area.trim().toLowerCase() === areaName);
if (match) {
  f.properties.percOver60OnSnap = +match.percOver60OnSnap; // force numeric
} else {
  f.properties.percOver60OnSnap = 0; // fallback
}})


let projection = d3.geoMercator().fitSize([1200, 800], countyGeoJSON);
let path = d3.geoPath(projection);

let centroids = countyGeoJSON.features.map(f => {
  let [lon, lat] = d3.geoCentroid(f);
  return { lon, lat, name: f.properties.NAME };
});
console.log(countyGeoJSON.features.map(f => f.properties.percOver60OnSnap));


function spatialOnlyOverSixty(geojson, {width}) {
  return Plot.plot({
    title: "Percentage of SNAP Households with 1+ 60+ Individual",
    width,
    height: 800,
    projection: d3.geoMercator().fitSize([width, 800], geojson),
    color: {
      type: "linear",
      scheme: "Turbo",
      domain: [0, 100],
      legend: true,
      label: "Percentage",
      ticks: 5,
    },
    marks: [
      Plot.geo(geojson, {
        stroke: "gray",
        fill: d => d.properties.percOver60OnSnap,
        tip: true
      }),
      Plot.text(
        geojson.features.map(f => {
          let [lon, lat] = d3.geoCentroid(f);
          return { lon, lat, name: f.properties.NAME };
        }),
        {
          x: "lon",
          y: "lat",
          text: "name",
          fill: "white",
          fontSize: 18,
          textAnchor: "middle",
          stroke: "black",
          strokeWidth: 2
        }
      )
    ]
  });
}
```
<div class="grid grid-cols-2">
  <div class="card">
    ${resize((width) => launchOverSixty(snapOver60Final, {width}))}
  </div>
  <div class="card">
    ${resize((width) => launchOnlyOverSixty(only60, {width}))}
  </div>
  <div class="card">
   ${spatialSnapOverSixty(countyGeoJSON, {width})}
  </div>
   <div class="card">
   ${spatialOnlyOverSixty(countyGeoJSON, {width})}
  </div>
</div>


## Data & Resources 
 
* Census Reporter: [Public Assistance](https://censusreporter.org/topics/public-assistance/)
  * *Tables B22001, B22002, B22008, and B22010*
* [United States Census Bureau](https://data.census.gov/all?q=SNAP/Food+Stamps)
* Wake County: [Wake County Food Security Program](https://www.wake.gov/departments-government/wake-county-food-security-program)
* Wake County: [October: National Disability Employment Awareness Month](https://www.commerce.nc.gov/blog/2016/10/26/october-national-disability-employment-awareness-month)
* Wake County Open Data: [Townships](https://data-wake.opendata.arcgis.com/datasets/748df1a75ee7448e80f6ae646efa1d79_0/explore)