import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router-dom";
import Header from "./Components/Header/Header";
import router from "./Components/Routes/Routes";
import SignInContextProvider from "./Context/GlobalProvider";
const queryClient = new QueryClient();
function App() {
  return (
    <SignInContextProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        <RouterProvider router={router} />
      </QueryClientProvider>
    </SignInContextProvider>
  );
}

export default App;
