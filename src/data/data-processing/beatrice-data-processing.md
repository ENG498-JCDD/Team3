# Processing Feeding America Data

```js
const data = FileAttachment("./datasets/MMG2025_2019-2023_Data_To_Share(County).csv").csv({typed: true})
```

## Group by County, Food Insecurity (FI) Rate & Cost Per Meal

```js
// Group by County, FI Rate & Cost Per Meal
const foodInsecurityDataUS2019To2023 = d3.rollup(
  data,
  V => V.length,
  d => d["County, State"],
    d=> d["Overall Food Insecurity Rate"],
      d => d["Cost Per Meal"],
)
```

```js
console.log(foodInsecurityDataUS2019To2023)
```

