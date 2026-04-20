import React from "react";

const Shimmer1 = () => {
  return (
    <div className="w-3/5 mx-auto my-5 min-h-screen">
      <div className="w-24 h-4 bg-gray-300 rounded-lg"></div>
      <div className="w-36 h-7 bg-gray-300 rounded-lg my-7"></div>
      <hr />
      <div className="p-8 m-5 border border-gray-400 rounded-2xl shadow-md h-36">
        <div className="w-80 h-5 bg-gray-300 rounded-full"></div>
        <div className="w-24 h-5 bg-gray-300 rounded-lg mt-5"></div>
        <div className="w-36 h-12 bg-gray-300 rounded-lg mt-5"></div>
        <hr />
        <div className="w-48 h-5 bg-gray-300 rounded-lg mt-3 mx-1"></div>
      </div>
    </div>
  );
};

export default Shimmer1;
