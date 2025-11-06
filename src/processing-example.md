# Processing Data per Year

Due to size issues, there are CSV files per year 2012-2023.

```js
const data = FileAttachment("./data/acs/nc_acs_SNAP_2012.csv").csv({typed: true})
```

See the `./data/acs/CODEBOOK.md` file to understand the values per column.

## Group by Foodstamp Status & Race

```js
// Group by Foodstamp Status & Race
d3.rollup(
  data,
  V => V.length,
  d => d.FOODSTMP,
    d => d.RACE,
)
```

## Group by Foodstamp Status & Race & Citizenship Status

```js
// Group by Foodstamp Status & Race
d3.rollup(
  data,
  V => V.length,
  d => d.FOODSTMP,
    d=> d.CITIZEN,
      d => d.RACE,
)
```