document.addEventListener('DOMContentLoaded', function() {
    const educationDataUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json';
    const countyDataUrl = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json';
    
    const width = 960;
    const height = 600;
    
    // Create SVG container
    const svg = d3.select('#choropleth')
        .append('svg')
        .attr('width', width)
        .attr('height', height);
    
    // Create tooltip
    const tooltip = d3.select('#tooltip');
    
    // Load data
    Promise.all([
        d3.json(countyDataUrl),
        d3.json(educationDataUrl)
    ]).then(function(data) {
        const countyData = data[0];
        const educationData = data[1];
        
        // Create a lookup table for education data by FIPS code
        const educationByFips = {};
        educationData.forEach(function(d) {
            educationByFips[d.fips] = d;
        });
        
        // Draw the map
        const path = d3.geoPath();
        
        // Color scale
        const color = d3.scaleThreshold()
            .domain(d3.range(2.6, 75.1, (75.1 - 2.6) / 8))
            .range(d3.schemeBlues[9]);
        
        // Draw counties
        svg.append('g')
            .selectAll('path')
            .data(topojson.feature(countyData, countyData.objects.counties).features)
            .enter()
            .append('path')
            .attr('class', 'county')
            .attr('data-fips', d => d.id)
            .attr('data-education', d => educationByFips[d.id] ? educationByFips[d.id].bachelorsOrHigher : 0)
            .attr('fill', d => {
                const countyData = educationByFips[d.id];
                return countyData ? color(countyData.bachelorsOrHigher) : color(0);
            })
            .attr('d', path)
            .on('mouseover', function(event, d) {
                const county = educationByFips[d.id];
                if (county) {
                    tooltip.transition()
                        .duration(200)
                        .style('opacity', 0.9);
                    
                    tooltip.html(`${county.area_name}, ${county.state}: ${county.bachelorsOrHigher}%`)
                        .attr('data-education', county.bachelorsOrHigher)
                        .style('left', (event.pageX + 10) + 'px')
                        .style('top', (event.pageY - 28) + 'px');
                }
            })
            .on('mouseout', function() {
                tooltip.transition()
                    .duration(500)
                    .style('opacity', 0);
            });
        
        // Create legend
        const legendWidth = 300;
        const legendHeight = 30;
        const legendThreshold = d3.scaleThreshold()
            .domain(color.domain())
            .range(color.range());
        
        const legendX = d3.scaleLinear()
            .domain([0, 100])
            .range([0, legendWidth]);
        
        const legendAxis = d3.axisBottom(legendX)
            .tickSize(10)
            .tickValues(color.domain())
            .tickFormat(d => Math.round(d) + '%');
        
        const legendSvg = d3.select('#legend')
            .append('svg')
            .attr('width', legendWidth)
            .attr('height', legendHeight + 40);
        
        const legendG = legendSvg.append('g')
            .attr('transform', 'translate(0, 10)');
        
        legendG.selectAll('rect')
            .data(color.range().map(function(d) {
                const range = color.invertExtent(d);
                return {
                    color: d,
                    range: range
                };
            }))
            .enter()
            .append('rect')
            .attr('height', legendHeight)
            .attr('x', d => legendX(d.range[0]))
            .attr('width', d => legendX(d.range[1]) - legendX(d.range[0]))
            .attr('fill', d => d.color);
        
        legendG.append('g')
            .attr('transform', `translate(0, ${legendHeight})`)
            .call(legendAxis);
    });
});
