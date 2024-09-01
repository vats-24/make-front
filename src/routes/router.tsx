import SignIn from "@/components/organisms/SignIn";
import React, { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import Sidebar from "@/components/organisms/Sidebar";
import Jwt from "@/components/template/Jwt";


function ProtectedRoute() { 
  
  // useAuthInterceptor()
  
  /*

  useEffect(() => {
    const validateTokens = async () => {
      const accessToken = localStorage.getItem('accessToken');
      const refreshToken = localStorage.getItem('refreshToken');

      if (!accessToken || !refreshToken) {
        navigate('/auth/signin');
        return;
      }

      try {
        const response = await fetch('http://localhost:3000/api/users/protected', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'x-refresh-token': refreshToken,
          },
        });

        console.log(response)
        console.log(response.ok)

        if (response.ok) {
          const newAccessToken = response.headers.get('Authorization')?.split(' ')[1];
          const newRefreshToken = response.headers.get('x-refresh-token');

          if (newAccessToken) {
            localStorage.setItem('accessToken', newAccessToken);
          }
          if (newRefreshToken) {
            localStorage.setItem('refreshToken', newRefreshToken);
          }
        } else {
          navigate('/auth/signin');
        }
      } catch (error) {
        console.error('Error validating tokens:', error);
        navigate('/auth/signin');
      }
    };

    validateTokens();
  }, [navigate]);
  */

    return (
      <div className="flex w-full">
        <div className="w-[20%]">
          <Sidebar />
        </div>
        <div className="w-[80%]">
          {/* <Header /> */}
          <Outlet />
        </div>
      </div>
    );
}

const LazyHomePage = lazy(
  () => import("@/components/template/HomePage")
)

const LazyServicePage = lazy(
  () => import("@/components/template/Services")
)

const LazyProfilePage = lazy(
  () => import("@/components/template/Profile")
)

const LazyEarningsPage = lazy(
  () => import("@/components/template/Earnings")
)

const LazyOnBoardPage = lazy(
  () => import("@/components/template/OnBoard")
)

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        path: "/", 
        element: <Suspense fallback={"Loading"}><LazyHomePage /></Suspense>,
      },
      {
        path: "/services",
        element: (<Suspense fallback={"Loading"}><LazyServicePage /></Suspense>),
      },
      {
        path: "/profile",
        element: (<Suspense fallback={"Loading"}><LazyProfilePage /></Suspense>),
      },
      {
        path: "/earnings",
        element: (<Suspense fallback={"Loading"}><LazyEarningsPage /></Suspense>),
      },
    ],
  },
  {
    path: "/auth/signin",
    element: (
      <React.Suspense fallback={"Loading..."}>
        <SignIn />
      </React.Suspense>
    ),
  },
  {
    path: "/onboard",
    element: (<Suspense fallback={"Loading..."}><LazyOnBoardPage /></Suspense>),
  },
  {
    path: "/jwt",
    element: <Jwt />,
  },
]);

export default function () {
  return <RouterProvider router={router} />;
}
