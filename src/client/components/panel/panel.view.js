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
    this.temperature = document.getElementById('temperature');
  }

  /**
   * @param {Object} detail
   */
  draw(detail) {
    if (detail) {
      this.temperature.innerText =
          `Temp: ${Math.round(detail.temp * 10) / 10}°C`;
    } else {
      this.temperature.innerTExt = '';
    }
  }
}
