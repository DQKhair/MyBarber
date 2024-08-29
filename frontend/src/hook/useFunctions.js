import { useState, useEffect } from "react";
import { fetchFunctions } from "../services/functionServices";

const useFunctions = () => {
  const [functions, setFunctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadFunctions = async () => {
      try {
        const data = await fetchFunctions();
        setFunctions(data);
      } catch (err) {
        setError(err);
        console.error("Fail to load functions: ", err);
      } finally {
        setLoading(false);
      }
    };
    loadFunctions();
  }, []);

  return {
    loading,
    error,
    functions
  };
};

export default useFunctions;
