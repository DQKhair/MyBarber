import { useEffect, useState } from "react";
import {
  getUserInfo,
  updateInfoAdmin,
  updateInfoEmployee,
} from "../services/userInfoServices";
import DecodeToken from "../utils/DecodeToken";

const useUserInfo = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const userInfo = DecodeToken(localStorage.getItem("accessToken"));

  useEffect(() => {
    getUserInfoHook(userInfo.User_ID);
  }, []);

  const getUserInfoHook = async (userId) => {
    setError(null);
    setLoading(true);
    try {
      const user = await getUserInfo(userId);
      setUser(user);
      return user;
    } catch (error) {
      setError(error);
      console.log("Fail to get user", error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateInfoAdminHook = async (userId, admin) => {
    setError(null);
    try {
      const updated = await updateInfoAdmin(userId, admin);
      setUser(updated);
      return updated;
    } catch (err) {
      setError(err);
      console.error("Update user is fail!", err);
      return null;
    }
  };

  const updateInfoEmployeeHook = async (userId, employee) => {
    setError(null);
    try {
      const updated = await updateInfoEmployee(userId, employee);
      setUser(updated);
      return updated;
    } catch (err) {
      setError(err);
      console.error("Update user is fail!", err);
      return null;
    }
  };

  return {
    loading,
    error,
    user,
    updateInfoAdminHook,
    updateInfoEmployeeHook,
  };
};

export default useUserInfo;
