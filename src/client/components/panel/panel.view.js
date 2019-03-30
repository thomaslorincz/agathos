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
      this.selected.innerText = detail.properties['DBUID'];
      this.coordinates.innerText = detail.geometry;
    } else {
      this.selected.innerText = '';
      this.coordinates.innerText = '';
    }
  }
}
