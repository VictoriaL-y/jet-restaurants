import { MantineProvider } from "@mantine/core";
import { render } from "@testing-library/react";
import type { ReactElement, ReactNode } from "react";

function Providers({ children }: { children: ReactNode }) {
  return <MantineProvider env="test">{children}</MantineProvider>;
}

function renderWithProviders(ui: ReactElement) {
  return render(ui, {
    wrapper: Providers,
  });
}

export * from "@testing-library/react";
export { renderWithProviders as render };
