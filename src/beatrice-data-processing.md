# Processing Feeding America Data

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
let wc2013Census = FileAttachment("./data/acs/nc_acs_SNAP_2013.csv").csv({typed: true})
let wc2014Census = FileAttachment("./data/acs/nc_acs_SNAP_2014.csv").csv({typed: true})
let wc2015Census = FileAttachment("./data/acs/nc_acs_SNAP_2015.csv").csv({typed: true})
let wc2016Census = FileAttachment("./data/acs/nc_acs_SNAP_2016.csv").csv({typed: true})
```

```js
//This function filters the data to only include SNAP recipients
let wc2012Snap = snapOnlyFunc(wc2012Census)
let wc2013Snap = snapOnlyFunc(wc2013Census)
let wc2014Snap = snapOnlyFunc(wc2014Census)
let wc2015Snap = snapOnlyFunc(wc2015Census)
let wc2016Snap = snapOnlyFunc(wc2016Census)
```

```js
//Groups by race
let wc2012SnapByRace = groupedByRaceFunc(wc2012Snap)
let wc2013SnapByRace = groupedByRaceFunc(wc2013Snap)
let wc2014SnapByRace = groupedByRaceFunc(wc2014Snap)
let wc2015SnapByRace = groupedByRaceFunc(wc2015Snap)
let wc2016SnapByRace = groupedByRaceFunc(wc2016Snap)
```
2012 SNAP Recipients by Race
```js
wc2012SnapByRace
```

2013 SNAP Recipients by Race
```js
wc2013SnapByRace
```

2014 SNAP Recipients by Race
```js
wc2014SnapByRace
```

2015 SNAP Recipients by Race
```js
wc2015SnapByRace
```

2016 SNAP Recipients by Race
```js
wc2016SnapByRace
```
