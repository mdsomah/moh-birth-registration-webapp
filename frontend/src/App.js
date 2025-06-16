import * as React from "react";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

//? CSS and Fonts
import "./App.css";

//? Routes
import { router } from "./routes/routers";

const App = () => {
  return (
    <React.Fragment>
      <HelmetProvider>
        <RouterProvider router={router} />
      </HelmetProvider>
    </React.Fragment>
  );
};

export default App;
