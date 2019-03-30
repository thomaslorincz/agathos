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
      style: 'mapbox://styles/thomaslorincz/cjtvwqllq1crw1fntd99j4di3',
      center: [-113.323975, 53.631611],
      zoom: 4,
    });

    this.map.on('load', () => {
      this.map.addLayer({
        'id': 'albertaLayer',
        'source': {
          type: 'vector',
          url: 'mapbox://thomaslorincz.04sj5fyf',
        },
        'source-layer': 'adb',
        'type': 'fill',
        'paint': {
          'fill-color': 'rgba(34,139,34,0.5)',
          'fill-outline-color': 'rgba(34,139,34,0.2)',
        },
      });

      this.map.addLayer({
        'id': 'albertaLayerSelected',
        'source': {
          type: 'vector',
          url: 'mapbox://thomaslorincz.04sj5fyf',
        },
        'source-layer': 'adb',
        'type': 'line',
        'feature_type': 'fill',
        'paint': {
          'line-width': 6,
          'line-color': 'black',
        },
        'filter': ['in', 'DBUID', ''],
      });

      this.map.addLayer({
        'id': 'cellTowersLayer',
        'source': {
          type: 'vector',
          url: 'mapbox://thomaslorincz.9ph2tktu',
        },
        'source-layer': 'cell_towers',
        'type': 'circle',
        'paint': {
          'circle-radius': 4,
          'circle-color': [
            'match',
            ['get', 'radio'],
            'LTE', '#0000FF',
            'GSM', '#FFFF00',
            'UMTS', '#FF0000',
            'CDMA', '#FF00FF',
            '#FFFFFF',
          ],
          'circle-opacity': 0.5,
          'circle-stroke-color': '#000000',
          'circle-stroke-width': 1,
          'circle-stroke-opacity': 1,
        },
      });

      this.map.on('click', 'albertaLayer', (e) => {
        const features = this.map.queryRenderedFeatures(
            [e.point.x, e.point.y],
            'albertaLayer'
        );
        if (features.length > 0) {
          const thisLayerFeatures = features.filter((d) => {
            return d.layer.id === 'albertaLayer';
          });
          const feature = thisLayerFeatures[0];
          this.container.dispatchEvent(new CustomEvent('featureClicked', {
            detail: {properties: feature.properties},
          }));
        }
      });

      this.map.on('mouseenter', 'albertaLayer', () => {
        this.map.getCanvas().style.cursor = 'pointer';
      });

      this.map.on('mouseleave', 'albertaLayer', () => {
        this.map.getCanvas().style.cursor = '';
      });
    });
  }

  /**
   * @param {string} dbuid
   */
  updateSelected(dbuid) {
    this.map.setFilter('albertaLayerSelected', ['in', 'DBUID', dbuid]);
  }
}
