```js
import {parseRaceData, assignRaceStringFunc, groupedByRaceFunc} from "./utils.js"
import * as d3 from "d3";
import {ascending,descending,sum,rollup,rollups} from "d3-array";
```
```js
let wc2023Census = FileAttachment("./data/acs/nc_acs_SNAP_2023.csv").csv({typed: true})

```
Original CSV data
```js
wc2023Census[0]
```
```js
let wc2023CensusArray = Array.from(wc2023Census)
```
Array Data
```js
wc2023CensusArray[0]
```
```js
let wcSnap =[]
console.log(wcSnap)
for (const person of wc2023Census){
  if (person.FOODSTMP == 2){
    wcSnap.push(person)
  }
 // console.log(wcSnap)
}
```
looped data
```js
wcSnap [0]
```

RACE                Race [general version]
1                   White
2                   Black/African American
3                   American Indian or Alaska Native
4                   Chinese
5                   Japanese
6                   Other Asian or Pacific Islander
7                   Other race, nec
8                   Two major races
9                   Three or more major races

<!-- ```js
function parseRaceData(data) {
  const raceLookup = {
    1: "White",
    2: "Black or African American",
    3: "American Indian or Alaska Native",
    4: "Asian or Pacific Islander",
    5: "Asian or Pacific Islander",
    6: "Asian or Pacific Islander",
    7: "Other Race",
    8: "Two or More Races",
    9: "Two or More Races",
  };

  return raceLookup[data] || "Unknown";
}

```
```js
let wcSnapByRace = wcSnap.map(person => ({
  ...person,
  race: parseRaceData(person.RACE)
  //console.log(wcSnapByRace[0])
}))
```
```js
//wcSnapByRace
```
```js
d3.group(wcSnapByRace, 
  (d) => d.race)
```
```js
//wcSnapByRace
``` -->
```js
let wctestfuncsnap = groupedByRaceFunc(wcSnap)
```
testing functions
```js
wctestfuncsnap
```