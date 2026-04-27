import { render, screen } from "../test-utils";
import { describe, expect, it } from "vitest";
import { mockRestaurant } from "../mocks/mockRestaurant";
import RestaurantCard from "../../components/RestaurantCard";

describe("RestaurantCard", () => {
  it("renders all four required data points: name, cuisines, address, rating", () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);

    expect(screen.getByText("Munchies")).toBeInTheDocument();
    expect(screen.getByText("Kebab, Pizza")).toBeInTheDocument();
    expect(
      screen.getByText("15 Saint Peter's Street, Canterbury, CT1 2EH"),
    ).toBeInTheDocument();
    expect(screen.getByText("3.25")).toBeInTheDocument();
    expect(screen.getByText("(157)")).toBeInTheDocument();
  });

  it("renders the restaurant logo", () => {
    render(<RestaurantCard restaurant={mockRestaurant} />);

    const logo = screen.getByRole("img", { name: "Munchies" });

    expect(logo).toHaveAttribute("src", mockRestaurant.logoUrl);
  });
});
