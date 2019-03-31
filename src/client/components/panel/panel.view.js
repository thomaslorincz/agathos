import View from '../../superclasses/view';

/**
 * A view that represents a panel that displays selected feature data
 */
export default class PanelView extends View {
  /**
   * @param {HTMLElement} container
   */
  constructor(container) {
    super(container);
    this.selected = document.getElementById('selected');
    this.coordinates = document.getElementById('coordinates');
  }

  /**
   * @param {Object} detail
   */
  draw(detail) {
    if (detail) {
      console.log(detail);
      this.selected.innerText = `ID: ${detail.properties['DBUID']}`;
      const lon = detail.geometry[0];
      const lat = detail.geometry[1];
      this.coordinates.innerText = `Center:\nLon: ${lon}\nLat: ${lat}`;
    } else {
      this.selected.innerText = '';
      this.coordinates.innerText = '';
    }
  }
}
