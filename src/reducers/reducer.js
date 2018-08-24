import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { homeReducer } from './homeReducer';
import { usersReducer } from './usersReducer';
import { loaderReducer } from './loaderReducer';
const rootReducer = combineReducers({
	homeReducer,
	usersReducer,
	loaderReducer,
	routing: routerReducer 
});

export default rootReducer;
