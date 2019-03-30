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
  }

  /**
   * @param {Object} properties
   */
  draw(properties) {
    if (properties) {
      document.getElementById('selected').innerText = properties['DBUID'];
    } else {
      document.getElementById('selected').innerText = '';
    }
  }
}
