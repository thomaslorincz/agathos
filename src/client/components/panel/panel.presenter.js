import Presenter from '../../superclasses/presenter';

/**
 * A presenter that converts events from the PanelView into actions in the
 * AppModel
 */
export default class PanelPresenter extends Presenter {
  /**
   * @param {AppModel} model
   * @param {MapView} view
   */
  constructor(model, view) {
    super(model, view);

    document.addEventListener('selectionUpdated', (event) => {
      this.view.draw(event.detail.properties);
    });
  }
}
