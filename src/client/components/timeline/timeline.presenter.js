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
      this.model.updateDayOffset(event.detail.value);
    });

    document.addEventListener('dayUpdated', (event) => {
      this.view.draw(event.detail.value);
    });
  }
}
