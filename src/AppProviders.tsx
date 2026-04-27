import { createTheme, MantineProvider, Text } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import type { ReactNode } from "react";

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

const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <MantineProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <ErrorBoundary
          fallback={
            <Text ta="center" p="xl">
              Something went wrong. Please refresh.
            </Text>
          }
        >
          {children}
        </ErrorBoundary>
      </QueryClientProvider>
    </MantineProvider>
  );
};

export default AppProviders;
