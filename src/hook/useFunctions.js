import { useState, useEffect } from "react";
import { fetchFunctions } from "../services/functionServices";

const useFunctions = () => {
  const [functions, setFunctions] = useState([]);

  useEffect(() => {
    const loadFunctions = async () => {
      const data = await fetchFunctions();
      setFunctions(data);
    };
    loadFunctions();
  }, []);

  return {
    functions
  };
};

export default useFunctions;
