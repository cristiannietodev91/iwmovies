import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { CookieStorage } from 'redux-persist-cookie-storage';
import { 
  persistCombineReducers, 
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import Cookies from 'cookies-js';
import counterReducer from '../features/counter/counterSlice';
import moviesReducer from '../features/movies/moviesSlice';

const reducers = {
  counter: counterReducer,
  movies: moviesReducer
}

const persistConfig = {
  key: 'root',
  version: 1,
  storage : new CookieStorage(Cookies,{}),
};

const persistedReducer = persistCombineReducers(persistConfig, reducers);

// Grab the state from a global variable injected into the server-generated HTML
const preloadedState = window.__PRELOADED_STATE__

console.log("Preload state",preloadedState);

// Allow the passed state to be garbage-collected
delete window.__PRELOADED_STATE__

const store = configureStore({
  reducer: persistedReducer,
  preloadedState,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export default store;
