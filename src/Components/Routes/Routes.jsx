import { createBrowserRouter } from "react-router-dom";
import MovieSearch from "../NavigationBar/MovieSearch";
import NavigationBar from "../NavigationBar/NavigationBar";
import TicketBooking from "../NavigationBar/TicketBooking";
const router = createBrowserRouter([
  {
    path: "/",
    element: <NavigationBar />,
    children: [
      { index: true, element: <MovieSearch /> },
      { path: "TicketBooking", element: <TicketBooking /> }
    ]
  }
]);
export default router;
