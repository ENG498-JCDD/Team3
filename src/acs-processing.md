```js
let wc2023Census = FileAttachment("./data/acs/nc_acs_SNAP_2023.csv").csv({typed: true})

```
```js
wc2023Census
```
```js
let wc2023CensusArray = Array.from(wc2023Census)
```
```js
let wcSnap2023Census = []
for (const person of wc2023CensusArray) {
 console.log(person.FOODSTMP)
  if (person.FOODSTMP == 2){
    wcSnap2023Census.push(person)
  }
}
```
```js
wcSnap2023Census
```