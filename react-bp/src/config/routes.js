import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import {PrivateRoute,AuthRoute} from "./authRoute"

const fetchRoutes = (containers) => {
  const { Home, Login, Signup } = containers;

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
          path: "/signup",
          element: <PrivateRoute Element={<Signup />} />,
          errorElement: <div>404 No Page Found</div>,
        },
        {
          path: "/",
          element: <PrivateRoute Element={<Login />} />,
          errorElement: <div>404 No Page Found</div>,
        },
        {
          element: <Layout />,
          errorElement: <div>404 No Page Found</div>,
          children: [
            {
              path: "/home",
              element: <AuthRoute Element={<Home />} />,
            },
          ],
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
