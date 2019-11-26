const url = 'https://api.data.netwerkdigitaalerfgoed.nl/datasets/ivo/NMVW/services/NMVW-33/sparql';

const query = `
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>

SELECT ?mainCatName ?categoryName (COUNT(?category) AS ?categoryAmount) WHERE {
  
       <https://hdl.handle.net/20.500.11840/termmaster8401> skos:narrower* ?continent .
  	   ?obj dct:spatial ?continent .
  
	   <https://hdl.handle.net/20.500.11840/termmaster2802> skos:narrower ?mainCat .
       ?mainCat skos:narrower ?category .
       ?mainCat skos:prefLabel ?mainCatName .
       VALUES ?mainCatName {"voeding, drank, genotmiddelen" "lichaamsverzorging, geneeskunde, persoonlijk comfort" "kleding en persoonlijke versiering" }
       ?obj edm:isRelatedTo ?category .
  	   ?category skos:prefLabel ?categoryName .
}

`;

export default async function getData(){
	const response = await fetch(url+'?query='+ encodeURIComponent(query) +'&format=json');
	const json = await response.json();
	return json.results.bindings;
}	