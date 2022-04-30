mapboxgl.accessToken =
    'pk.eyJ1IjoiamFrb2J6aGFvIiwiYSI6ImNpcms2YWsyMzAwMmtmbG5icTFxZ3ZkdncifQ.P9MBej1xacybKcDN_jehvw';
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/light-v10', // style URL
    zoom: 4.23, // starting zoom
    center: [-100.8, 38], // starting center
    projection: 'albers'
});

// load data and add as layer
async function geojsonFetch() {
    let response = await fetch('assets/us-covid-2020-rates.geojson');
    let covid_rates = await response.json();

    map.on('load', function loadingData() {
        map.addSource('covid_rates', {
            type: 'geojson',
            data: covid_rates
        });

        map.addLayer({
            'id': 'covid_rates-layer',
            'type': 'fill',
            'source': 'covid_rates',
            'paint': {
                'fill-color': [
                    'step',
                    ['get', 'rates'],
                    '#e8ffff', // stop_output_0
                    40.01, // stop_input_0
                    '#d9f1ff', // stop_output_1
                    50.01, // stop_input_1
                    '#bfe6ff', // stop_output_2
                    60.01, // stop_input_2
                    '#8cd3ff', // stop_output_3
                    70.01, // stop_input_3
                    '#59bfff', // stop_output_4
                    80.01, // stop_input_4
                    '#26abff', // stop_output_5
                    90.01, // stop_input_5
                    '#0da2ff', // stop_output_6
                    100.01, // stop_input_6
                    "#009dff" // stop_output_7
                ],
                'fill-outline-color': '#BBBBBB',
                'fill-opacity': 0.7,
            }
        });

        const layers = [
            '0-40.00',
            '40.01-50.00',
            '50.01-60.00',
            '60.01-70.00',
            '70.01-80.00',
            '80.01-90.00',
            '90.01-100.00',
            '100.01 and more'
        ];
        const colors = [
            '#e8ffff',
            '#d9f1ff',
            '#bfe6ff',
            '#8cd3ff',
            '#59bfff',
            '#26abff',
            '#0da2ff',
            '#009dff'
        ];

        // create legend
        const legend = document.getElementById('legend');
        legend.innerHTML = "<b>COVID-19 Rates<br>(by County)</b><br><br>";

        layers.forEach((layer, i) => {
            const color = colors[i];
            const item = document.createElement('div');
            const key = document.createElement('span');
            key.className = 'legend-key';
            key.style.backgroundColor = color;

            const value = document.createElement('span');
            value.innerHTML = `${layer}`;
            item.appendChild(key);
            item.appendChild(value);
            legend.appendChild(item);
        });
    });

    map.on('mousemove', ({
        point
    }) => {
        const rates = map.queryRenderedFeatures(point, {
            layers: ['covid_rates-layer']
        });
        document.getElementById('text-escription').innerHTML = rates.length ?
            `<h3>${rates[0].properties.state}</h3><p><strong><em>County: ${rates[0].properties.county}</strong> <p>Rate: ${rates[0].properties.rates}</em></p>` :
            `<p>This interactive map highlights COVID-19 rates within each county of each state.</p><p>Hover over a county in a state!</p>`;
    });
}

geojsonFetch();