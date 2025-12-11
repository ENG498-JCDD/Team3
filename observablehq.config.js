// See https://observablehq.com/framework/config for documentation.
export default {
  header: "Team 3 - SNAP Benefits",
  // The app’s title; used in the sidebar and webpage titles.
  title: "SNAP Benefits",

  // Configuration options and their defaults:
  sidebar: true, // whether to show the sidebar
  toc: true, // whether to show the table of contents
  pager: true, // whether to show previous & next links in the footer
  search: true, // activate search
  preserveExtension: true, // preserves .html extension
  pages: [
    // {
    //   name: "Wake County SNAP Data",
    //   open: false,
    //   pages: [
    //     {name: "data", path: "/counties-data"},
    //     {name: "Wake County SNAP Households with Children", path: "/wc-snap-children"},
    //     {name: "Wake County SNAP Households with Disabilities", path: "/wc-snap-disabilities"},
    //     {name: "Wake County SNAP Households with Members over 60", path: "/wc-snap-over60"},
        
    //   ]
    // },
    {name: "Home Page", path: "/index"},
    {
      name: "Specifying Question Dashboards",
      open: true,
      pages: [
         {name: "SQ1: Are SNAP benefits becoming harder to access?", path: "/snap-us-income-elig-fy20to26"},
        {name: "SQ2: Wake County SNAP Demographics", path: "/wc-demographics-dash"},
        {name: "SQ3: How do SNAP benefits impact food insecurity levels in Wake County?", path: "/sq3-report"},
      ]
    },
   
    {name: "Data Design", path: "/data-design"},
    {name: "Reflection", path: "/reflection"}
  ],

  // Content to add to the head of the page, e.g. for a favicon:
  head: '<link rel="icon" href="observable.png" type="image/png" sizes="32x32"><link rel="stylesheet" href="style.css" /><script src="https://unpkg.com/d3-regression@1.3.10/dist/d3-regression.min.js"></script><script>',

  // The path to the source root.
  // root: "src",
  // Some additional configuration options and their defaults:
  // theme: "default", // try "light", "dark", "slate", etc.
  // header: "", // what to show in the header (HTML)
  // footer: "Built with Observable.", // what to show in the footer (HTML)
  // sidebar: true, // whether to show the sidebar
  // toc: true, // whether to show the table of contents
  // pager: true, // whether to show previous & next links in the footer
  // output: "dist", // path to the output root for build
  // search: true, // activate search
  // linkify: true, // convert URLs in Markdown to links
  // typographer: false, // smart quotes and other typographic improvements
  // preserveExtension: false, // drop .html from URLs
  // preserveIndex: false, // drop /index from URLs
};
