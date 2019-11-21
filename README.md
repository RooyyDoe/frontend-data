# Frontend Data

In deze datavisualisatie wordt weergegeven wat de verdeling over de continenten is van het aantal voorwerpen binnen de categorieën: 1) Voeding, drank, genotmiddelen, 2) kleding en persoonlijke versiering en 3) lichaamsverzorging, geneeskunde, persoonlijke comfort. Deze categorieën kunnen samen het welzijn van de mens beschrijven en het is interessant om te zien of er verschillen zijn tussen de continenten en hoe de verdeling is over de subcategorieën.  

Eventuele verschillen zouden te maken kunnen hebben met factoren zoals het klimaat of de welvaart van het desbetreffende continent. Deze visualisatie wordt gedaan met behulp van een bubble chart, waarin alle  subcategorieën van een specifieke categorie en van een specifiek continent worden weergegeven in de goede verhoudingen. Met behulp van buttons kan gefilterd worden tussen de verschillende continenten en de drie categorieën. Op deze manier kunnen de continenten met elkaar worden vergeleken.

Het hele proces van het maken van deze applicatie wordt allemaal gedocumenteerd in de [wiki](https://github.com/RooyyDoe/frontend-data/wiki) van mijn repository.

## Screenshots

![Schets 1](https://user-images.githubusercontent.com/40355914/69226042-cc073d00-0b7f-11ea-9428-f5abe66ef070.png)

![filter_catgorie](https://user-images.githubusercontent.com/40355914/69228491-f529cc80-0b83-11ea-9d9e-10c17c965c90.png)

- [Frontend Data](#frontend-data)
  - [Screenshots](#screenshots)
  - [Opdracht](#opdracht)
  - [Interaction](#interaction)
  - [Installation](#installation)
    - [Usage](#usage)
    - [API](#api)
  - [Sources](#sources)
  - [Credits](#credits)
- [License](#license)

## Opdracht

Maak een datavisualisatie (met behulp van de d3-bibliotheek) op basis van gegeven gegevens waar gegevens kunnen worden onderzocht door interactie met enter, update en exit.

In dit project heb ik veel gewerkt met D3. Om mijn proces te zien kunt u klikken op de volgende [link](https://github.com/RooyyDoe/frontend-data/wiki/D3-code-breakdown)

## Interactions
- [ ] Gebruiker krijgt de mogelijkheid om te **hoveren** over de cirkels en deze word dan gehighlight door alle andere cirkels weg te duwen.
- [ ] Gebruiker krijgt de mogelijkheid om te **hoveren** over de cirkels en deze word dan gehighlight door als enige cirkel geen donkere transparantie laag eroverheen te hebben.
- [ ] Gebruiker krijgt de mogelijkheid om te **filteren** doormiddel van een continent te kiezen en welke categorie hierin gedisplayed moet worden.
- [ ] Gebruiker krijgt de mogelijkheid om te **vergelijkingen** te maken tussen verschillende categorieen met een hoofd doel.

## Installatie

**Kloon de repository van het project**
```
git clone https://github.com/RooyyDoe/frontend-data.git
```

### Usage

**Voer de code uit**
```
Run the index.html into your browser
```

**Demo** is beschikbaar op: **still loading..**

### API

Met deze API kunt u gegevens van verschillende historische gebeurtenissen verkrijgen. Dit kunnen bijvoorbeeld historische objecten of foto's van over de hele wereld zijn. We hebben allemaal een individueel eindpunt verkregen om bepaalde gegevens uit deze database af te trekken.

Ik heb gebruik gemaakt van de deze API:

* [GVN](https://data.netwerkdigitaalerfgoed.nl/)

<details>

Dit is de query die ik ga gebruiken om mijn data uit de database te krijgen. Hiermee haal ik een bepaalde categorie op en kijk hoeveel er van deze categorie uit een bepaald continent komt. Ik wil dit doen in sub-categorieen zodat ik meer data kan laten zien. In mijn [wiki](https://github.com/RooyyDoe/frontend-data/wiki) leg ik alles uit over het concept wat hierachter zit.

```

PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX dct: <http://purl.org/dc/terms/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
PREFIX edm: <http://www.europeana.eu/schemas/edm/>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>

SELECT (SAMPLE(?mainCatName)) ?categoryName (COUNT(?category) AS ?categoryAmount) WHERE {
  
       <https://hdl.handle.net/20.500.11840/termmaster8401> skos:narrower* ?continent .
  	   ?obj dct:spatial ?continent .
  
	   <https://hdl.handle.net/20.500.11840/termmaster2704> skos:* ?mainCat .
       ?mainCat skos:narrower ?category .
       ?mainCat skos:prefLabel ?mainCatName .
       ?obj edm:isRelatedTo ?category .
  	   ?category skos:prefLabel ?categoryName .
  	   
} GROUP BY ?categoryName


```

<img width="1333" alt="Schermafdruk 2019-11-21 17 48 28" src="https://user-images.githubusercontent.com/40355914/69358532-4b336880-0c87-11ea-8cc9-df450a04cbf9.png">

</details>

## Sources
* [Mozilla Developer Network](https://developer.mozilla.org/en-US/) - I mostly used this site to obtain my sources
* [D3](https://d3js.org/) - This source I will mostly use for d3 related problems
* [D3 In Depth](https://www.d3indepth.com/) - This source goes deeper into the D3 possibilities
* [Remaining Sources](https://github.com/RooyyDoe/functional-programming/wiki/Remaining-Sources) - My remaining sources can be found at this page and I will also add the real sources and not global ones.

## Credits

* [Help from Thijs Spijker](https://github.com/iSirThijs) - 
* [Help from Wessel Smit](https://github.com/WesselSmit) — 
* [Help from Stefan Gerrits](https://github.com/StefanGerrits2) — 
* [Help from Sjors Eveleens](https://github.com/Choerd) - 

# License

More information over [License](https://help.github.com/en/articles/licensing-a-repository)

[MIT](https://github.com/RooyyDoe/frontend-data/blob/master/LICENSE.txt) © [Roy Kuijper](https://github.com/RooyyDoe)
