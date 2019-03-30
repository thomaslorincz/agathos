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
      zoom: 7,
    });

    this.map.on('load', () => {
      this.map.addLayer({
        id: 'albertaLayer',
        source: {
          type: 'vector',
          url: 'mapbox://thomaslorincz.b3vm5s7s'
        },
        'source-layer': 'alberta_dissemination_blocks-b1ubfe',
        type: 'fill',
        paint: {
          'fill-color': 'rgba(34,139,34,0.5)',
          'fill-outline-color': 'rgba(34,139,34,0.2)'
        },
      });

      this.map.addLayer({
        id: 'albertaLayerSelected',
        source: {
          type: 'vector',
          url: 'mapbox://thomaslorincz.b3vm5s7s'
        },
        'source-layer': 'alberta_dissemination_blocks-b1ubfe',
        type: 'line',
        feature_type: 'fill',
        paint: {
          'line-width': 6,
          'line-color': 'black'
        },
        filter: ['in', 'DBUID', ''],
      });

      this.map.on('click', 'albertaLayer', (e) => {
        const features = this.map.queryRenderedFeatures(
            [e.point.x,e.point.y],
            'albertaLayer'
        );
        if (features.length > 0) {
          let thisLayerFeatures = features.filter((d) => {
            return d.layer.id === 'albertaLayer';
          });
          const feature = thisLayerFeatures[0];
          this.map.setFilter(
              'albertaLayerSelected',
              ['in','DBUID', feature.properties['DBUID']]
          );
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
}
