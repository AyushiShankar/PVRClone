import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { DEBUG } from "../config/environment";
import movieReducer from "./movieSlice";

const rootReducer = combineReducers({
  movie: movieReducer,
});

const persistConfig = {
  key: "appStore",
  storage,
  whitelist: ["movie"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  devTools: DEBUG.DEV_TOOLS_ENABLED,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: process.env.REACT_APP_ENV === "prod",
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
export default store;
