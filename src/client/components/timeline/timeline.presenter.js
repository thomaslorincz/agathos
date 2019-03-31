import Presenter from '../../superclasses/presenter';

/**
 * A presenter that connects the AppModel and the TimelineView
 */
export default class TimelinePresenter extends Presenter {
  /**
   * @param {AppModel} model
   * @param {TimelineView} view
   */
  constructor(model, view) {
    super(model, view);

    this.view.container.addEventListener('rangeInputted', (event) => {
      this.model.updateYear(event.detail.value);
    });

    document.addEventListener('yearUpdated', (event) => {
      this.view.draw(event.detail.value);
    });
  }
}
