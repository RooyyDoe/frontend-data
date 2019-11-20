export default { 
    cleanData
}

export function cleanData(rawResults) {
	return rawResults.reduce((cleanResults, rawResult) => {
		for(let key in rawResult) {
			if (rawResult[key].datatype === 'http://www.w3.org/2001/XMLSchema#integer') {
				let parsed = parseInt(rawResult[key].value, 10);
				cleanResults.push(parsed);
			} else cleanResults.push(rawResult[key].value);
		}
		return cleanResults;	
	},[]); 
	
}