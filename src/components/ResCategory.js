import React from 'react';
import Itemlist from './Itemlist';

const ResCategory = React.memo(({ data, showItems, setShowIndex }) => {
  const handleClick = () => {
    setShowIndex();
  };

  return (
    <div>
      <div className="w-full my-6 bg-gray-100 shadow-lg p-4 rounded-xl">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="text-lg">
            {data.title} &nbsp;({data.itemCards.length})
          </span>
          <span aria-label={showItems ? "Collapse" : "Expand"}>
            {showItems ? "🔼" : "🔽"}
          </span>
        </div>
        {showItems && <Itemlist items={data.itemCards} />}
      </div>
    </div>
  );
});

export default ResCategory;