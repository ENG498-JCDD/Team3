# Processing Data per Year

```js
import {getUniquePropListBy,oneLevelRollUpFlatMap,twoLevelRollUpFlatMap,threeLevelRollUpFlatMap,downloadAsCSV} from "./utils/utils.js"
```

Due to size issues, there are CSV files per year 2012-2023, so be sure to

```js
const data = FileAttachment("./data/acs/nc_acs_SNAP_2023.csv").csv({typed: true})
```

Example row:

```js
data[0]
```

Let's filter it down to Wake County only.

`COUNTYFIP` is the FIPs code for each county. North Carolina's FIPs code is `37` and Wake County's FIPS code is `183`, so it may be represented as either `37183` or `183`.

```javascript
const wakeCounty = data.filter((d) => d.COUNTYFIP == 183)
```

```js
const wakeCounty = data.filter((d) => d.COUNTYFIP == 183)
```

```js
wakeCounty
```

See the `./data/acs/CODEBOOK.md` file to understand the values per column.

## Group by Foodstamp Status per County

Excerpt from `./data/acs/CODEBOOK.md` about the `FOODSTMP` column values.

```
FOODSTMP            Food stamp recipiency
0                   N/A
1                   No
2                   Yes
```

- 1 == NO benefits received
- 2 == YES benefits received

Let's roll it up and flatten it with our imported `threeLevelRollUpFlatMap` function!

```javascript
const wakeCountyByYear = threeLevelRollUpFlatMap(wakeCounty, "YEAR", "COUNTYFIP", "FOODSTMP", "AF")
```

```js
const wakeCountyByYear = threeLevelRollUpFlatMap(wakeCounty, "YEAR", "COUNTYFIP", "FOODSTMP", "AF")
```

```js
wakeCountyByYear
```

Once you combine some years, this will include more data.

## Output as a CSV

Check out the `utils/utils.js` file, wherein I included and imported the

```js
view(
  downloadAsCSV(
    // Fancy method to convert array of objects to CSV string
    async () => {
      const csvFullString = d3.csvFormat(wakeCountyByYear);
      return new Blob([csvFullString], { type: "text/csv" });
    },
    // Filename
    "wake-county-SNAP-summary.csv",
    // Button Label
    "Save Dataset As CSV"
  )
);
```