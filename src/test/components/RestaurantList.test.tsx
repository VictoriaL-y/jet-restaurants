import { describe, expect, it, vi } from "vitest";
import { render, screen } from "../test-utils";
import RestaurantsList from "../../components/RestaurantsList";
import { mockRestaurant } from "../mocks/mockRestaurant";
import { useRestaurants } from "../../hooks/useRestaurants";
import type { RestaurantDetails } from "../../types";

vi.mock("../../hooks/useRestaurants");

type MockUseRestaurantsValue = {
  data?: RestaurantDetails[];
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
  error: Error | null;
};

const mockUseRestaurants = (value: MockUseRestaurantsValue) => {
  vi.mocked(useRestaurants).mockReturnValue(
    value as ReturnType<typeof useRestaurants>,
  );
};

describe("RestaurantsList", () => {
  it("shows 10 loading skeletons while loading", () => {
    mockUseRestaurants({
      data: undefined,
      isLoading: true,
      isError: false,
      isSuccess: false,
      error: null,
    });

    render(<RestaurantsList postcode="CT12EH" />);

    expect(screen.getAllByTestId("restaurant-card-skeleton")).toHaveLength(10);
  });

  it("shows an error message when something goes wrong", () => {
    mockUseRestaurants({
      data: undefined,
      isLoading: false,
      isError: true,
      isSuccess: false,
      error: new Error("Request failed with status code 404"),
    });

    render(<RestaurantsList postcode="CT12EH" />);

    expect(
      screen.getByText("Request failed with status code 404"),
    ).toBeInTheDocument();
  });

  it("shows an empty message when there are no restaurants", () => {
    mockUseRestaurants({
      data: [],
      isLoading: false,
      isError: false,
      isSuccess: true,
      error: null,
    });

    render(<RestaurantsList postcode="CT12EH" />);

    expect(
      screen.getByText("No restaurants found for this postcode."),
    ).toBeInTheDocument();
  });

  it("shows restaurants when the API returns data", () => {
    mockUseRestaurants({
      data: [mockRestaurant],
      isLoading: false,
      isError: false,
      isSuccess: true,
      error: null,
    });

    render(<RestaurantsList postcode="CT12EH" />);

    expect(screen.getByText("Munchies")).toBeInTheDocument();
    expect(screen.getByText("Kebab, Pizza")).toBeInTheDocument();
  });
});
