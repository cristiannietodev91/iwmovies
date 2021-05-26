import path from "path";
import fs from "fs";
import { getStoredState, persistCombineReducers ,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { CookieStorage, NodeCookiesWrapper } from 'redux-persist-cookie-storage';
import Cookies from 'cookies';
import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import App from "../src/App";
import counterReducer from '../src/features/counter/counterSlice';
import moviesReducer from '../src/features/movies/moviesSlice';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'
import autoMergeLevel1 from 'redux-persist/lib/stateReconciler/autoMergeLevel1'

import { StaticRouter } from 'react-router-dom';

const PORT = process.env.PORT || 3006;
const app = express();


app.use(Cookies.express())


app.get("/", async (req, res) => {
  const cookieJar = new NodeCookiesWrapper(new Cookies(req, res));
  const context = {};
  const reducers = {
    counter: counterReducer,
    movies: moviesReducer
  }

  const sheet = new ServerStyleSheet()

  const persistConfig = {
    key: 'root',
    version: 1,
    storage : new CookieStorage(cookieJar,{}),
    stateReconciler: autoMergeLevel1
  };

  let preloadedState;
  try {
      preloadedState = await getStoredState(persistConfig);
      console.log("Preload state", preloadedState);
  } catch (e) {
      preloadedState = {};
  }

  const persistedReducer = persistCombineReducers(persistConfig, reducers);

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

  const html = renderToString(
    <StaticRouter location={req.url} context={context}>
      <Provider store={store}>
          <StyleSheetManager sheet={sheet.instance}>
            <App />
          </StyleSheetManager>
      </Provider>
    </StaticRouter>
  );

  const styleTags = sheet.getStyleTags()

  const indexFile = path.resolve("./build/index.html");
  fs.readFile(indexFile, "utf8", (err, data) => {
    if (err) {
      console.error("Something went wrong:", err);
      return res.status(500).send("Oops, better luck next time!");
    }
    data = data.replace('<style></style>',styleTags);
    data = data.replace(
      '<div id="root"></div>',
      `<div id="root">${html}</div>
      <script>
      window.__PRELOADED_STATE__ = ${preloadedState && JSON.stringify(preloadedState).replace(
        /</g,
        "\\u003c"
      )}
    </script>`
    )
    return res.send(data);
  });
});

app.use(express.static("./build"));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
