import Shimmer1 from "./Shimmer1";
import { useParams } from "react-router-dom";
import { useState } from "react";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import ResCategory from "./ResCategory";

const RestaurantMenuCard = () => {
  const { resId } = useParams();

  const { resInfo, error } = useRestaurantMenu(resId);
  const [showIndex, setShowIndex] = useState(null);

  if (error) return <div className="text-center mt-20 text-red-500 text-xl font-bold">Error: {error}</div>;
  if (resInfo === null) return <Shimmer1 />;

  // Find cards by @type instead of fragile hard-coded indices
  const restaurantCard = resInfo?.cards.find(
    (c) => c.card?.card?.["@type"]?.includes("Restaurant")
  );

  const {
    name,
    cuisines,
    costForTwoMessage,
    totalRatingsString,
    avgRatingString,
    areaName,
    sla,
    feeDetails,
  } = restaurantCard?.card?.card?.info ?? {};

  const breadcrumb = resInfo?.cards.find(
    (c) => c.card?.card?.text
  )?.card?.card?.text;

  const groupedCard = resInfo?.cards.find((c) => c.groupedCard);

  const categories =
    groupedCard?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    ) ?? [];

  return (
    <div className="w-3/5 mx-auto my-5 min-h-screen">
      <div className="text-xs">
        Home/India/{breadcrumb}
      </div>
      <h1 className="ml-5 text-2xl">{name}</h1>
      <hr />
      <div className="p-8 m-5 border border-gray-400 rounded-2xl shadow-md">
        <div>
          <div className="text-sm font-semibold">
            <span className="bg-green-600 text-white rounded-full px-1">★</span> &nbsp;
            {avgRatingString}({totalRatingsString})&nbsp; • &nbsp;
            {costForTwoMessage}
          </div>
        </div>
        <div className="text-orange-600 underline font-extrabold text-sm my-3">{cuisines?.join(", ")}</div>
        <div className="text-xs flex gap-2 items-center">
          <div className="flex flex-col items-center gap-1">
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          </div>
          <div>
            Outlet
            <span className="text-gray-500 text-xs font-normal">&nbsp; &nbsp;{areaName}</span>▾
            <div>{sla?.slaString}</div>
          </div>
        </div>
        <hr />
        <div className="mt-5 text-gray-700 text-sm font-normal flex items-center gap-2">
          <img
            width="20px"
            height="20px"
            alt="Delivery fee info"
            src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_40,h_40/v1648635511/Delivery_fee_new_cjxumu"
          />
          {feeDetails?.message ? feeDetails.message.replace("<b>2.3 kms</b>", "2.3 km ") : ""}
        </div>
      </div>
      <div className="bg-gray-200 w-full h-5 my-12 rounded"></div>
      {/* Categories Accordion */}
      {categories.map((category, index) => (
        <ResCategory
          key={category?.card?.card?.title}
          data={category?.card?.card}
          showItems={index === showIndex}
          setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
        />
      ))}
    </div>
  );
};

export default RestaurantMenuCard;