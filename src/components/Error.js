import React from 'react';
import { useRouteError } from 'react-router-dom';

const Error = () => {
  const err = useRouteError();
  return (
    <div className="text-center mt-20">
      <div>This is Error page</div>
      <h2 className="text-red-500 text-xl font-bold">
        {err.status} : {err.statusText}
      </h2>
    </div>
  );
};

export default Error;