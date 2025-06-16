import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../slices/authSlice";
import messageReducer from "../slices/messageSlice";
import queryReducer from "../slices/querySlice";
import userReducer from "../slices/userSlice";

//? reducers
const reducers = combineReducers({
  auth: authReducer,
  message: messageReducer,
  query: queryReducer,
  user: userReducer,
});

//? persistConfig
const persistConfig = {
  key: "moh",
  storage: storage,
};

//? persistedReducer
const persistedReducer = persistReducer(persistConfig, reducers);

//? store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
  devTools: process.env.MODE !== "production",
});

//? persistor
export const persistor = persistStore(store);
