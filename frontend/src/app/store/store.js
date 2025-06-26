import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../slices/authSlice";
import messageReducer from "../slices/messageSlice";
import newRegistrationReducer from "../slices/newRegistrationSlice";
import queryReducer from "../slices/querySlice";
import userReducer from "../slices/userSlice";
import nirAPIsTokenReducer from "../slices/nirAPIsTokenSlice";

//? reducers
const reducers = combineReducers({
  auth: authReducer,
  message: messageReducer,
  queryApplicant: queryReducer,
  newRegistration: newRegistrationReducer,
  user: userReducer,
  nirAPIs: nirAPIsTokenReducer,
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
