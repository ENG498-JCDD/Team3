```js
let wc2023Census = FileAttachment("./data/acs/nc_acs_SNAP_2023.csv").csv({typed: true})

```
Original CSV data
```js
wc2023Census
```
```js
let wc2023CensusArray = Array.from(wc2023Census)
```
Array Data
```js
wc2023CensusArray
```
```js
let wc2023Snap = []
console.log(wc2023Snap)
for (const person of wc2023CensusArray) {
  if (person.FOODSTMP == 2){
    wc2023Snap.push(person)
  }
}
```
Only SNAP recipients
```js
wcSnap2023
```