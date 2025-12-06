# Grouping 2012-2022 NC SNAP Recipients by Race

```js
import {ascending,descending,sum,rollup,rollups} from "d3-array";
import {utcParse,utcFormat} from "d3-time-format";
```

```js
const oneLevelRollUpFlatMap = (data, level1Key, countKey) => {

  // 1. Rollups on one level
  const colTotals = rollups(
    data,
    (v) => v.length, // Count length of leaf node
    (d) => d[level1Key] // d["race"]
  )

  // 2. Flatten back to array of objects
  const flatTotals = colTotals.flatMap((e) => {
    return {
      [level1Key]: e[0],
      [countKey]: e[1]
    }
  })

  // 3. Return the sorted totals
  return flatTotals
}

const twoLevelRollUpFlatMap = (data, level1Key, level2Key, countKey) => {

  // 1. Rollups on 2 nested levels
  const colTotals = rollups(
    data,
    (v) => v.length, //Count length of leaf node
    (d) => d[level1Key], //Accessor at 1st level
      (d) => d[level2Key], //Accessor at 2nd level
  )

  // 2. Flatten 1st grouped level back to array of objects
  const flatTotals = colTotals.flatMap((l1Elem) => {

    // 2.1 Assign level 1 key
    let l1KeyValue = l1Elem[0]

    // 2.2 Flatten 2nd grouped level
    const flatLevels = l1Elem[1].flatMap((l2Elem) => {

      // 2.2.1 Assign level 2 key
      let l2KeyValue = l2Elem[0]

      // l2Elem[1].flatMap()

      // 2.2.2 Return fully populated object
      return {
        [level1Key]: l1KeyValue,
        [level2Key]: l2KeyValue,
        [countKey]: l2Elem[1]
      }
    })

    // 3. Return flattened array of objects
    return flatLevels
  })

  // 3. Return the sorted totals
  return flatTotals
}
```

```js
//Filters data to only include people who receive SNAP benefits
const snapOnlyFunc = (data) => {
  let array = []
  for (const person of data){
    if (person.FOODSTMP ==2){
      array.push(person);
    }
  }
  return array;
};

//Parses through the original race data and assigns the numbers to the corresponding race
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
};

//Assigns a new race variable based on the race string
const assignRaceStringFunc = (data) => {
  return data.map(person => ({
  ...person,
  race: parseRaceData(person.RACE)
}))
};

const groupedByRaceFunc = (data) => {
  const withRace = assignRaceStringFunc(data);
  return d3.group(withRace, d => d.race);
};
```

```js
let wc2012Census = FileAttachment("./data/acs/nc_acs_SNAP_2012.csv").csv({typed: true});
/*
let wc2013Census = FileAttachment("./data/acs/nc_acs_SNAP_2013.csv").csv({typed: true});
let wc2014Census = FileAttachment("./data/acs/nc_acs_SNAP_2014.csv").csv({typed: true});
let wc2015Census = FileAttachment("./data/acs/nc_acs_SNAP_2015.csv").csv({typed: true});
let wc2016Census = FileAttachment("./data/acs/nc_acs_SNAP_2016.csv").csv({typed: true});
let wc2017Census = FileAttachment("./data/acs/nc_acs_SNAP_2017.csv").csv({typed: true});
let wc2018Census = FileAttachment("./data/acs/nc_acs_SNAP_2018.csv").csv({typed: true});
*/
let wc2019Census = FileAttachment("./data/acs/nc_acs_SNAP_2019.csv").csv({typed: true});
let wc2020Census = FileAttachment("./data/acs/nc_acs_SNAP_2020.csv").csv({typed: true});
let wc2021Census = FileAttachment("./data/acs/nc_acs_SNAP_2021.csv").csv({typed: true});
let wc2022Census = FileAttachment("./data/acs/nc_acs_SNAP_2022.csv").csv({typed: true});
let wc2023Census = FileAttachment("./data/acs/nc_acs_SNAP_2023.csv").csv({typed: true});
```

```js
//This function filters the data to only include SNAP recipients

let wc2012Snap = snapOnlyFunc(wc2012Census);
/*
let wc2013Snap = snapOnlyFunc(wc2013Census);
let wc2014Snap = snapOnlyFunc(wc2014Census);
let wc2015Snap = snapOnlyFunc(wc2015Census);
let wc2016Snap = snapOnlyFunc(wc2016Census);
let wc2017Snap = snapOnlyFunc(wc2017Census);
let wc2018Snap = snapOnlyFunc(wc2018Census);
*/
let wc2019Snap = snapOnlyFunc(wc2019Census);
let wc2020Snap = snapOnlyFunc(wc2020Census);
let wc2021Snap = snapOnlyFunc(wc2021Census);
let wc2022Snap = snapOnlyFunc(wc2022Census);
let wc2023Snap = snapOnlyFunc(wc2023Census)
```

2023 Total SNAP Recipients in Wake County
```js
const wc2023SnapArray = Array.from(wc2023Snap)
```

```js
wc2023SnapArray.length
```

2022 Total SNAP Recipients
```js
const wc2022SnapArray = Array.from(wc2022Snap)
```

```js
wc2022SnapArray.length
```

2021 Total SNAP Recipients
```js
const wc2021SnapArray = Array.from(wc2021Snap)
```

```js
wc2021SnapArray.length
```

2020 Total SNAP Recipients
```js
const wc2020SnapArray = Array.from(wc2020Snap)
```

```js
wc2020SnapArray.length
```

2019 Total SNAP Recipients
```js
const wc2019SnapArray = Array.from(wc2019Snap)
```

```js
wc2019SnapArray.length
```

```js
//Groups by race

let wc2012SnapByRace = groupedByRaceFunc(wc2012Snap);
/*
let wc2013SnapByRace = groupedByRaceFunc(wc2013Snap);
let wc2014SnapByRace = groupedByRaceFunc(wc2014Snap);
let wc2015SnapByRace = groupedByRaceFunc(wc2015Snap);
let wc2016SnapByRace = groupedByRaceFunc(wc2016Snap);
let wc2017SnapByRace = groupedByRaceFunc(wc2017Snap);
let wc2018SnapByRace = groupedByRaceFunc(wc2018Snap);
let wc2019SnapByRace = groupedByRaceFunc(wc2019Snap);
let wc2020SnapByRace = groupedByRaceFunc(wc2020Snap);
let wc2021SnapByRace = groupedByRaceFunc(wc2021Snap);
let wc2022SnapByRace = groupedByRaceFunc(wc2022Snap);
*/
let wc2023SnapByRace = groupedByRaceFunc(wc2023Snap);
```


```js
//2012 SNAP Recipients by Race
//wc2012SnapByRace
```

```js
//2013 SNAP Recipients by Race
//wc2013SnapByRace
```


```js
//2014 SNAP Recipients by Race
//wc2014SnapByRace
```

```js
//2015 SNAP Recipients by Race
//wc2015SnapByRace
```

```js
//2016 SNAP Recipients by Race
//wc2016SnapByRace
```

```js
//2017 SNAP Recipients by Race
//wc2017SnapByRace
```

```js
//2018 SNAP Recipients by Race
//wc2018SnapByRace
```

```js
//2019 SNAP Recipients by Race
//wc2019SnapByRace
```

```js
//2020 SNAP Recipients by Race
//wc2020SnapByRace
```

```js
//2021 SNAP Recipients by Race
//wc2021SnapByRace
```

```js
//2022 SNAP Recipients by Race
//wc2022SnapByRace
```

```js
//2023 SNAP Recipients by Race
//wc2023SnapByRace
```

```js
/*
const byGenderAndAge = twoLevelRollUpFlatMap(
  wc2022SnapByRaceArray,
  "AGE",
  "SEX",
  "af"
)
*/
```

```js
/*
byGenderAndAge
*/
```