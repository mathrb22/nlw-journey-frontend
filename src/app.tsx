import {
  RouterProvider,
  createBrowserRouter,
  redirect,
} from "react-router-dom";
import { CreateTripPage } from "./pages/create-trip";
import { TripDetailsPage } from "./pages/trip-details";
import { Toaster } from "sonner";
import { TripDetailsProvider } from "./contexts/TripDetailsContext";

const router = createBrowserRouter([
  {
    path: "/",
    element: <CreateTripPage />,
  },
  {
    path: "/trips/:tripId",
    element: (
      <TripDetailsProvider>
        <TripDetailsPage />
      </TripDetailsProvider>
    ),
  },
  {
    path: "*",
    loader: async () => redirect("/"),
  },
]);

export function App() {
  return (
    <>
      <Toaster richColors expand theme="dark" position="top-center" />
      <RouterProvider router={router} />
    </>
  );
}
