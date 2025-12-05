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
