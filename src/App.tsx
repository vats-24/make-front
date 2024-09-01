import React from "react";
import Router from "./routes/router";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./react-query/client";
import { SnackbarProvider } from "notistack";
import { CookiesProvider } from "react-cookie";
import { Toaster } from 'react-hot-toast';


const App = () => {
  return (
    <React.StrictMode>
      <CookiesProvider defaultSetOptions={{path: '/'}}>
        <QueryClientProvider client={queryClient}>
          <SnackbarProvider maxSnack={3}>
            <Router />
          </SnackbarProvider>
        </QueryClientProvider>
      </CookiesProvider>
      <Toaster/>
    </React.StrictMode>
  );
};

export default App;
