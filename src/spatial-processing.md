## Observable-friendly Plot choropleth (recommended)

This section provides a clean, Observable-first Plot.plot implementation (SVG) that loads the same SNAP CSV and township GeoJSON and renders a choropleth. Plot is built into Observable and is the most reliable way to show a map quickly without heavy WebGL dependencies.

```js
// 1) Load the data (run this cell before the plotting code)
let csv = await FileAttachment("./data/census-2023/wc-snap-households-with-children.csv").csv({typed: true});
let townships = await FileAttachment("./data/wc-geo/Townships.geojson").json();
if (!townships || !Array.isArray(townships.features)) throw new Error('Townships.geojson missing or malformed');

// 2) Build a robust lookup (prefer geoid if available, otherwise normalized name)
function normalizeKey(s){ return String(s || "").trim().toUpperCase().replace(/[\W_]+/g, ""); }
const lookup = new Map();
csv.forEach(d => {
  if (d.geoid) lookup.set(d.geoid, d);
  lookup.set(normalizeKey(d.area), d);
});

// 3) Attach the metric to features
townships.features.forEach(f => {
  const geoid = f.properties && (f.properties.GEOID || f.properties.geoid || f.properties.GEOID10);
  const name = f.properties && (f.properties.NAME || f.properties.TOWNSHIP);
  const match = lookup.get(geoid) || lookup.get(normalizeKey(name));
  f.properties.percSnapChildren = (match && +match.snapHousehold) ? (+match.snapHouseholdWithChildren / +match.snapHousehold) * 100 : null;
});

// Quick check — how many matched
let matched = townships.features.filter(f => f.properties && f.properties.percSnapChildren != null).length;
let total = townships.features.length;
matched + ' / ' + total + ' townships matched to SNAP data\n' + (total - matched ? 'Unmatched: ' + townships.features.filter(f => f.properties && f.properties.percSnapChildren == null).map(f => f.properties && (f.properties.NAME || f.properties.TOWNSHIP)).filter(Boolean).join(', ') : '')
```
```js
// --- Plot.plot choropleth (SVG, Observable-ready)
// Run this cell after loading and attaching percSnapChildren to `townships` above
Plot.plot({
  width: 900,
  height: 640,
  projection: {type: "mercator", domain: townships},
  color: {scheme: "YlOrRd", label: "% SNAP households with children"},
  marks: [
    Plot.geo(townships, {
      fill: "properties.percSnapChildren",
      stroke: "white",
      title: d => `${d.properties.NAME}: ${d.properties.percSnapChildren == null ? 'no data' : d.properties.percSnapChildren.toFixed(1) + '%'}`
    })
  ]
})
```
```js
