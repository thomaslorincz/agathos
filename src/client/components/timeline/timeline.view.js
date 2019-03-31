import View from '../../superclasses/view';

/**
 * A view that represents a timeline slider
 */
export default class TimelineView extends View {
  /**
   * @param {HTMLElement} container
   */
  constructor(container) {
    super(container);
    this.slider = document.getElementById('range');

    this.slider.addEventListener('input', (event) => {
      this.container.dispatchEvent(new CustomEvent('rangeInputted', {
        detail: {value: event.target.valueAsNumber},
      }));
    });

    this.year = document.getElementById('currentYear');
  }

  /**
   * @param {number} year
   */
  draw(year) {
    this.year.innerText = year.toString();
  }
}
