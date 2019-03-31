import Model from '../superclasses/model';

/**
 * Monolithic model that controls the data and state of Agathos
 */
export default class AppModel extends Model {
  // eslint-disable-next-line
  constructor() {
    super();
    this.selected = null;
    this.currentYear = 2017;
  }

  /**
   * @param {Object} detail
   */
  updateSelected(detail) {
    const selected = detail.properties['DBUID'];
    if (selected === this.selected) {
      document.dispatchEvent(new CustomEvent('selectionUpdated', {
        detail: {properties: null},
      }));
    } else {
      this.selected = selected;
      document.dispatchEvent(new CustomEvent('selectionUpdated', {
        detail: detail,
      }));
    }
  }

  /**
   * @param {number} year
   */
  updateYear(year) {
    this.currentYear = year;
    document.dispatchEvent(new CustomEvent('yearUpdated', {
      detail: {value: this.currentYear},
    }));
  }
}
