import React, { useEffect, useState } from "react";
import Header from "./Header";
import { Outlet } from "react-router-dom";
import userContext from "../utils/UserContext";
import { Provider } from "react-redux";
import appStore from "../utils/appStore";

const AppLayout = () => {
  const [loggedinInfo, setLoggedinInfo] = useState("");

  useEffect(() => {
    setLoggedinInfo("Digvijay");
  }, []);

  return (
    <Provider store={appStore}>
      <userContext.Provider value={{ isLoggedUser: loggedinInfo, setLoggedinInfo }}>
        <div className="app">
          <Header />
          <Outlet />
        </div>
      </userContext.Provider>
    </Provider>
  );
};

export default AppLayout;
