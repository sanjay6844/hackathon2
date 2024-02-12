import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import {PrivateRoute,AuthRoute} from "./authRoute"

const fetchRoutes = (containers) => {
  const { Home } = containers;

  return function Routes() {
    const Layout = () => (
      <>
        {/* <Header /> */}
        <div> Header </div>
        <Outlet />
      </>
    );

    const createRoutes = () => {
      return createBrowserRouter([
        {
          element: <Layout />,
          errorElement: <div>404 No Page Found</div>,
          children: [
            {
              path: "/home",
              // with authroute
              // element: <AuthRoute Element={<Home />} />,
              // without authRoute
              element: <Home />,
            },
          ],
        },
        {
          path: "/login",
          // with authroute
          // element: <PrivateRoute Element={<Home />} />
          // without authRoute
          element: <Home />,
        },

        {
          path: "/signup",
          // with authroute
          // element: <PrivateRoute Element={<Home />} />
          // without authRoute
          element: <Home />,
        },
      ]);
    };
    return (
      <>
        <RouterProvider router={createRoutes()} />
      </>
    );
  };
};

export { fetchRoutes };
