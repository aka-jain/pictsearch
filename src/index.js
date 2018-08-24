import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.scss';
import routesConfig from './routeConfig';
import {renderRoutes} from 'react-router-config';
import configureStore from './store/store'

let initialState = {};
let store = configureStore(initialState);

render(
	<Provider store={store}>
		<Router basename="/">
				{renderRoutes(routesConfig)}
		</Router>
	</Provider>, document.getElementById('root')
);
