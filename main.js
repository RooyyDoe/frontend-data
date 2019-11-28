import getData from './modules/getData.js'
import clean from './modules/cleaningFunctions.js'
import bubbleChart from './modules/bubbleChart.js'

// Set active main Continent as default
let mainContinent = 8401;

// Run main function
reloadContinent(mainContinent);

function reloadContinent (mainContinent) {
    console.log("TCL: reloadContinent -> mainContinent", mainContinent)
    getData(mainContinent)
        // .then((mainData) => console.log('lol', mainData))
        .then((rawContinent) => clean.cleanData(rawContinent))
        // .then((mainData) => console.log('lol', mainData))
        .then((cleanedData) => clean.structureData(cleanedData))
        // .then((mainData) => console.log('test', mainData))
        .then((mainData)=> bubbleChart(mainData))
}

// Selects all buttons and when clicked on a buttons adds the value to mainContinent
// Bron: https://stackoverflow.com/questions/52008722/document-queryselector-to-select-different-buttons
document.querySelectorAll('.continentButtons button').forEach(button => {
    button.addEventListener('click', () => {
        reloadContinent(button.value);
    });
});