import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { describe, expect, it, vi } from "vitest";
import { getRestaurants } from "../../api/restaurants";
import { mockRestaurant } from "../mocks/mockRestaurant";
import { useRestaurants } from "../../hooks/useRestaurants";

vi.mock("../../api/restaurants", () => ({
  getRestaurants: vi.fn(),
}));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function TestWrapper({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe("useRestaurants", () => {
  it("returns only the first 10 restaurants", async () => {
    const restaurants = Array.from({ length: 12 }, (_, index) => ({
      ...mockRestaurant,
      id: String(index + 1),
      name: `Restaurant ${index + 1}`,
    }));

    vi.mocked(getRestaurants).mockResolvedValueOnce({
      restaurants,
    });

    const { result } = renderHook(() => useRestaurants("CT12EH"), {
      wrapper: TestWrapper,
    });

    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    expect(getRestaurants).toHaveBeenCalledWith("CT12EH");

    expect(result.current.data).toHaveLength(10);
    expect(result.current.data?.[0].name).toBe("Restaurant 1");
    expect(result.current.data?.[9].name).toBe("Restaurant 10");
    expect(
      result.current.data?.find(
        (restaurant) => restaurant.name === "Restaurant 11",
      ),
    ).toBeUndefined();
  });
});
