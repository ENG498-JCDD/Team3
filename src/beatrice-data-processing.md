# Processing Feeding America Data

```js
const data1 = FileAttachment("./data/datasets/MMG2025_2019-2023_Data_To_Share(County).csv").csv({typed: true})
```

## Group by County, Food Insecurity (FI) Rate & Cost Per Meal

```js
// Group by County, FI Rate & Cost Per Meal
const foodInsecurityDataUS2019To2023 = d3.rollup(
  data1,
  V => V.length,
  d => d["State"],
    d => d["Year"],
    // d=> d["Overall Food Insecurity Rate"],
    //   d => d["Cost Per Meal"],
)
```

```js
/**
 * Reduce to NC only
 * How to get only NC-based rows
 * .includes("North Carolina") 
**/ 
foodInsecurityDataUS2019To2023
```

```js
Array.from(
  foodInsecurityDataUS2019To2023,
  
)
```

```js
let wc2012Census = FileAttachment("./data/acs/nc_acs_SNAP_2012.csv").csv({typed: true})
```

```js
wc2012Census[0]
```

```js
//This function filters the orginal data to only include SNAP recipients
let wc2012Snap = snapOnlyFunc(wc2012Census)
```
Only SNAP Recipients
```js
wc2012Snap
```
```js
//Groups by race
let wc2012SnapByRace = groupedByRaceFunc(wc2012Snap)
```
2023 SNAP Recipients by Race
```js
wc2012SnapByRace
```