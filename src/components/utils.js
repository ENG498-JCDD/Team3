import { utcParse } from "d3-time-format";


/**
 * EXPORTED FUNCTIONS
 */

export const parseYear = utcParse("%Y");

export const snapYearFunc = (data) => data.map(d => ({
  ...d,
  year: parseYear(d.year)
}))
export const snapCountsFunc = (data) => [
  ...data.map(d => ({year: d.year, value: d.withSnap, householdType: "With SNAP"})),
  ...data.map(d => ({year: d.year, value: d.total, householdType: "Total Households"})),
  ...data.map(d => ({year: d.year, value: d.noSnap, householdType: "No SNAP"}))
]
