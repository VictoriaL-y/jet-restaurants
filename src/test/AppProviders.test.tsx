import { describe, expect, it, vi } from "vitest";
import { render, screen } from "./test-utils";
import AppProviders from "../AppProviders";

function TestComponent({ shouldCrash }: { shouldCrash: boolean }) {
  if (shouldCrash) {
    throw new Error("Test error");
  }

  return <div>Everything is fine</div>;
}

describe("AppProviders", () => {
  it("shows fallback message when a child component crashes", () => {
    vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <AppProviders>
        <TestComponent shouldCrash={true} />
      </AppProviders>,
    );

    expect(
      screen.getByText("Something went wrong. Please refresh."),
    ).toBeInTheDocument();
  });
});
