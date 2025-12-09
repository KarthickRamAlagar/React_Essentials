// Older Ways (React Router Dom v6 and below)

// import { createRoot } from "react-dom/client";
// import HomePage from "./pages/HomePage";
// import { BrowserRouter } from "react-router-dom";

// createRoot(document.getElementById("root")).render(
//   <BrowserRouter>
//   <Routes>
//     <Route path='/' element={<HomePage/>}/>
//   </Routes>
//   </BrowserRouter>
// );

// New  Way (React Router Dom v7)
import { createRoot } from "react-dom/client";
import HomePage from "./pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProfilePage from "./pages/ProfilePage";
import PageNotFound from "./pages/PageNotFound";
import ProfilesPage from "./pages/ProfilesPage";

const router = createBrowserRouter(
  {
    path: "/",
    element: <HomePage />,
    // errorElement: <div>404 Page Not Found </div>,
    errorElement: <PageNotFound />,
  },
  {
    path: "/Profile",
    element: <ProfilePage />,
  },
  {
    path: "/Profiles/:profileId",
    element: <ProfilesPage />,
  }
);
createRoot(document.getElementById("root")).render(
  <>
    <RouterProvider router={router} />
  </>
);
