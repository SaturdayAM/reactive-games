import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'semantic-ui-css/semantic.min.css';
import { Provider } from 'react-redux';

import App from './App';
import configureStore from './redux_components/configureStore'
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();


ReactDOM.render(
	<Provider store={store}>
		<App /> 
	</Provider>,
	document.getElementById('root')
	);
registerServiceWorker();
