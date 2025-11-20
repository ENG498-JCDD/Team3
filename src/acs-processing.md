```js
import {snapOnlyFunc, parseRaceData, assignRaceStringFunc, groupedByRaceFunc} from "./utils.js"
import * as d3 from "d3";
import {ascending,descending,sum,rollup,rollups} from "d3-array";
```
```js
let wc2023Census = FileAttachment("./data/acs/nc_acs_SNAP_2023.csv").csv({typed: true})

```
Original CSV data
```js
//Only include the first data point to prevent slow loading times and caching
wc2023Census[0]
```

```js
//This function filters the orginal data to only include SNAP recipients
let wc2023Snap = snapOnlyFunc(wc2023Census)
```
Only SNAP Recipients
```js
wc2023Snap
```
```js
//Groups by race
let wc2023SnapByRace = groupedByRaceFunc(wc2023Snap)
```
2023 SNAP Recipients by Race
```js
wc2023SnapByRace
```