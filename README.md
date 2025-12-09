# SNAP Benefits

- Beatrice Ogeh
- Alyssa Johnson
- Sami Zito

Our project aims to provide compelling evidence of growing food insecurity and the individuals/groups most affected by it, as well as the degree to which the SNAP program has mitigated food insecurity in Wake County and the greater United States.

- [Project Tracker](https://docs.google.com/spreadsheets/d/1lxIZQuG1yzJ_CkDQdpC8MO9bCqgniBDE/edit?gid=1372465741#gid=1372465741)

## About the Data

**`src/data/path/to/dataset.csv`**
- **Topic**: SNAP Benefits
- **Overview**: Enter brief description for each dataset.
- **Source**: [``]()
- **Sample Row**:
  ```csv
  enter,sample,row,here
  1,2,3,"Hello world!"
  ```
  **`src\data\census-2023\wc-snap-people-over-60-years.csv`**
- **Topic**: SNAP status vs. Age.
- **Overview**: Looks at snap status compared to people 60+ years old in wake county townships
- **Source**: [Census Reporter](https://censusreporter.org/tables/B22001/)
- **Sample Row**:
  ```csv
  06000US3718393984,"WHITE OAK",40904,1033,857,223,370,165,487,171,40047,1063,5685,558,34362,1106
  ```
**`src\data\census-2023\wc-snap-households-with-children.csv`**
- **Topic**: SNAP status vs. Houseold income.
- **Overview**: Looks at snap status compared to household income in wake county townships
- **Source**: [Census Reporter](https://censusreporter.org/tables/B22008/)
- **Sample Row**:
  ```csv
  06000US3718390164,"BARTONS CREEK",8220,456,99,53,75,48,24,24,51,45,34,37,17,28,0,25,24,27,0,25,14,21,14,21,0,25,10,16,8121,462,3000,386,2628,341,372,206,65,51,307,215,0,25,5121,314,3844,254,218,118,37,27,181,115,1059,194
  ```
  **`src\data\census-2023\wc-median-household-income.csv`**
- **Topic**: SNAP status vs. Houseold Type.
- **Overview**: Looks at snap status compared to household type (with consideration of children presence) in wake county townships
- **Source**: [Census Reporter](https://censusreporter.org/tables/B22002/)
- **Sample Row**:
  ```csv
  06000US3718390164,"BARTONS CREEK",8220,456,99,53,75,48,24,24,51,45,34,37,17,28,0,25,24,27,0,25,14,21,14,21,0,25,10,16,8121,462,3000,386,2628,341,372,206,65,51,307,215,0,25,5121,314,3844,254,218,118,37,27,181,115,1059,194
  ````

  **`src\data\wc-snap-count\b19058.csv`**
- **Topic**: Number of snap households
- **Overview**: Looks at snap household count in wake county since 2010
- **Source**: [United States Census Bureau](https://data.census.gov/table/ACSDT1Y2021.B19058?q=SNAP/Food+Stamps&g=050XX00US37183&moe=false)
- **Sample Row**:
 ```csv
 2010,338054,22718,315336
 ```
  **`src\data\wc-snap-count\acs-b22002.csv`**
- **Topic**: Number of snap households by type
- **Overview**: Looks at snap household by type in wake county since 2016
- **Source**: [United States Census Bureau](https://data.census.gov/table/ACSDT1Y2024.B22002?q=SNAP/Food+Stamps&g=050XX00US37183)
- **Sample Row**:
 ```csv
 2023,Buckhorn,3897,0,0,0,0,0,0,0,0,0,0,0,0,0,3897,2471,2218,253,48,205,0,1426,815,169,94,75,442
 ```

  **`src/data/map-the-meal-gap/MMG2025_2019-2023_Data_To_Share(County).csv`**
- **Topic**: SNAP/Food Insecurity data by county/state
- **Overview**: Includes stats on food insecurity and SNAP participation at county and state level during 2019-2023.
- **Source**: [Map the Meal Gap Data](https://www.feedingamerica.org/research/map-the-meal-gap/overall-executive-summary)
- **Sample Row**:
 ```csv
01001,AL,"Autauga County, Alabama",2019,15.7%,"8,670",26%,,12%,130%,49%,51%,19.6%,"2,590",69%,31%,$3.00,$16.88,"$4,439,000",2,,South,East South Central,Southeast
```

**`src/data/usda/alaska.csv`**
- **Topic**: SNAP Income Limits in Alaska
- **Overview**: Data represents SNAP Income Limits in Alaska from FY2020 to FY2026
- **Source**: [SNAP Cost-of-Living Adjustment (COLA) Information](https://www.fns.usda.gov/snap/allotment/cola)
- **Sample Row**:
  ```csv
  2020,3488,Alaska
  ```

**`src/data/usda/contig-states.csv`**
- **Topic**: SNAP Income Limits in Contiguous States
- **Overview**: Data represents SNAP Income Limits in Contiguous States from FY2020 to FY2026
- **Source**: [SNAP Cost-of-Living Adjustment (COLA) Information](https://www.fns.usda.gov/snap/allotment/cola)
- **Sample Row**:
  ```csv
  2020,2790,48 States/DC/Guam/VI
  ```

**`src/data/usda/hawaii.csv`**
- **Topic**: SNAP Income Limits in Hawaii
- **Overview**: Data represents SNAP Income Limits in Hawaii from FY2020 to FY2026
- **Source**: [SNAP Cost-of-Living Adjustment (COLA) Information](https://www.fns.usda.gov/snap/allotment/cola)
- **Sample Row**:
  ```csv
  2020,3209,Hawaii
  ```

**`src/data/usda/FY69-24-SNAP-Annual-Avg-Benefits-per-Person.csv`**
- **Topic**: Average Monthly SNAP Benefits per person
- **Overview**: Data represents Average Monthly SNAP Benefits per person from FY1969 to FY2024.
- **Source**: [SNAP Data Tables](https://www.fns.usda.gov/pd/supplemental-nutrition-assistance-program-snap)
- **Sample Row**:
  ```csv
  1969,6.63
  ```

## About the Data App

This is an [Observable Framework](https://observablehq.com/framework/) app. To install the required dependencies, run:

```
yarn install
```

Then, to start the local preview server, run:

```
yarn dev
```

Then visit <http://localhost:3000> to preview your app.

For more, see <https://observablehq.com/framework/getting-started>.

## Project structure

A typical Framework project looks like this:

```ini
.
├─ src
│  ├─ components
│  │  └─ timeline.js           # an importable module
│  ├─ data
│  │  ├─ launches.csv.js       # a data loader
│  │  └─ events.json           # a static data file
│  ├─ example-dashboard.md     # a page
│  ├─ example-report.md        # another page
│  └─ index.md                 # the home page
├─ .gitignore
├─ observablehq.config.js      # the app config file
├─ package.json
└─ README.md
```

**`src`** - This is the “source root” — where your source files live. Pages go here. Each page is a Markdown file. Observable Framework uses [file-based routing](https://observablehq.com/framework/project-structure#routing), which means that the name of the file controls where the page is served. You can create as many pages as you like. Use folders to organize your pages.

**`src/index.md`** - This is the home page for your app. You can have as many additional pages as you’d like, but you should always have a home page, too.

**`src/data`** - You can put [data loaders](https://observablehq.com/framework/data-loaders) or static data files anywhere in your source root, but we recommend putting them here.

**`src/components`** - You can put shared [JavaScript modules](https://observablehq.com/framework/imports) anywhere in your source root, but we recommend putting them here. This helps you pull code out of Markdown files and into JavaScript modules, making it easier to reuse code across pages, write tests and run linters, and even share code with vanilla web applications.

**`observablehq.config.js`** - This is the [app configuration](https://observablehq.com/framework/config) file, such as the pages and sections in the sidebar navigation, and the app’s title.

## Command reference

| Command           | Description                                              |
| ----------------- | -------------------------------------------------------- |
| `yarn install`            | Install or reinstall dependencies                        |
| `yarn dev`        | Start local preview server                               |
| `yarn build`      | Build your static site, generating `./dist`              |
| `yarn deploy`     | Deploy your app to Observable                            |
| `yarn clean`      | Clear the local data loader cache                        |
| `yarn observable` | Run commands like `observable help`                      |
