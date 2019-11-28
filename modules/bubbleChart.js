export default function createCircles(data) {
    // Default width and height
    const dataContainer = document.querySelector(".visualizationWrap")
    // returns the viewable width and height of an element in pixels, 
    // including padding, but not the border, scrollbar or margin.
    const width = dataContainer.clientWidth
    const height = dataContainer.clientHeight
    // Selecting every SVG element and assigning width and height
    const svg = d3.select('svg')
        .attr("width", width)
        .attr("height", height)

    // Boolean to check if categories are filtered or not.
    let filtered = true;    
    // Saves cleaned data
    let originalData = data;

    // Gives every main category an unique color
    const color = d3.scaleOrdinal(d3.schemeCategory20);

    // Render function made by tutorial of Curran Kelleher
    // https://www.youtube.com/watch?v=IyIAR65G-GQ
    function render(svg, data) {
        // Standard state is not filtered
        filtered = !filtered

        // Set standards
        const pack = data => d3.pack()
            .size([width, height])
            .padding(5)
            (d3.hierarchy({
                    children: data,
                    id: Math.random()
                })
                .sum(d => d.categoryAmount));

        const root = pack(data);

        // Variable for the tooltip
        let tooltip = d3.select('#circleWrap')
            .append('div')
            .attr('class', 'tooltip')
        
        // selects every g element and makes a data join of this
        // Also gives the elements a unique ID with the math.random() in the pack();
        const groups = svg.selectAll('g').data(root.leaves(), d => d.id);

        // creating groups for nesting
        const groupsEnter = groups.enter().append('g')
        groupsEnter
            .merge(groups)
            .attr('transform', d => `translate(${d.x + 1},${d.y + 1})`)
            // This code is for the tooltip when you hover a circle
            // Bron: http://bl.ocks.org/d3noob/a22c42db65eb00d4e369
            .on('mouseover', d => {
                tooltip.transition()		
                    .duration(350)	
                    .style('opacity', 1)
            })
            .on("mousemove", d => {
                tooltip
                    .html('<p class=tooltipTitle>Object aantal: </p>' + d.data.categoryAmount + "<br/>" + '<p class=tooltipTitle>Categorie naam: </p>' + d.data.categoryName)
                    .style("left", `${d3.event.pageX}px`)
                    .style("top", `${d3.event.pageY}px`)
            })
            .on('mouseleave', d => {
                tooltip
                    .style('opacity', 0)
            })



        // Creates the circles
        groupsEnter.append('circle')
            .merge(groups.select('circle'))
            .transition().duration(500)
            .attr('fill', d => color(d.data.mainCategory))
            .attr('r', d => d.r)
        
        // Creates the categoryAmount Text
        groupsEnter.append('text')
            .attr("dy", ".3em")
            .attr("font-family", "Montserrat")
            .style("text-anchor", "middle")
            .attr('font-size', '0')
            .attr('cursor', 'default')
            .merge(groups.select('text'))
            .transition().duration(500)
            .text(d => {
                return d.data.categoryAmount;
            })
            .attr("font-size", d => {
                return d.r / 2;
            })

        groups.exit().remove();

    }

    // Puts in all the unique mainCategory into a selection
    const mainCatSeletion = getMainCategoryNames(data);

    const mainCatContainter = d3.select('#catNav')

    // data join of the unique mainCategories
    const mainCatFilter = mainCatContainter.selectAll('text')
        .data(mainCatSeletion)

    mainCatFilter.enter().append('text')
        .style('color', d => {
            return color(d);
        })
        .attr('for', d => {
            return d;
        })
        .merge(mainCatFilter)
        .text(d => {
            return d;
        })
        // Object is the mainCategory where you will click on
        // in the filter.
        .on('click', function (object) {
            if (!filtered) {
                filterCategoryName(object)
            } else if (filtered) {
                render(svg, originalData)
            }
        })

    mainCatFilter.exit().remove();

    // Makes new array with all the mainCategoryNames
    function getMainCategoryNames(data) {
        let newMainCatNameArray = [];
        for (let key in data) {
            newMainCatNameArray.push(data[key].mainCategory);
        }
        // @stefan Gerrits gave me this link for filtering and get
        // all the unique values.
        // Bron: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
        let uniqueMainCatArray = newMainCatNameArray.filter((item, pos) => {
            // Looks if the index of the item has the same position and it will 
            // give a true other way it will put false and filters it out of the
            // array
            return newMainCatNameArray.indexOf(item) == pos;
        });
        return uniqueMainCatArray;
    }


    function filterCategoryName(d) {
        // Gets all the objects out of the array into a variable
        let allObjects = data.map(item => item);
        // filters all the objects on the mainCategory
        let filterData = allObjects.filter(item => {
            if (item.mainCategory === d) {
                // returns the objects that are linked to the clicked filter
                return item;
            }
        });
        // renders the filtered data when clicked on mainCategory in HTML
        render(svg, filterData)
    };

    // if refreshed it will render the first termmaster again "Asia"
    render(svg, originalData)

    return svg.node();
}