import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorsHandler } from "../errors/errorsHandler";

//? Private and Unprivate routes
import PrivateRoute from "../hocs/privateRoute";
import UnPrivateRoute from "../hocs/unPrivateRoute";

//? Protected Registration routes
import ProtectedRegistration from "../hocs/protectedRegistration";

//? LandingPage Components imports
const Home = React.lazy(() =>
  import("../components/LandingPage/Pages/Home/Home")
);
const ValidateNewApplicant = React.lazy(() =>
  import(
    "../components/LandingPage/Pages/ValidateNewApplicant/ValidateNewApplicant"
  )
);
const NewRegistration = React.lazy(() =>
  import("../components/LandingPage/Pages/NewRegistration/NewRegistration")
);
const Signin = React.lazy(() =>
  import("../components/LandingPage/Pages/Signin/Signin")
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
          <Home />
        </ErrorBoundary>
      </UnPrivateRoute>
    ),
  },
  {
    path: "/validate-new-applicant",
    index: true,
    element: (
      <UnPrivateRoute>
        <ErrorBoundary FallbackComponent={ErrorsHandler}>
          <ValidateNewApplicant />
        </ErrorBoundary>
      </UnPrivateRoute>
    ),
  },
  {
    path: "/register-new-applicant",
    index: true,
    element: (
      <ProtectedRegistration>
        <ErrorBoundary FallbackComponent={ErrorsHandler}>
          <NewRegistration />
        </ErrorBoundary>
      </ProtectedRegistration>
    ),
  },
  {
    path: "/sign-in",
    index: true,
    element: (
      <UnPrivateRoute>
        <ErrorBoundary FallbackComponent={ErrorsHandler}>
          <Signin />
        </ErrorBoundary>
      </UnPrivateRoute>
    ),
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
