import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import Header from "./Components/Header/Header";
import router from "./Components/Routes/routes";
import SignInContextProvider, {
  MovieSeatsContextProvider
} from "./Context/GlobalProvider";
const queryClient = new QueryClient();
function App() {
  return (
    <SignInContextProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        <MovieSeatsContextProvider>
          <RouterProvider router={router} />
        </MovieSeatsContextProvider>
      </QueryClientProvider>
    </SignInContextProvider>
  );
}

export default App;
