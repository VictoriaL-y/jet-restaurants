import { describe, expect, it, vi } from "vitest";
import axios from "axios";
import { mockRestaurant } from "../mocks/mockRestaurant";
import { getRestaurants } from "../../api/restaurants";

vi.mock("axios");

describe("getRestaurants", () => {
  it("calls the correct API endpoint", async () => {
    const fakeResponse = {
      restaurants: [mockRestaurant],
    };

    vi.mocked(axios.get).mockResolvedValue({
      data: fakeResponse,
    });

    const result = await getRestaurants("CT12EH");

    expect(axios.get).toHaveBeenCalledWith(
      "/discovery/uk/restaurants/enriched/bypostcode/CT12EH",
    );

    expect(result).toEqual(fakeResponse);
  });
});
