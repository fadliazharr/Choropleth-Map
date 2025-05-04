# Choropleth-Map
https://choropleth-map-delta.vercel.app/
# US Education Choropleth Map

This project visualizes the percentage of adults aged 25 and older with a bachelor's degree or higher in the United States, based on data from 2010-2014. The map displays educational attainment at the county level, with varying shades representing the percentage of people with higher education. It also includes an interactive tooltip that provides detailed information when a user hovers over a county.

## Features

* **Choropleth Map**: The map visualizes educational attainment across US counties, with color-coded counties based on the percentage of the population with a bachelor's degree or higher.
* **Tooltip**: Hovering over a county reveals the county name, state, and percentage of adults with a bachelor's degree or higher.
* **Legend**: A legend displays the color scale used in the choropleth map, showing the breakdown of educational attainment percentages.

## Tools Used

* **D3.js**: A JavaScript library for creating dynamic and interactive data visualizations.
* **TopoJSON**: A format for encoding geographic data efficiently, used to display US county boundaries.
* **HTML/CSS**: Basic web technologies to structure and style the page.
* **JavaScript**: For data loading, processing, and creating the interactive map.

## How It Was Made

1. **Data Loading**: Two datasets were used—county boundaries (TopoJSON format) and educational attainment data (JSON format). The data was loaded asynchronously using `Promise.all`.
2. **Map Creation**: Using D3.js, the county boundaries were drawn based on the TopoJSON data, and a color scale was applied to visualize the percentage of higher education attainment.
3. **Interactive Tooltip**: A tooltip was implemented to display detailed information about each county's educational attainment when hovering over a county.
4. **Legend**: A color legend was created using D3’s `scaleThreshold` to visually map the range of educational attainment percentages to specific colors.


