import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { getMygunplalistById } from "../api/myGunplaList";
import { getWishlistById } from "../api/myWishlist";
import { getUserData } from "../api/user";

const UserContext = createContext({});

const UserContextProvider = (props) => {
  const [userToken, setUserToken] = useState("");
  const [userData, setUserData] = useState(null);
  const [myGunplaList, setMyGunplaList] = useState(null);
  const [myWishlist, setMyWishlist] = useState(null);
  const [statusUpdated, setStatusUpdated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = async (token) => {
    setIsLoading(true);
    const userData = await getUserData(token);
    if (userData) {
      setUserData(userData);
    }
    setIsLoading(false);
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
      fetchUserData(userToken);
    } else {
      setUserData(null);
      setIsLoading(false);
    }
  }, [userToken]);

  useEffect(() => {
    if (userData && userToken) {
      fetchMyGunplaList(userToken, userData.user_id);
      fetchWishlist(userToken, userData.user_id);
      setStatusUpdated(false);
    }
  }, [userToken, userData, statusUpdated]);

  const value = {
    userData,
    setUserData,
    userToken,
    setUserToken,
    myGunplaList,
    setMyGunplaList,
    myWishlist,
    setMyWishlist,
    isLoading,
    statusUpdated,
    setStatusUpdated,
  };

  return (
    <UserContext.Provider value={value}>{props.children}</UserContext.Provider>
  );
};

UserContextProvider.propTypes = {
  children: PropTypes.node,
};

export { UserContext, UserContextProvider };
