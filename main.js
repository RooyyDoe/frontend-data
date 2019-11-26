import getData from './modules/getData.js'
import clean from './modules/cleaningFunctions.js'
import bubbleChart from './modules/bubbleChart.js'

getData()
    // .then((mainData) => console.log('lol', mainData))
    .then((rawContinent) => clean.cleanData(rawContinent))
    // .then((mainData) => console.log('lol', mainData))
    .then((cleanedData) => clean.structureData(cleanedData))
    .then((mainData) => console.log('test', mainData))
    .then((mainData)=> bubbleChart(mainData))
    