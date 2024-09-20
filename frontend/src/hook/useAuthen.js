import { useState } from "react";
import { resetPassword } from "../services/authenServices";

const useAuthen = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);


  const resetPasswordHook = async (user) => {
    setError(null);
    setLoading(true);
    try {
      const data = await resetPassword(user);
      return data;
    } catch (error) {
      setError(error);
      console.error("Error reset password", error);
      return null;
    }finally
    {
        setLoading(false);
    }
  };

  return {
    error,
    loading,
    resetPasswordHook,
  };
};

export default useAuthen;
