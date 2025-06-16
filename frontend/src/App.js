import * as React from "react";
import { RouterProvider } from "react-router-dom";

//? CSS and Fonts
import "./App.css";

//? Routes
import { router } from "./routes/routers";

const App = () => {
  return (
    <React.Fragment>
      <RouterProvider router={router} />
    </React.Fragment>
  );
};

export default App;
