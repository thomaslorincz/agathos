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

    this.offset = document.getElementById('offset');
  }

  /**
   * @param {number} dayOffset
   */
  draw(dayOffset) {
    if (dayOffset === 0) {
      this.offset.innerText = '';
    } else if (dayOffset > 0) {
      this.offset.innerText = ' +' + dayOffset.toString() + ' days';
    } else {
      this.offset.innerText = ' ' + dayOffset.toString() + ' days';
    }
  }
}
