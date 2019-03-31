import Model from '../superclasses/model';

/**
 * Monolithic model that controls the data and state of Agathos
 */
export default class AppModel extends Model {
  // eslint-disable-next-line
  constructor() {
    super();
    this.selected = null;
    this.currentDayOffset = 0;
  }

  /**
   * @param {Object} detail
   */
  updateSelected(detail) {
    window.fetch(`https://2b027d5c.ngrok.io/${detail.geometry[0]}/${detail.geometry[1]}/${detail.properties['DBUID']}/${Math.round((new Date()).getTime() / 1000) + (this.currentDayOffset * 86400)}/`, {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'application/json',
      },
    }) // Call the fetch function passing the url of the API as a parameter
        .then((response) => {
          console.log(response);
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
        })
        .catch((error) => {
          console.log(error);
        });
  }

  /**
   * @param {number} dayOffset
   */
  updateDayOffset(dayOffset) {
    this.currentDayOffset = dayOffset;
    document.dispatchEvent(new CustomEvent('dayUpdated', {
      detail: {value: this.currentDayOffset},
    }));
  }
}
