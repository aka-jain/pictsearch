import { createStore, applyMiddleware } from "redux";
import rootReducer from "../reducers/reducer";
import thunk from 'redux-thunk';

/* Using thunk let's us return functions as actions
 * from action creators instead of JSON objects.
 * This enables us to delay dispatching actions.
 */

const createStoreWithMiddleware = applyMiddleware(
  thunk
)(createStore);

export default function configureStore(initialState) {
	return createStoreWithMiddleware(rootReducer, initialState, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
}
