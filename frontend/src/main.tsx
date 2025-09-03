import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import { persistor, store } from "./store/index.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AppRoutes from "./routes/AppRoutes.tsx";
import { Toaster } from "sonner";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Toaster richColors />
            <AppRoutes />
          </Suspense>
        </BrowserRouter>
      </PersistGate>
    </QueryClientProvider>
  </Provider>
);
