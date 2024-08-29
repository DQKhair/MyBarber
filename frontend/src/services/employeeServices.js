import axios from "axios";
import { API_URL } from "../constants/constants";

const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${API_URL}/employees.json`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch employees:", error);
    return [];
  }
};

const addEmployee = async (employee) => {
  try {
    const response = await axios.post(`${API_URL}/employees`, employee);
    return response.data;
  } catch (err) {
    console.error("Failed to add employee:", err);
    return [];
  }
};

const deleteEmployee = async (employeeID) => {
  try {
    const response = await axios.delete(`${API_URL}/employees/${employeeID}`);
    return response.data;
  } catch (err) {
    console.error("Failed to delete employee:", err);
    return [];
  }
};

const updateEmployee = async (employeeID, employee) => {
  try {
    const response = await axios.put(
      `${API_URL}/employees/${employeeID}`,
      employee
    );
    return response.data;
  } catch (err) {
    console.error("Failed to update employee:", err);
    return [];
  }
};

export { fetchEmployees, addEmployee, deleteEmployee, updateEmployee };
