export default function createCircles(data) {
    const width = '1000';
    const height = '1000';
    // Select the SVG element
    const svg = d3.selectAll('svg')
        .attr('viewBox', [0, 0, width, height])
        .attr('class', 'circle__container')
        .attr('transform', d => `translate(50)`);
    // Gives every category an unique color
    const color = d3.scaleOrdinal(d3.schemeCategory20);

    function render(svg, data) {
        // Set standards
        const pack = data => d3.pack()
            .size([width, height - 50])
            .padding(5)
        (d3.hierarchy({
                children: data
            })
            .sum(d => d.categoryAmount));

        const root = pack(data);

        const bubbles = svg.selectAll('circle').data(root.leaves());
        // console.log(bubbles)

        // Creates the bubbles
        bubbles
            .enter()
            .append('circle')
            .attr('transform', d => `translate(${d.x + 1},${d.y + 1})`)
            .attr('r', 0)

            .merge(bubbles)
            .transition().duration(700)
            .attr('r', d => d.r)
            .attr('fill', d => color(d.data.categoryName))

        bubbles
            .exit().remove()
    }

    // Makes new array with all the categoryNames
    function getCategoryNames(data) {
        let newMainCatNameArray = [];
        for (let key in data) {
            newMainCatNameArray.push(data[key].mainCategory);
        }
        // Bron: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
        let uniqueMainCatArray = newMainCatNameArray.filter((item, pos) => {
            return newMainCatNameArray.indexOf(item) == pos;
        });
        return uniqueMainCatArray;
    }



    const categorySeletion = getCategoryNames(data);

    const categoryContainter = d3.select('form')
        .append('g')
        .attr('class', 'category_container');

    const categoryDropDown = categoryContainter.selectAll('category_container')
        .data(categorySeletion)
        .enter()
        .append('g');

    categoryDropDown.append('text')
        .style('color', d => {
            return color(d);
        })
        .attr('for', d => {
            return d;
        })
        .text(d => {
            return d;
        })
        .on('click', filterCategoryName)
        

    function filterCategoryName(d) {
        // console.log(mappedData)
        let allObjects = data.map(item => item);
        let filterData = allObjects.filter(item => {
            if (item.mainCategory === d) {
                return item;
            } else {
                render(svg, data)
            }
        });
        render(svg, filterData)
    };

    console.log()
    render(svg, data);

    return svg.node();
}