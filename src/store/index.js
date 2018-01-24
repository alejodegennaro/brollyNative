import { createStore, applyMiddleware,combineReducers } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from '../reducers';


// const persistConfig = {
//   key: 'root',
//   storage: AsyncStorage ,
// }

// const persistedReducer = persistReducer(persistConfig, rootReducer)

const enhancer = applyMiddleware(
            thunkMiddleware,
            createLogger({ predicate: (getState, action) => __DEV__ })
          );


export default (initialState) => {
  // let store = createStore(persistedReducer,initialState,enhancer)
  // let persistor = persistStore(store)
  // return { store, persistor }
  let store = createStore(rootReducer,initialState,enhancer)
  return store
}