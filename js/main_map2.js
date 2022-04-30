mapboxgl.accessToken =
    'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
let map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/navigation-night-v1',
    zoom: 4.40, // starting zoom
    center: [-96, 39], // starting center
    projection: 'albers'
});

const grades = [30000, 50000, 100000],
    colors = ['rgb(208,209,230)', 'rgb(103,169,207)', 'rgb(1,108,89)'],
    radii = [5, 15, 20];

//load data to the map as new layers.
map.on('load', () => { //simplifying the function statement: arrow with brackets to define a function

    // when loading a geojson, there are two steps
    // add a source of the data and then add the layer out of the source
    map.addSource('us-covid-2020-counts', {
        type: 'geojson',
        data: 'assets/us-covid-2020-counts.geojson'
    });

    map.addLayer({
            'id': 'us-covid-2020-counts-layer',
            'type': 'circle',
            'source': 'us-covid-2020-counts',
            'minzoom': 4.35,
            'paint': {
                'circle-radius': {
                    'property': 'cases',
                    'stops': [
                        [{
                            zoom: 5,
                            value: grades[0]
                        }, radii[0]],
                        [{
                            zoom: 5,
                            value: grades[1]
                        }, radii[1]],
                        [{
                            zoom: 5,
                            value: grades[2]
                        }, radii[2]]
                    ]
                },
                'circle-color': {
                    'property': 'cases',
                    'stops': [
                        [grades[0], colors[0]],
                        [grades[1], colors[1]],
                        [grades[2], colors[2]]
                    ]
                },
                'circle-stroke-color': 'white',
                'circle-stroke-width': 1,
                'circle-opacity': 0.6
            }
        },
        'waterway-label'
    );


    // click on tree to view cases in a popup
    map.on('click', 'us-covid-2020-counts-layer', (event) => {
        new mapboxgl.Popup()
            .setLngLat(event.features[0].geometry.coordinates)
            .setHTML(`<strong>State:</strong> ${event.features[0].properties.state} <br><strong>County:</strong> ${event.features[0].properties.county}</br> <strong>Cases:</strong> ${event.features[0].properties.cases}</br> <strong>Deaths:</strong> ${event.features[0].properties.deaths}`)
            .addTo(map);
    });
});


// create legend
const legend = document.getElementById('legend');

//set up legend grades and labels
var labels = ['<strong>Cases</strong>'],
    vbreak;
//iterate through grades and create a scaled circle and label for each
for (var i = 0; i < grades.length; i++) {
    vbreak = grades[i];
    // you need to manually adjust the radius of each dot on the legend 
    // in order to make sure the legend can be properly referred to the dot on the map.
    dot_radii = 2 * radii[i];
    labels.push(
        '<p class="break"><i class="dot" style="background:' + colors[i] + '; width: ' + dot_radii +
        'px; height: ' +
        dot_radii + 'px; "></i> <span class="dot-label" style="top: ' + dot_radii / 2 + 'px;">' + vbreak +
        '</span></p>');

}
// add the data source
const description = '<p style="text-align: right; font-size:10pt">Areas with cases below 30,000, equal 30,000, but less then 50,000 will be small purple circles. Areas greater than 50,000, but less then 100,000 will have medium blue bubbles. Areas with cases greater than 100,000 will have big green bubble. </p>'

const source =
    '<p style="text-align: right; font-size:10pt">Source: <a href="https://github.com/nytimes/covid-19-data/blob/43d32dde2f87bd4dafbb7d23f5d9e878124018b8/live/us-counties.csv">New York Times</a></p>';

const users = '<p style="text-align: right; font-size:10pt">Users: Analysts, Trend-seekers, news-outlets, etc. </p>'
// combine all the html codes.
legend.innerHTML = labels.join('') + description + source + users;