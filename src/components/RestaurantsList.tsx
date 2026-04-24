import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const RestaurantsList = () => {
  const postcode = "EC4M7RF";

  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ["restaurants", postcode],
    queryFn: async () => {
      const { data } = await axios.get(
        `/api/discovery/uk/restaurants/enriched/bypostcode/${postcode}`,
      );
      console.log(data);
      return data;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) return <p>Loading brands...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  return (
    <div>
      {isSuccess && (
        <ul>
          {data.restaurants.map((restaurant) => (
            <li key={restaurant.id}>{restaurant.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RestaurantsList;
