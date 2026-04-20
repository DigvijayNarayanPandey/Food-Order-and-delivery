import React, { useCallback, useState } from "react";
import { CDN_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addItem } from "../utils/cartSlice";

const Itemlist = ({ items }) => {
  const dispatch = useDispatch();
  const [addedId, setAddedId] = useState(null);

  const handleAddItem = useCallback(
    (res) => {
      dispatch(addItem(res));
      setAddedId(res?.card?.info?.id);
      setTimeout(() => setAddedId(null), 1500);
    },
    [dispatch]
  );

  return (
    <div>
      {items.map((res) => (
        <div
          className="flex items-center justify-between my-8 gap-8 p-5 border border-gray-300 rounded-2xl bg-rose-50 shadow-lg"
          data-testid="foodItems"
          key={res?.card?.info?.id}
        >
          <div className="flex-1">
            <div className="text-base mb-2">{res?.card?.info?.name}</div>
            <div>
              ₹&nbsp;
              {res?.card?.info?.defaultPrice / 100 ||
                res?.card?.info?.price / 100}
            </div>
            <div className="text-sm font-normal text-gray-600 mt-2">
              {res?.card?.info?.description}
            </div>
          </div>
          <div className="flex flex-col items-center gap-2">
            <img
              className="w-36 rounded-lg"
              src={CDN_URL + res?.card?.info?.imageId}
              alt={res?.card?.info?.name}
            />
            <button
              className="px-3 py-1 bg-black text-white rounded-lg shadow-lg"
              onClick={() => handleAddItem(res)}
            >
              {addedId === res?.card?.info?.id ? "Added!" : "Add +"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Itemlist;
