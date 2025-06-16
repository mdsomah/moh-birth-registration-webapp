import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { store, persistor } from "./app/store/store";

//? React Loader
import Loader from "./components/Loader/Loader";

//? CSS and Fonts
import "./index.css";

import App from "./App";
// const App = React.lazy(() => import("./App"));

//? Query Client Config
const queryClientConfig = {
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: 1000 * 30, // 30seconds
      cacheTime: 1000 * 30, //30 seconds
      refetchOnMount: "always",
      refetchOnWindowFocus: "always",
      refetchOnReconnect: "always",
      refetchInterval: 1000 * 30, //30 seconds
      refetchIntervalInBackground: false,
      suspense: false,
    },
    mutations: {
      retry: 2,
    },
  },
};

//? Query Client
const queryClient = new QueryClient(queryClientConfig);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Suspense fallback={<Loader />}>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  </Suspense>
);
