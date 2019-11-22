export default function createCircles(data) {
    // Set standards
    const width = '1800';
    const height = '800';
    const format = d3.format(',d');
    // Give each different category their own color
    var color = d3.scaleOrdinal(d3.schemeCategory20);
    
    const pack = data => d3.pack()
        .size([width - 2, height - 2])
        .padding(5)
        (d3.hierarchy({children: data})
            .sum(d => d.categoryAmount));

    const root = pack(data);
    // Select svg
    const svg = d3.selectAll('svg')
        .attr('viewBox', [0, 0, width, height])
        .append('g')
        .attr('class', 'circle__container');
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
        .attr('fill', 'white')
    // Make text invisible when the amount of the category is lower than 500
        .attr('display', d => {return d.data.categoryAmount <= 500 ? 'none' : 'flex';})
        .text(d => d.data.categoryName);
    // Add hover effect with data
    leaf.append('title')
        .text(d => `${d.data.categoryName}\n${format(d.data.categoryAmount)}\nCategorie: ${d.data.mainCategory}`);
        
    return svg.node();
}