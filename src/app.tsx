import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { CreateTripPage } from "./pages/create-trip";
import { TripDetailsPage } from "./pages/trip-details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetailsPage />,
  },
  {
    path: "*",
    loader: async () => redirect("/"),
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
