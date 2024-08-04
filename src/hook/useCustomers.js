import { useState, useEffect } from "react";
import {
  fetchCustomers,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/customerServices";

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
    try {
      const customer = customers.find((c) => c.Customer_ID === customerID);
      return customer;
    } catch (err) {
      setError(err);
      console.error("Fail to get customer by ID: ", err);
    }
  };

  const addCustomerHook = async (customer) => {
    try {
      const newCustomer = await addCustomer(customer);
      setCustomers([...customers, newCustomer]);
    } catch (err) {
      setError(err);
      console.error("Fail to add new customer from hook: ", err);
    }
  };

  const deleteCustomerHook = async (customerID) => {
    try {
      //add api
      await deleteCustomer(customerID);
      setCustomers(
        customers.filter((customer) => customer.Customer_ID !== customerID)
      );
    } catch (err) {
      setError(err);
      console.error("Fail to delete customer from hook: ", err);
    }
  };

  const updateCustomerHook = async (customerID, customer) => {
    try {
      //add api
      const updated = await updateCustomer(customerID,customer);
      setCustomers(
        customers.map((c) => (c.Customer_ID === customerID ? updated : c))
      );
    } catch (err) {
      setError(err);
      console.error("Fail to update customer from hook: ", err);
    }
  };

  return {
    loading,
    error,
    customers,
    getCustomerById,
    addCustomerHook,
    updateCustomerHook,
    deleteCustomerHook,
  };
};

export default useCustomers;
