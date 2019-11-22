export default function createCircles(data) {
    // Set standards
    const width = '1000';
    const height = '1000';
    const format = d3.format(',d');
    // Give each different category their own color
    var color = d3.scaleOrdinal(d3.schemeCategory20);
    
    const pack = data => d3.pack()
        .size([width, height])
        (d3.hierarchy({children: data})
            .sum(d => d.categoryAmount));

    const root = pack(data);
    // Select svg
    const svg = d3.selectAll('.visualizationWrap')
        .append('svg')
        .attr('viewBox', [0, 0, width, height])
        .append('g')
        .attr('class', 'circle__container')
        .attr('transform', d => `translate(500)`);
    // Create parent element for the circles and text
    const leaf = svg.selectAll('g')
        .data(root.leaves())
        .enter()
        .append('g')
        .attr('transform', d => `translate(${d.x + 1},${d.y + 1})`);

    // Create bubbles
    leaf.append('circle')
        .attr('id', d => d.id)
        .attr('r', d => d.r)
        .attr('fill', 'white')
    // Assign colors
        .attr('fill', d => color(d.data.categoryName));
    leaf.append('text')
        .attr('x', 0)
        .attr('y', 0)
        .style("font-size", "2em")
        .attr("font-family",  "Montserrat")
        .style("text-anchor", "middle")
        .attr('fill', 'white')
    // Make text invisible when the amount of the category is lower than 500
        .attr('display', d => {return d.data.categoryAmount <= 500 ? 'none' : 'flex';})
        .text(d => d.data.categoryName);

    leaf.append("text")
        .attr("dy", "1.3em")
        .style("text-anchor", "middle")
        .attr('display', d => {return d.data.categoryAmount <= 500 ? 'none' : 'flex';})
        .text(function(d) {
            return d.data.categoryAmount;
        })
        .attr("font-family",  "Gill Sans", "Gill Sans MT")
        .attr("font-size", function(d){
            return d.r/5;
        })
        .attr("fill", "white");
    // Add hover effect with data
    leaf.append('title')
        .text(d => `${d.data.categoryName}\n${format(d.data.categoryAmount)}\nCategorie: ${d.data.mainCategory}`);
        
    return svg.node();
}