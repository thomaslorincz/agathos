import Presenter from '../../superclasses/presenter';

/**
 * A presenter that converts events from the MapView into actions in the
 * AppModel
 */
export default class MapPresenter extends Presenter {
  /**
   * @param {AppModel} model
   * @param {MapView} view
   */
  constructor(model, view) {
    super(model, view);

    this.view.container.addEventListener('featureClicked', (event) => {
      this.model.updateSelected(event.detail.properties);
    });

    document.addEventListener('selectionUpdated', (event) => {
      if (event.detail.properties) {
        this.view.updateSelected(event.detail.properties['DBUID']);
      } else {
        this.view.updateSelected('');
      }
    });
  }
}
