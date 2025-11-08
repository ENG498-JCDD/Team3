# Processing Feeding America Data

```js
const data = FileAttachment("./datasets/MMG2025_2019-2023_Data_To_Share(County).csv").csv({typed: true})
```

## Group by County, Food Insecurity (FI) Rate & Cost Per Meal

```js
// Group by County, FI Rate & Cost Per Meal
d3.rollup(
  data,
  V => V.length,
  d => d.,
    d=> d.,
      d => d.,
)
```