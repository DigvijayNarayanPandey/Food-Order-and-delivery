import React from "react";

const Shimmer = React.memo(() => {
  return (
    <div className="flex flex-wrap justify-center mt-12">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="w-48 h-80 rounded-xl p-2 m-2 bg-gray-200 overflow-hidden relative">
          <div className="w-full h-36 bg-gray-400 rounded-xl"></div>
          <div className="w-full h-3 bg-gray-400 rounded-full mt-2"></div>
          <div className="w-3/4 h-3 bg-gray-400 rounded-full mt-2"></div>
          <div className="w-1/2 h-3 bg-gray-400 rounded-full mt-2"></div>
          <div className="w-1/2 h-3 bg-gray-400 rounded-full mt-2"></div>
        </div>
      ))}
    </div>
  );
});

export default Shimmer;