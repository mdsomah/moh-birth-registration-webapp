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
const ResetPassword = React.lazy(() =>
  import("../components/LandingPage/Pages/Signin/ResetPassword/ResetPassword")
);

//? Dashboard Components imports
const Dashboard = React.lazy(() =>
  import("../components/Dashboard/Pages/Dashboard/Dashboard")
);
const Applicants = React.lazy(() =>
  import("../components/Dashboard/Pages/Applicants/Applicants")
);
const AddApplicant = React.lazy(() =>
  import("../components/Dashboard/Pages/Applicants/AddApplicant/AddApplicant")
);
const ViewApplicant = React.lazy(() =>
  import("../components/Dashboard/Pages/Applicants/ViewApplicant/ViewApplicant")
);
const EditApplicant = React.lazy(() =>
  import("../components/Dashboard/Pages/Applicants/EditApplicant/EditApplicant")
);
const Appointments = React.lazy(() =>
  import("../components/Dashboard/Pages/Appointments/Appointments")
);
const Payments = React.lazy(() =>
  import("../components/Dashboard/Pages/Payments/Payments")
);
const ViewApplicantDetails = React.lazy(() =>
  import("../components/Dashboard/Pages/Queries/ViewApplicantDetails")
);
const Users = React.lazy(() =>
  import("../components/Dashboard/Pages/Users/Users")
);
const AddUserDialog = React.lazy(() =>
  import(
    "../components/Dashboard/Pages/Users/UsersDialog/AddUserDialog/AddUserDialog"
  )
);
const ViewUserDialog = React.lazy(() =>
  import(
    "../components/Dashboard/Pages/Users/UsersDialog/ViewUserDialog/ViewUserDialog"
  )
);
const EditUserDialog = React.lazy(() =>
  import(
    "../components/Dashboard/Pages/Users/UsersDialog/EditUserDialog/EditUserDialog"
  )
);
const MyProfile = React.lazy(() =>
  import("../components/Dashboard/Pages/Users/Profile/MyProfile")
);
const ManagedAccount = React.lazy(() =>
  import(
    "../components/Dashboard/Pages/Users/Profile/ManagedAccount/ManagedAccount"
  )
);
const Reports = React.lazy(() =>
  import("../components/Dashboard/Pages/Reports/Reports")
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
    element: (
      <UnPrivateRoute>
        <ErrorBoundary FallbackComponent={ErrorsHandler}>
          <Signin />
        </ErrorBoundary>
      </UnPrivateRoute>
    ),
  },
  {
    path: "/reset-password",
    element: (
      <UnPrivateRoute>
        <ErrorBoundary FallbackComponent={ErrorsHandler}>
          <ResetPassword />
        </ErrorBoundary>
      </UnPrivateRoute>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <ErrorBoundary FallbackComponent={ErrorsHandler}>
          <Dashboard />
        </ErrorBoundary>
      </PrivateRoute>
    ),
  },
  {
    path: "/all-applicants",
    element: (
      <PrivateRoute>
        <ErrorBoundary FallbackComponent={ErrorsHandler}>
          <Applicants />
        </ErrorBoundary>
      </PrivateRoute>
    ),
  },
  {
    path: "/all-applicants/add",
    element: (
      <PrivateRoute>
        <ErrorBoundary FallbackComponent={ErrorsHandler}>
          <AddApplicant />
        </ErrorBoundary>
      </PrivateRoute>
    ),
  },
  {
    path: "/all-applicants/view",
    element: (
      <PrivateRoute>
        <ErrorBoundary FallbackComponent={ErrorsHandler}>
          <ViewApplicant />
        </ErrorBoundary>
      </PrivateRoute>
    ),
  },
  {
    path: "/all-applicants/edit",
    element: (
      <PrivateRoute>
        <ErrorBoundary FallbackComponent={ErrorsHandler}>
          <EditApplicant />
        </ErrorBoundary>
      </PrivateRoute>
    ),
  },
  {
    path: "/all-appointments",
    element: (
      <PrivateRoute>
        <ErrorBoundary FallbackComponent={ErrorsHandler}>
          <Appointments />
        </ErrorBoundary>
      </PrivateRoute>
    ),
  },
  {
    path: "/all-payments",
    element: (
      <PrivateRoute>
        <ErrorBoundary FallbackComponent={ErrorsHandler}>
          <Payments />
        </ErrorBoundary>
      </PrivateRoute>
    ),
  },
  {
    path: "/all-queries/view-applicant-details",
    element: (
      <PrivateRoute>
        <ErrorBoundary FallbackComponent={ErrorsHandler}>
          <ViewApplicantDetails />
        </ErrorBoundary>
      </PrivateRoute>
    ),
  },
  {
    path: "/all-users",
    element: (
      <PrivateRoute>
        <ErrorBoundary FallbackComponent={ErrorsHandler}>
          <Users />
        </ErrorBoundary>
      </PrivateRoute>
    ),
    children: [
      {
        path: "add",
        element: (
          <PrivateRoute>
            <ErrorBoundary FallbackComponent={ErrorsHandler}>
              <AddUserDialog />
            </ErrorBoundary>
          </PrivateRoute>
        ),
      },
      {
        path: "view",
        element: (
          <PrivateRoute>
            <ErrorBoundary FallbackComponent={ErrorsHandler}>
              <ViewUserDialog />
            </ErrorBoundary>
          </PrivateRoute>
        ),
      },
      {
        path: "edit",
        element: (
          <PrivateRoute>
            <ErrorBoundary FallbackComponent={ErrorsHandler}>
              <EditUserDialog />
            </ErrorBoundary>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "/my-profile",
    element: (
      <PrivateRoute>
        <ErrorBoundary FallbackComponent={ErrorsHandler}>
          <MyProfile />
        </ErrorBoundary>
      </PrivateRoute>
    ),
  },
  {
    path: "/managed-account",
    element: (
      <PrivateRoute>
        <ErrorBoundary FallbackComponent={ErrorsHandler}>
          <ManagedAccount />
        </ErrorBoundary>
      </PrivateRoute>
    ),
  },
  {
    path: "/all-reports",
    element: (
      <PrivateRoute>
        <ErrorBoundary FallbackComponent={ErrorsHandler}>
          <Reports />
        </ErrorBoundary>
      </PrivateRoute>
    ),
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
