import View from '../../superclasses/view';
import mapboxgl from 'mapbox-gl';

/**
 * A view that represents an interactive map
 */
export default class MapView extends View {
  /**
   * @param {HTMLElement} container
   */
  constructor(container) {
    super(container);

    mapboxgl.accessToken = 'pk.eyJ1IjoidGhvbWFzbG9yaW5jeiIsImEiOiJjamx5aXVwaH' +
        'AxamZzM3dsaWdkZ3Q2eGJyIn0.mXjlp9c3l2-NBoS1uaEUdw';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/light-v9',
      center: [-113.323975, 53.631611],
      zoom: 4,
    });

    this.map.on('load', () => {
      this.map.addLayer({
        'id': 'albertaLayer',
        'type': 'fill',
        'source': {
          'type': 'geojson',
          'data': 'https://s3.amazonaws.com/propel-agathos/alberta_dissemination_blocks.geojson'
        },
        'paint': {
          'fill-color': 'rgba(200, 100, 240, 0.4)',
          'fill-outline-color': 'rgba(200, 100, 240, 1)'
        }
      });

      this.map.on('click', 'albertaLayer', (e) => {
        console.log(e);
      });
    });
  }
}
