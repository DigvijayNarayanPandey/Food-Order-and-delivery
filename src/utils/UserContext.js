import { createContext } from "react";

const userContext = createContext({
    isLoggedUser: "Default User",
    setLoggedinInfo: () => {},
});

export default userContext;