export default { 
	cleanData,
	structureData
}

export function cleanData(rawResults) {
	return rawResults.reduce((cleanResults, rawResult) => {
		let newObject = {};
		for(let key in rawResult) {
			if (rawResult[key].datatype === 'http://www.w3.org/2001/XMLSchema#integer') {
				let parsed = parseInt(rawResult[key].value, 10);
				newObject[key] = parsed;
			} else newObject[key] = rawResult[key].value;
		}
		cleanResults.push(newObject)
		return cleanResults;	
	},[]); 
	
}

export function structureData(structuringResults) {
	return structuringResults.map(mainCategory => {
		console.log(mainCategory)
		let mainLabel = mainCategory['mainCatName']
		

		return {mainCategory : mainLabel,
				categoryName : mainCategory.categoryName,
				categoryAmount : mainCategory.categoryAmount
				}
	})
}