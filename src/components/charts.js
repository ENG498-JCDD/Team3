/**
 * charts.js
 * 
 * Exportable charts to free up 
 * reporting copy notebooks.
 * 
**/

// IMPORTS
import * as Plot from "npm:@observablehq/plot";
import * as d3 from "npm:d3";

/**
 * SQ1 CHARTS
**/

// SQ1-SNAP GROSS MONTHLY INCOME LINE CHART

export const monthlyNationalGrossSnapIncome = (width, height, data, xCol, yCol, thirdDataLayer) => {
  /** LINDGREN
   * ON SCALES: Always scale your axes appropriately.
   * A monthly gross income should start
   * at 0, otherwise the shart could become
   * skewed by an arbitrary choice.
  **/
  const snapMGI = data.d1;
  const acsMGI = data.d2;
  const yDomain = [0, d3.max(acsMGI, d => d.mean_mgi)];

  return Plot.plot({
    width: width,
    height: height-50,
    //added grid, axis labels, domain limits for y-axis
    // LINDGREN: Added `interval: 1` to define annual delimit
    x: {grid: true, label: "Fiscal Year", tickFormat: "", interval: 1},
    y: {grid: true, domain: yDomain, label: "SNAP Household Income Limit ($) vs. All US Household Monthly Income"},
    marks: [
      //added legend, pointer rule mark, tooltip to display details when hovering over data point
      Plot.ruleY([0]),

      // SNAP DATA
      Plot.ruleX(snapMGI, Plot.pointerX({x: xCol, py: yCol, stroke: "black"})),
      Plot.lineY(
        snapMGI,
        {
          x: xCol,
          y: yCol,
          stroke: thirdDataLayer,
          marker: true,
        }
      ),
      // Plot.text(snapMGI, Plot.selectLast({x: "Fiscal Year", y: "Income Limit", z: "Recipients", text: "Recipients", textAnchor: "start", dx: 3})),
      // Plot.tip(snapMGI, Plot.pointerX({x: xCol, y: yCol})),

      // LINDGREN: Added ACS Monthly Gross MEDIAN Income
      Plot.lineY(
        acsMGI,
        {
          x: "year",
          y: {value: "median_mgi", label: "Median MGI"},
          stroke: "Household",
          marker: true,
        }
      ),
      // LINDGREN: Added ACS Monthly Gross MEAN Income
      Plot.lineY(
        acsMGI,
        {
          x: "year",
          y: {value: "mean_mgi", label: "Mean MGI"},
          stroke: "Household",
          marker: true,
        }
      ),
    ],
    color: {
      legend: true
    }
  })
}