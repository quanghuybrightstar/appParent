import { createStore, applyMiddleware, compose } from 'redux';
import reducers from '../reducers/rootReducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import { persistStore, persistReducer } from 'redux-persist';
import ReduxPersist from '../../config/ReduxPersist';
import Thunk from 'redux-thunk';
const persistedReducer = persistReducer(ReduxPersist.storeConfig, reducers);
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    persistedReducer,
    composeEnhancer(applyMiddleware(Thunk)),
    // composeWithDevTools()
);
const persistor = persistStore(store)
export { store, persistor };