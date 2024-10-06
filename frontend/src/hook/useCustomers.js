import { useState, useEffect } from "react";
import {
  fetchCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer,
} from "../services/customerServices";

const useCustomers = () => {

  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorLoad, setErrorLoad] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCustomers = async () => {
      setLoading(true);
      try {
        const data = await fetchCustomers();
        setCustomers(data);
      } catch (err) {
        setErrorLoad(err);
      } finally {
        setLoading(false);
      }
    };
    loadCustomers();
  }, []);

  const getCustomerByIdLocal = (customerID) => {
    setLoading(true);
    setError(null);
    try {
      const customer = customers.find((c) => c.customer_ID === customerID);
      return customer
    } catch (err) {
      setError(err);
      console.error("Fail to get customer by ID: ", err);
      return null;
    }finally
    {
      setLoading(false);
    }
  };

  const getCustomerByIdHook = async (customerID) => {
    setLoading(true);
    setErrorLoad(null);
    try {
      const customer = await getCustomerById(customerID)
      return customer
    } catch (err) {
      setErrorLoad(err);
      console.error("Fail to get customer by ID: ", err);
      return null;
    }finally
    {
      setLoading(false);
    }
  };

  const addCustomerHook = async (customer) => {
    setError(null);
    setLoading(true);
    try {
      const newCustomer = await addCustomer(customer);
      setCustomers([...customers, newCustomer]);
      console.log(newCustomer);
      return newCustomer;
    } catch (err) {
      setError(err);
      console.error("Fail to add new customer from hook: ", err);
      return null;
    }finally
    {
      setLoading(false);
    }
  };

  const deleteCustomerHook = async (customerID) => {
    setError(null);
    setLoading(true);
    try {
      await deleteCustomer(customerID);
      setCustomers(
        customers.filter((customer) => customer.customer_ID !== customerID)
      );
      return true;
    } catch (err) {
      setError(err);
      console.error("Fail to delete customer from hook: ", err);
      return false;
    }finally
    {
      setLoading(false);
    }
  };

  const updateCustomerHook = async (customerID, customer) => {
    setError(null);
    setLoading(true);
    try {
      const updated = await updateCustomer(customerID, customer);
      setCustomers(
        customers.map((c) => (c.customer_ID === customerID ? updated : c))
      );
      return updated;
    } catch (err) {
      setError(err);
      console.error("Fail to update customer from hook: ", err);
      return null;
    }finally
    {
      setLoading(false);
    }
  };

  return {
    loading,
    errorLoad,
    error,
    customers,
    setError,
    getCustomerByIdLocal,
    getCustomerByIdHook,
    addCustomerHook,
    updateCustomerHook,
    deleteCustomerHook,
  };
};

export default useCustomers;
