import { utcParse } from "d3-time-format";


/**
 * EXPORTED FUNCTIONS
 */

//Parse year strings to date object
export const parseYear = utcParse("%Y");

//Transform SNAP totals for data visualization
export const snapYearFunc = (data) => data.map(d => ({
  ...d,
  year: parseYear(d.year)
}))

export const snapCountsFunc = (data) => [
  ...data.map(d => ({year: d.year, value: d.withSnap, householdType: "With SNAP"})),
  ...data.map(d => ({year: d.year, value: d.total, householdType: "Total Households"})),
  ...data.map(d => ({year: d.year, value: d.noSnap, householdType: "No SNAP"}))
]

//Remove extra area information

export const cleanAreaFunc = (data) => data.map(d => ({
  ...d,
  area: d.area.slice(0,-26)
}))

// SNAP CHILDREN FUNCTIONS

//1.  snap children percentage
export const snapChildrenPercFunc = (data) => data.map(area => ({
  ...area,
    percSnapChildren: (area.snapHouseholdWithChildren/(area.snapHouseholdWithChildren + area.nonSnapHouseholdWithChildren))*100,
    //percSnapNoChildren: (area.snapNoChildren/area.snapHousehold)*100,
}))

//2. remap labels
export const householdMappingFunc = (data) => data.map(d => ({
  //each object contains data for area & population
  area: d.area,
  population: d.population,
  //Then there are two objects to select, snap households and non snap households
  snap: {
    //total # of households with snap
    totalHouseholds: d.snapHousehold,
    //Two more objects inside of the snap group: houses with kids (withChildren) and houses without kids (withoutChildren).
    withChildren: {
      //each of these final object has the total # of houses and counts of the the types of families
      total: d.snapHouseholdWithChildren,
      married: d.snapMarriedWithChildren,
      singleFather: d.snapSingleFather,
      singleMother: d.snapSingleMother,
      nonFamilyHouseholds: d.snapNonFamily,
    },
    withoutChildren: {
      total: d.snapNoChildren,
      married: d.snapMarriedNoChildren,
      singleMale: d.snapSingleMale,
      singleFemale: d.snapSingleFemale,
      nonFamilyHouseholds: d.snapNonFamilyNoChildren,
    },
  },
  //the pattern is repeated here with non-snap households
  nonSnap: {
    totalHouseholds: d.nonSnapHousehold,
    withChildren: {
      total: d.nonSnapHouseholdWithChildren,
      married: d.nonSnapMarriedWithChildren,
      singleFather: d.nonSnapSingleFather,
      singleMother: d.nonSnapSingleMother,
      nonFamilyHouseholds: d.nonSnapNonFamily,
    },
    withoutChildren: {
      total: d.nonSnapNoChildren,
      married: d.nonSnapMarriedNoChildren,
      singleMale: d.nonSnapSingleMale,
      singleFemale: d.nonSnapSingleFemale,
      nonFamilyHouseholds: d.nonSnapNonFamilyNoChildren,
    },
  },
}))

//3.  children flat map
export const stackedChildrenData = (data) => data.flatMap(d => [
  //each object contains area (categorical variable),
  //type: labels the type of family
  //count: the variable to total from and label. 
  // make sure you a navigating through the objects correctly. (ex., since single mom snap houses are nested within "withChildren" and "snap you must type snap.withChildren.singleMother)
  {area: d.area, type: "Single Female", count: d.snap.withChildren.singleMother},
  {area: d.area, type: "Single Male", count: d.snap.withChildren.singleFather},
  {area: d.area, type: "Married With Children", count: d.snap.withChildren.married},
  {area: d.area, type: "Non-Family With Children", count: d.snap.withChildren.nonFamilyHouseholds}
])

//single female
export const singleFemaleFunc = (data) => data.flatMap(d => [
  {area: d.area, type: "SNAP: Single Female", count: d.snap.withChildren.singleMother},
  {area: d.area, type: "Non-SNAP: Single Female", count: d.nonSnap.withChildren.singleMother},
])

export const singleFemalePercFunc = (data) => data.map(area => ({
  ...area,
    percSnapSingleFemale: (area.snap.withChildren.singleMother/(area.snap.withChildren.singleMother + area.nonSnap.withChildren.singleMother))*100,
    //percSnapNoChildren: (area.snapNoChildren/area.snapHousehold)*100,
}))