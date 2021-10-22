import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import rootReducer from "../reducers"; // giá trị trả về từ combineReducers

const middlewares = [thunk];
const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  blacklist: ["booking", "newsManagement"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: middlewares,
});

export const persistor = persistStore(store);
