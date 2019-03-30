import AppModel from './app/app.model';
import AppPresenter from './app/app.presenter';
import './style.css';

// Needed for Hot Module Replacement
if (typeof(module.hot) !== 'undefined') module.hot.accept();

// Initiate the app
new AppPresenter(new AppModel(), null);
