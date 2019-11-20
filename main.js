import getData from './modules/getData.js'
import clean from './modules/cleaningFunctions.js'
//import bubbleChart from './modules/bubbleChart.js'

getData()
    .then((rawContinent) => clean.cleanData(rawContinent))
    .then((mainData)=> console.log(mainData))