import { useState, useEffect } from "react";
import { fetchCustomers } from "../services/customerServices";

const useCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCustomers = async () => {
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadCustomers();
  }, []);

  const getCustomerById = (customerID) => {
    return customers.find((c) => c.Customer_ID === customerID);
  };

  const addCustomer = (customer) => {

    // add api

    setCustomers([...customer,customer])
  }

  const deleteCustomer = (customerID) => {

    //add api

    setCustomers(customers.filter(customer => customer.Customer_ID !== customerID));
  }

  const updateCustomer = (customerID,updateCustomer) =>{

    //add api
    const customer = updateCustomer

    setCustomers(customers.map(c => (c.Customer_ID === customerID ? customer : c)));
  }

  return {
    loading,
    error,
    customers,
    getCustomerById,
  };
};

export default useCustomers;
