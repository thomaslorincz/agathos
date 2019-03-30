import Presenter from '../superclasses/presenter';
import MapView from '../components/map/map.view';
import MapPresenter from '../components/map/map.presenter';

/**
 * A presenter that connects the AppModel and all Views
 */
export default class AppPresenter extends Presenter {
  /**
   * @param {AppModel} model
   * @param {View} view
   */
  constructor(model, view) {
    super(model, view);

    this.mapView = new MapView(document.getElementById('map'));
    new MapPresenter(this.mapView, this.model);
  }
}
