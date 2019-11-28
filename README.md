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
  - [Interacties](#interacties)
  - [Installatie](#installatie)
    - [Gebruik](#gebruik)
    - [API](#api)
  - [Bronnen](#bronnen)
  - [Erkenning](#erkenning)
- [Licentie](#licentie)

## Opdracht

Maak een datavisualisatie (met behulp van de d3-bibliotheek) op basis van gegeven gegevens waar gegevens kunnen worden onderzocht door interactie met enter, update en exit.

In dit project heb ik veel gewerkt met D3. Om mijn proces te zien kunt u klikken op de volgende [link](https://github.com/RooyyDoe/frontend-data/wiki/D3-code-breakdown)

## Interacties
- [ ] Gebruiker krijgt de mogelijkheid om te **hoveren** over de cirkels en deze word dan gehighlight door alle andere cirkels weg te duwen.
- [x] Gebruiker krijgt de mogelijkheid om te **hoveren** over de cirkels en dan komt er een tooltip naar voren om extra informatie te geven over de cirkel.
- [x] Gebruiker krijgt de mogelijkheid om te **filteren** doormiddel van een continent te kiezen en welke categorie hierin gedisplayed moet worden.
- [x] Gebruiker krijgt de mogelijkheid om te **vergelijkingen** te maken tussen verschillende categorieen met een hoofd doel.

## Installatie

**Kloon de repository van het project**
```
git clone https://github.com/RooyyDoe/frontend-data.git
```

### Gebruik

**Voer de code uit**
```
Run the index.html into your browser
```

**Demo** is beschikbaar op: https://rooyydoe.github.io/frontend-data/

### API

Met deze API kunt u gegevens van verschillende historische gebeurtenissen verkrijgen. Dit kunnen bijvoorbeeld historische objecten of foto's van over de hele wereld zijn. We hebben allemaal een individueel eindpunt verkregen om bepaalde gegevens uit deze database af te trekken.

Ik heb gebruik gemaakt van de deze API:

* [GVN](https://data.netwerkdigitaalerfgoed.nl/)

<details>

Als concept wil ik de object aantallen uit verschillende categorieën halen en deze moeten kunnen worden geselecteerd op de verschillende continenten die er zijn. In mijn query maak ik gebruik van de termmasters van de verschillende continenten. In de database zitten acht continenten met hierin verschillende objecten. Drie van deze continenten zijn groot in de minderheid als het aankomt op aantal objecten deze wil ik dan automatisch buiten mijn concept gooien. Naast de continenten heb ik drie hoofd categorieën geselecteerd en hiervan de sub-categorieën gebruikt in mijn query. In mijn [wiki](https://github.com/RooyyDoe/frontend-data/wiki) leg ik alles uit over het concept wat hierachter zit.


```javascript

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


Resultaat:

<img width="1331" alt="Schermafdruk 2019-11-24 14 13 32" src="https://user-images.githubusercontent.com/40355914/69495208-a1411f80-0ec4-11ea-8a64-8cdec7f93ac3.png">

</details>

## Bronnen
* [Mozilla Developer Network](https://developer.mozilla.org/en-US/) - Ik heb deze website voornamelijk gebruikt als ik niet wist met javascript
* [D3](https://d3js.org/) - Deze bron heb ik meestal gebruikt voor d3-gerelateerde problemen
* [D3 In Depth](https://www.d3indepth.com/) - Deze bron gaat dieper in op de D3-mogelijkheden
* [Remaining Sources](https://github.com/RooyyDoe/frontend-data/wiki/Overige-bronnen) - Mijn overige bronnen zijn te vinden op deze pagina.


## Erkenning

* [Hulp van Thijs Spijker](https://github.com/iSirThijs)
* [Hulp van Wessel Smit](https://github.com/WesselSmit)
* [Hulp van Stefan Gerrits](https://github.com/StefanGerrits2) 
* [Hulp van Sjors Eveleens](https://github.com/Choerd)

# Licentie

Meer informatie over [License](https://help.github.com/en/articles/licensing-a-repository)

[MIT](https://github.com/RooyyDoe/frontend-data/blob/master/LICENSE.txt) © [Roy Kuijper](https://github.com/RooyyDoe)
