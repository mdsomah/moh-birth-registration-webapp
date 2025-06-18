import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorsHandler } from "../errors/errorsHandler";

//? Private and Unprivate routes
import PrivateRoute from "../hocs/privateRoute";
import UnPrivateRoute from "../hocs/unPrivateRoute";

//? LandingPage Components imports
// const Home = React.lazy(() =>
//   import("../components/LandingPage/Pages/Home/Home")
// );
const NewRegistration = React.lazy(() =>
  import("../components/LandingPage/Pages/NewRegistration/NewRegistration")
);

//? 404 Error Component import
const Error404 = React.lazy(() => import("../components/404/Erorr404"));

//? routes
export const router = createBrowserRouter([
  {
    path: "/",
    index: true,
    element: (
      <UnPrivateRoute>
        <ErrorBoundary FallbackComponent={ErrorsHandler}>
          <NewRegistration />
        </ErrorBoundary>
      </UnPrivateRoute>
    ),
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
