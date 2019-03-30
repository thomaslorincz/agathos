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
        'id': 'simple-tiles',
        'type': 'raster',
        'source': {
          'type': 'raster',
          'tiles': ['https://tile.openweathermap.org/map/temp_new/{z}/{x}/{y}.png?appid=874718354841f0e0250b4b06a05a971e'],
          'tileSize': 256,
        },
        'minzoom': 0,
        'maxzoom': 22,
      });
    });
  }
}
