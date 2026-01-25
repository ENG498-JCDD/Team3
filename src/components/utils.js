import { utcParse } from "d3-time-format";


/**
 * EXPORTED FUNCTIONS
**/

/** getUniquePropListBy()
 * Goal: Create a unique list of `x` property
 *       in an array of objects.
 * @params
 *   - arr: Array. Any array of objects.
 *   - key: String. Desired property to isolate.
 * @return
 *   - uniqWeeks: Array. List of unique data values.
**/
export const getUniquePropListBy = (arr, key) => {
  const uniqueObjs = [...new Map(arr.map(item => [item[key], item])).values()]
  const uniqWeeks = []
  for (const o of uniqueObjs) {
    uniqWeeks.push(o[key])
  }
  return uniqWeeks
}

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

//temporal remap
//2. remap labels
export const houseMapYearFunc = (data) => data.map(d => ({
  year: d.year,
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

//temporal household flat map
export const singleMotherFunc = (data) => data.map(d => ({
  year: d.year,
  area: d.area,
  type: "Single Mother",
  count: d.snap.withChildren.singleMother,
  perc: d.snap.withChildren.singleMother / d.snap.totalHouseholds * 100
}))

export const singleMotherCompFunc = (data) => data.map(d => ({
  year: d.year,
  area: d.area,
  type: "Single Mother",
  count: d.snap.withChildren.singleMother,
  perc: (d.snap.withChildren.singleMother/(d.snap.withChildren.singleMother + d.nonSnap.withChildren.singleMother))*100,
}))

//DISABILITY STATUS FUNCTIONS

//1. diability mapping
export const disabilityCountFunc = (data) => data.map(d => ({
  area: d.area,
  population: d.totalHouseholds,
  snap: {
    totalHouseholds: d.householdReceivedSNAPInPast12Months,
    disabledIndividualInHousehold: d.householdWithOneOrMorePersonsWithADisabilitySnap,noDisabledIndividuals: d.householdsWithNoPersonsWithADisabilitySnap,
    },
  nonSnap: {
    totalHouseholds: d.householdsDidNotReceiveSNAPInPast12Months,disabledIndividualInHousehold: d.householdsWithOneOrMorePersonsWithADisabilityNoSnap,noDisabledIndividuals: d.householdsWithNoPersonsWithADisabilityNoSnap,
  },
  percSnapWithDis: (d.householdWithOneOrMorePersonsWithADisabilitySnap/d.householdReceivedSNAPInPast12Months)*100,
  percDisOnSnap: (d.householdWithOneOrMorePersonsWithADisabilitySnap/(d.householdWithOneOrMorePersonsWithADisabilitySnap + d.householdsWithOneOrMorePersonsWithADisabilityNoSnap))*100,
}))
    
//2. diability status flat map
export const disabilityMapFunc = (data) => data.flatMap(d => [
  {area: d.area, type: "SNAP: Disabled Individual in Household", count: d.snap.disabledIndividualInHousehold},
  {area: d.area, type: "SNAP: No Disabled Individuals in Household", count: d.snap.noDisabledIndividuals},
  //{area: d.area, type: "non-SNAP: Disabled Individual in Household", count: d.nonSnap.disabledIndividualInHousehold},
  //{area: d.area, type: "non-SNAP: No Disable Individuals in Household", count: d.nonSnap.noDisabledIndividuals},
])

//only disabled indiv
export const onlyDisabledIndivFunc = (data) => data.flatMap(d => [
  {area: d.area, type: "SNAP: Disabled Individual in Household", count: d.snap.disabledIndividualInHousehold},
  // {area: d.area, type: "SNAP: No Disable Individuals in Household", count: d.snap.noDisabledIndividuals},
  {area: d.area, type: "non-SNAP: Disabled Individual in Household", count: d.nonSnap.disabledIndividualInHousehold},
  // {area: d.area, type: "non-SNAP: No Disable Individuals in Household", count: d.nonSnap.noDisabledIndividuals},
])

//AGE OVER 60 FUNCTIONS

//1.over 60 mapping
export const over60MapFunc = (data) => data.map(d => ({
  area: d.area,
  population: d.population,
  snap: {
    totalHouseholds: d.snapHousehold,
    over60: d.snapOneOver60,
    noOver60: d.snapNoOver60,
    },
  nonSnap: {
    totalHouseholds: d.nonSnapHousehold,
    memberOver60: d.nonSnapOneOver60,
    noMemberOver60: d.nonSnapNoOver60,
  },
  percSnapOver60: (d.snapOneOver60/d.snapHousehold)*100,
  percOver60OnSnap: (d.snapOneOver60/(d.snapOneOver60 + d.nonSnapOneOver60))*100,
}))

//2. over 60 flat map
export const over60SnapFlatMapFunc = (data) => data.flatMap(d => [
  {area: d.area, type: "SNAP: Individual Over 60 in Household", count: d.snap.over60},
  {area: d.area, type: "SNAP: No Individual Over 60 in Household", count: d.snap.noOver60},
  //{area: d.area, type: "non-SNAP: Individual Over 60 in Household", count: d.nonSnap.memberOver60},
  //{area: d.area, type: "non-SNAP: No Individual Over 60 in Household", count: d.nonSnap.noMemberOver60},
])
export const over60OnlyFlatMapFunc = (data) => data.flatMap(d => [
  //{area: d.area, type: "SNAP: Individual Over 60 in Household", count: d.snap.over60},
  {area: d.area, type: "SNAP: No Individual Over 60 in Household", count: d.snap.noOver60},
  {area: d.area, type: "non-SNAP: Individual Over 60 in Household", count: d.nonSnap.memberOver60},
  //{area: d.area, type: "non-SNAP: No Individual Over 60 in Household", count: d.nonSnap.noMemberOver60},
])