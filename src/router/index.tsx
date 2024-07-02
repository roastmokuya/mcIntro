import RootLayout from "@/pages/RootLayout";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";

export const routes = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];
