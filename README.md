# Zulkifli Sales | GEOG 458 | Bo Zhao 

## Project Name: Thematic maps of COVID-19 Cases and Rates

## Brief Introduction:
For Lab 3 of Geog 458, we were tasked to make a chorpleth map of COVID-19 Rates in the USA and a proportional symbols map of COVID-19 Cases. The **Choropleth map** is shown in *Map 1* and the **proportional symbols map** is shown in *Map 2*. Through our map creation fo COVID rates and cases, I was able to analyze the common trends between these two variables throughout the USA, and create distinct legends that accommodate for each column's entries. 


[Map 1: COVID-19 Rates Synchronized](https://notzulkifli.github.io/thematic_covid_2020_cases_rates/map1.html)
![Covid Rates](img/U.S.%20COVID%20Rates.PNG)

### COVID Rates Analysis:
I noticed the COVID rates were more dense in the eastern side of the United States, but the rates were much more higher towards the middle of the United States (Dark shade of Blue). The western side of the United states rates were more closer to the 40-60 rates whereas the middle and eastern United States are more towards the 70-100+ range in rates. 



[Map 2: COVID-19 Cases Synchronized](https://notzulkifli.github.io/thematic_covid_2020_cases_rates/map2.html)
![Covid Cases](img/U.S.%20COVID%20Cases.PNG)

### COVID Cases Analysis:
I noticed the COVID cases map is very similar to the COVID rates map in which many points are dense around the eastern side of and less present around the western side. But, we can see the counts of cases are closer or below 30000. The points counts in between 30000-50000 are also represented by small points. THe middle blue points vary from location to location but seem to be in more popular parts of the world such as California, Florida, and New England. The Green bigger points are most present in the western side of the United states with points around 100000 cases or higher. 

### Primary Functionns:
- Java Script Language (script)
- HTML (div, body, head)
- CSS (Style)
- Mapshaper (to convert CSV to Geojson)
- GetElementByID
- map.on
- map.addsource
- legend.innerHTML
- mapboxgl.jss
- mapboxgl.css

### Data Source and Credit
- [New York Times](https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv)
- [United States Census Bureau](https://data.census.gov/cedsci/table?g=0100000US%24050000&d=ACS%205-Year%20Estimates%20Data%20Profiles&tid=ACSDP5Y2018.DP05&hidePreview=true)
- [Professor Bo Zhao (Creation of lab)](https://github.com/jakobzhao)
- [Steven Bao (Processing Data)](https://github.com/jakobzhao/geog458)
