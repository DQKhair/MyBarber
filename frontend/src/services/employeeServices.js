import axiosRoot from "../config/axiosConfig";

const fetchEmployees = async () => {
  const response = await axiosRoot.get(`/api/employees`);
  return response.data;
};

const getEmployeeById = async (employeeID) => {
  const response = await axiosRoot.get(`/api/employees/${employeeID}`);
  return response.data;
}

const addEmployee = async (employee) => {
  const response = await axiosRoot.post(`/api/employees`, employee);
  return response.data;
};

const deleteEmployee = async (employeeID) => {
  const response = await axiosRoot.delete(`/api/employees/${employeeID}`);
  return response.data;
};

const updateEmployee = async (employeeID, employee) => {
  const response = await axiosRoot.put(
    `/api/employees/${employeeID}`,
    employee
  );
  return response.data;
};

export { fetchEmployees, getEmployeeById, addEmployee, deleteEmployee, updateEmployee };
