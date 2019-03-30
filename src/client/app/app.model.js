import Model from '../superclasses/model';

/**
 * Monolithic model that controls the data and state of Agathos
 */
export default class AppModel extends Model {
  // eslint-disable-next-line
  constructor() {
    super();
    this.selected = null;
  }

  /**
   * @param {Object} properties
   */
  updateSelected(properties) {
    const selected = properties['DBUID'];
    if (selected === this.selected) {
      document.dispatchEvent(new CustomEvent('selectionUpdated', {
        detail: {properties: null},
      }));
    } else {
      this.selected = selected;
      document.dispatchEvent(new CustomEvent('selectionUpdated', {
        detail: {properties: properties},
      }));
    }
  }
}
