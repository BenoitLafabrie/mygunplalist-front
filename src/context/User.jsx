import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { getUserData } from "../api/user";
import { getMygunplalistById } from "../api/myGunplaList";
import { getWishlistById } from "../api/myWishlist";

const UserContext = createContext({});

const UserContextProvider = (props) => {
  const [userToken, setUserToken] = useState("");
  const [userData, setUserData] = useState(null);
  const [myGunplaList, setMyGunplaList] = useState(null);
  const [myWishlist, setMyWishlist] = useState(null);

  const fetchUserData = async (token) => {
    const userData = await getUserData(token);
    if (userData) {
      setUserData(userData);
    }
  };

  const fetchMyGunplaList = async (token, id) => {
    const myGunplaListFetched = await getMygunplalistById(token, id);
    if (myGunplaListFetched) {
      setMyGunplaList(myGunplaListFetched);
    }
  };

  const fetchWishlist = async (token, id) => {
    const myWishlistFetched = await getWishlistById(token, id);
    if (myWishlistFetched) {
      setMyWishlist(myWishlistFetched);
    }
  };

  useEffect(() => {
    if (
      localStorage.getItem("userToken") &&
      localStorage.getItem("userToken").length > 0
    ) {
      const token = localStorage.getItem("userToken");
      setUserToken(token);
    } else {
      localStorage.setItem("userToken", "");
    }
  }, []);

  useEffect(() => {
    if (userToken) {
      localStorage.setItem("userToken", userToken);
      fetchUserData(userToken);
    } else {
      setUserData(null);
      localStorage.setItem("userToken", "");
    }
  }, [userToken]);

  useEffect(() => {
    if (userData) {
      fetchMyGunplaList(userToken, userData.user_id);
      fetchWishlist(userToken, userData.user_id);
    }
  }, [userToken, userData]);

  const value = {
    userData,
    setUserData,
    userToken,
    setUserToken,
    myGunplaList,
    setMyGunplaList,
    myWishlist,
    setMyWishlist,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node,
};

export { UserContextProvider, UserContext };
