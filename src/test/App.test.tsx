import userEvent from "@testing-library/user-event";
import { describe, expect, it, vi } from "vitest";
import { render, screen } from "./test-utils";
import App from "../App";

vi.mock("../components/RestaurantsList", () => ({
  default: ({ postcode }: { postcode: string }) => (
    <div data-testid="restaurants-list">
      RestaurantsList received postcode: {postcode}
    </div>
  ),
}));

describe("App", () => {
  it("shows the page title", () => {
    render(<App />);

    expect(
      screen.getByRole("heading", { name: /restaurants nearby/i }),
    ).toBeInTheDocument();
  });

  it("shows the first postcode by default and passes its value to the restaurant list", () => {
    render(<App />);

    expect(
      screen.getByRole("combobox", { name: /choose uk postcode/i }),
    ).toHaveValue("CT1 2EH");

    expect(screen.getByTestId("restaurants-list")).toHaveTextContent(
      "RestaurantsList received postcode: CT12EH",
    );
  });

  it("updates the postcode when user selects another one and passes its value to the restaurant list", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(
      screen.getByRole("combobox", { name: /choose uk postcode/i }),
    );

    await user.click(await screen.findByRole("option", { name: "BS1 4DJ" }));

    expect(
      screen.getByRole("combobox", { name: /choose uk postcode/i }),
    ).toHaveValue("BS1 4DJ");

    expect(screen.getByTestId("restaurants-list")).toHaveTextContent(
      "RestaurantsList received postcode: BS14DJ",
    );
  });
});
