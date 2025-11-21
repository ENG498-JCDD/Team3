# Grouping 2012-2022 NC SNAP Recipients by Race

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
let wc2013Census = FileAttachment("./data/acs/nc_acs_SNAP_2013.csv").csv({typed: true});
let wc2014Census = FileAttachment("./data/acs/nc_acs_SNAP_2014.csv").csv({typed: true});
let wc2015Census = FileAttachment("./data/acs/nc_acs_SNAP_2015.csv").csv({typed: true});
let wc2016Census = FileAttachment("./data/acs/nc_acs_SNAP_2016.csv").csv({typed: true});
let wc2017Census = FileAttachment("./data/acs/nc_acs_SNAP_2017.csv").csv({typed: true});
let wc2018Census = FileAttachment("./data/acs/nc_acs_SNAP_2018.csv").csv({typed: true});
let wc2019Census = FileAttachment("./data/acs/nc_acs_SNAP_2019.csv").csv({typed: true});
let wc2020Census = FileAttachment("./data/acs/nc_acs_SNAP_2020.csv").csv({typed: true});
let wc2021Census = FileAttachment("./data/acs/nc_acs_SNAP_2021.csv").csv({typed: true});
let wc2022Census = FileAttachment("./data/acs/nc_acs_SNAP_2022.csv").csv({typed: true});
```

```js
//This function filters the data to only include SNAP recipients
let wc2012Snap = snapOnlyFunc(wc2012Census);
let wc2013Snap = snapOnlyFunc(wc2013Census);
let wc2014Snap = snapOnlyFunc(wc2014Census);
let wc2015Snap = snapOnlyFunc(wc2015Census);
let wc2016Snap = snapOnlyFunc(wc2016Census);
let wc2017Snap = snapOnlyFunc(wc2017Census);
let wc2018Snap = snapOnlyFunc(wc2018Census);
let wc2019Snap = snapOnlyFunc(wc2019Census);
let wc2020Snap = snapOnlyFunc(wc2020Census);
let wc2021Snap = snapOnlyFunc(wc2021Census);
let wc2022Snap = snapOnlyFunc(wc2022Census);
```

```js
//Groups by race
let wc2012SnapByRace = groupedByRaceFunc(wc2012Snap);
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

2017 SNAP Recipients by Race
```js
wc2017SnapByRace
```

2018 SNAP Recipients by Race
```js
wc2018SnapByRace
```

2019 SNAP Recipients by Race
```js
wc2019SnapByRace
```

2020 SNAP Recipients by Race
```js
wc2020SnapByRace
```

2021 SNAP Recipients by Race
```js
wc2021SnapByRace
```

2022 SNAP Recipients by Race
```js
wc2022SnapByRace
```