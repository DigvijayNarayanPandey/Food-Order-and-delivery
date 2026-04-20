import React from "react";
import { CDN_URL } from "../utils/constants";

const RestaurantCard = React.memo((props) => {
  const { resData } = props;
  const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
    resData?.info;
  return (
    <div
      className="w-48 rounded-xl p-2 m-2 bg-gray-100 shadow-sm hover:shadow-md hover:scale-105 cursor-pointer transition-all"
      data-testid="resCard"
    >
      <img
        style={{ width: "100%", height: "140px" }}
        alt="food-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="text-sm font-semibold mb-2">{name}</h3>
      <h4 className="text-xs text-gray-800 my-1">{cuisines.join(", ")}</h4>
      <h4 className="text-xs text-gray-800 my-1">
        <span className="bg-green-600 text-white px-1 py-0.5 rounded-full">★ {avgRating}</span>{" "}
        Ratings
      </h4>
      <h4 className="text-xs text-gray-800 my-1">{costForTwo}</h4>
      <h4 className="text-xs text-gray-800 my-1">{sla?.slaString}</h4>
    </div>
  );
});

// Higher Order Component
// input = <RestaurantCard/>  ==> <RestaurantCardPromoted/>
export const withPromotedLabel = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute text-white bg-green-700 m-1 rounded-lg p-1">OPEN</label>
        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;
