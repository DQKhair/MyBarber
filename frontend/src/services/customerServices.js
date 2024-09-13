import axiosRoot from "../config/axiosConfig";

const fetchCustomers = async () => {
  try {
    const response = await axiosRoot.get(`/api/customers`);
    return response.data;
  } catch (err) {
    console.error("Failed to fetch customers:", err);
    return [];
  }
};

const getCustomerById = async (customerID) => {
  const response = await axiosRoot.get(`/api/customers/${customerID}`);
  return response.data;
}

const addCustomer = async (customer) => {
  const response = await axiosRoot.post(`/api/customers`, customer);
  return response.data;
};

const deleteCustomer = async (customerID) => {
  const response = await axiosRoot.delete(`/api/customers/${customerID}`);
  return response.data;
};

const updateCustomer = async (customerID, customer) => {
  const response = await axiosRoot.put(
    `/api/customers/${customerID}`,
    customer
  );
  return response.data;
};

export { fetchCustomers,getCustomerById, addCustomer, deleteCustomer, updateCustomer };
