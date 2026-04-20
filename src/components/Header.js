import { Link } from "react-router-dom";
import { LOGO_URL } from "../utils/constants";
import { useState, useContext } from "react";
import useOnlineStatus from "../utils/useOnlineStatus";
import userContext from "../utils/UserContext";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const { isLoggedUser } = useContext(userContext);

  const cartItems = useSelector((store) => store.cart.items);

  return (
    <div className="flex items-center justify-between border-2 border-black rounded-xl bg-white shadow-md px-4 py-2">
      <div>
        <img className="w-24 ml-12" src={LOGO_URL} alt="logo" />
      </div>
      <div>
        <ul className="flex items-center gap-6 pr-24 text-base font-semibold">
          <li className="list-none cursor-pointer">
            Online Status:{" "}
            {onlineStatus ? (
              <span aria-label="Online" style={{ color: "green", fontSize: "30px" }}>🟢</span>
            ) : (
              <span aria-label="Offline" style={{ color: "red", fontSize: "30px" }}>🔴</span>
            )}
          </li>
          <li className="list-none cursor-pointer hover:underline">
            <Link to="/">Home</Link>
          </li>
          <li className="list-none cursor-pointer hover:underline">
            <Link to="/about">About Us</Link>
          </li>
          <li className="list-none cursor-pointer hover:underline">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="list-none cursor-pointer hover:underline">
            <Link to="/grocery">Grocery</Link>
          </li>
          <li className="list-none p-2 bg-green-500 rounded-lg">
            <Link to="/cart">Cart({cartItems.length} items)</Link>
          </li>
          <li className="list-none">
            <button
              className="bg-green-600 text-white px-4 py-2 rounded-xl font-semibold text-sm cursor-pointer"
              onClick={() => {
                setBtnName(btnName === "Login" ? "Logout" : "Login");
              }}
            >
              {btnName}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Header;