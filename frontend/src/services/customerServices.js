import axios from "axios";
import { API_URL } from "../constants/constants";

const fetchCustomers = async () => {
  try {
    const response = await axios.get(`${API_URL}/customers.json`);
    return response.data;
  } catch (err) {
    console.error("Failed to fetch customers:", err);
    return [];
  }
};

const addCustomer = async (customer) => {
  try {
    const response = await axios.post(`${API_URL}/customers`, customer);
    return response.data;
  } catch (err) {
    console.error("Failed to add customers:", err);
    return [];
  }
};

const deleteCustomer = async (customerID) => {
  try {
    const response = await axios.delete(`${API_URL}/customers/${customerID}`);
    return response.data;
  } catch (err) {
    console.error("Failed to delete customers:", err);
    return [];
  }
};

const updateCustomer = async (customerID, customer) => {
  try {
    const response = await axios.put(
      `${API_URL}/customers/${customerID}`,
      customer
    );
    return response.data;
  } catch (err) {
    console.error("Failed to update customers:", err);
    return [];
  }
};

export { fetchCustomers, addCustomer, deleteCustomer, updateCustomer };
