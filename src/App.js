import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import useAuth from "./hooks/useAuth";
import ProtectedRoutes from "./routes/ProtectedRoutes";
import PublicRoutes from "./routes/PublicRoutes";

function App() {
  const { isAuthenticated } = useAuth();
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        {isAuthenticated === null && <div>Loading ...</div>}
        {isAuthenticated === true && <ProtectedRoutes />}
        {isAuthenticated === false && <PublicRoutes />}
      </QueryClientProvider>
    </>
  );
}

export default App;
