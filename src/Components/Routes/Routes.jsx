import { createBrowserRouter } from "react-router-dom";

import NavigationBar from "../NavigationBar/NavigationBar";
import TicketBooking from "../NavigationBar/TicketBooking";
import PopularMovies from "../NavigationBar/PopularMovies";
const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationBar />,
    children: [
      { index: true, element: <PopularMovies /> },
      { path: "/TicketBooking", element: <TicketBooking /> }
    ]
  }
]);
export default router;
