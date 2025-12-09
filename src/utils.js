import * as d3 from "d3";
import {ascending,descending,sum,rollup,rollups} from "d3-array";


//Filters data to only include people who receive SNAP benefits
export const snapOnlyFunc = (data) => {
  let array = []
  for (const person of data){
    if (person.FOODSTMP ==2){
      array.push(person);
    }
  }
  return array;
}

//Parses through the original race data and assigns the numbers to the corresponding race
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

//Assigns a new race variable based on the race string
export const assignRaceStringFunc = (data) => {
  return data.map(person => ({
  ...person,
  race: parseRaceData(person.RACE)
}))
};

//Groups data by race of person
export const groupedByRaceFunc = (data) => {
  const withRace = assignRaceStringFunc(data);
  return d3.group(withRace, d => d.race);
};

