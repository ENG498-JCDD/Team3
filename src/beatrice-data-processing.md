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

