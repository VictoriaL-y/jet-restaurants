import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@mantine/core/styles.css";
import { createTheme, MantineProvider, Text } from "@mantine/core";
import App from "./App.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

const theme = createTheme({
  fontFamily: "Lato, sans-serif",
  headings: {
    fontFamily: "Lato, sans-serif",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary
          fallback={
            <Text ta="center" p="xl">
              Something went wrong. Please refresh.
            </Text>
          }
        >
          <App />
        </ErrorBoundary>
      </QueryClientProvider>
    </MantineProvider>
  </StrictMode>,
);
