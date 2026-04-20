import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useCallback, useEffect, useState, useContext } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import userContext from "../utils/UserContext";

// Move HOC creation to module scope so it is not recreated on every render
const RestaurantCardPromoted = withPromotedLabel(RestaurantCard);

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=13.0688835&lng=77.5060438&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );
      const json = await data.json();
      const restaurants =
        json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants ?? [];
      setListOfRestaurants(restaurants);
      setFilteredRestaurant(restaurants);
    } catch (err) {
      setFetchError(err.message);
    }
  };

  const onlineStatus = useOnlineStatus();
  const { isLoggedUser, setLoggedinInfo } = useContext(userContext);

  const handleSearch = useCallback(() => {
    const filtered = listOfRestaurants.filter((res) =>
      res.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestaurant(filtered);
  }, [listOfRestaurants, searchText]);

  const handleTopRated = useCallback(() => {
    const filtered = listOfRestaurants.filter((res) => res.info.avgRating > 4.2);
    setFilteredRestaurant(filtered);
  }, [listOfRestaurants]);

  if (onlineStatus === false) {
    return <h1>Looks like you are offline!! Check your Internet Connection</h1>;
  }

  if (fetchError) {
    return (
      <h1 className="text-center mt-20 text-red-500">
        Failed to load restaurants: {fetchError}
      </h1>
    );
  }

  return listOfRestaurants.length === 0 ? (
    <Shimmer />
  ) : (
    <div className="flex flex-col">
      <div className="flex justify-between items-center px-24 py-1">
        <div className="p-2">
          <input
            className="h-8 w-48 rounded-full border-0 px-4 py-1 font-medium shadow-md"
            data-testid="search-input"
            placeholder="Search your Restaurant..."
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold text-sm cursor-pointer ml-2"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <button
          className="px-4 py-2 bg-green-700 rounded-lg text-white"
          onClick={handleTopRated}
        >
          Top Restaurants
        </button>
        <div>
          <label htmlFor="username">Username :</label>
          <input
            id="username"
            className="h-8 w-48 rounded-full border-0 px-4 py-1 font-medium shadow-md ml-2"
            type="text"
            value={isLoggedUser}
            onChange={(e) => setLoggedinInfo(e.target.value)}
          />
        </div>
      </div>
      <div className="flex flex-wrap justify-center">
        {filteredRestaurant.map((restaurant) => (
          <Link
            key={restaurant.info.id}
            to={"/restaurant/" + restaurant.info.id}
          >
            {restaurant.info.isOpen ? (
              <RestaurantCardPromoted resData={restaurant} />
            ) : (
              <RestaurantCard resData={restaurant} />
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Body;
