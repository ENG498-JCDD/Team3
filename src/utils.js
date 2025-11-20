import * as d3 from "d3";
import {ascending,descending,sum,rollup,rollups} from "d3-array";

export function parseRaceData(data) {
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

export const assignRaceStringFunc = (data) => {
  return data.map(person => ({
  ...person,
  race: parseRaceData(person.RACE)
}))
};

export const groupedByRaceFunc = (data) => {
  const withRace = assignRaceStringFunc(data);
  return d3.group(withRace, d => d.race);
};

