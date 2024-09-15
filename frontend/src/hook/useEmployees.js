import { useState, useEffect } from "react";
import {
  fetchEmployees,
  getEmployeeById,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeServices";

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorLoad,setErrorLoad] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEmployees = async () => {
    setLoading(true)
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (err) {
        console.error("Fail to load employees: ", err);
        setErrorLoad(err);
      } finally {
        setLoading(false);
      }
    };
    loadEmployees();
  }, []);

  const getEmployeeByIdLocal = (employeeID) => {
    setError(null);
    try {
      return employees.find((e) => e.employee_ID === employeeID);
    } catch (err) {
      setError(err);
      console.error("Fail to get employee by ID: ", err);
    }
  };

  const getEmployeeByIdHook = async (employeeID) => {
    setLoading(null);
    setError(null);
    try
    {
      const employee = await getEmployeeById(employeeID)
      return employee
    }catch(err)
    {
      setErrorLoad(err);
      console.error("Fail to get employee by ID: ", err);
      return null;
    }
  }

  const addEmployeeHook = async (employee) => {
    setError(null)
    try {
      const newEmployee = await addEmployee(employee);
      setEmployees([...employees, newEmployee]);
      return newEmployee;
    } catch (err) {
      setError(err);
      console.error("Fail to add new employee from hook: ", err);
      return null;
    }
  };

  const updateEmployeeHook = async (employeeID, employee) => {
    setError(null)
    try {
      const updated = await updateEmployee(employeeID, employee);
      setEmployees(
        employees.map((e) => (e.employee_ID === employeeID ? updated : e))
      );
      return updated
    } catch (err) {
      setError(err);
      console.error("Fail to update employee from hook: ", err);
      return null;
    }
  };

  const deleteEmployeeHook = async (employeeID) => {
    setError(null)
    try {
      await deleteEmployee(employeeID);
      setEmployees(employees.filter((e) => e.employee_ID !== employeeID));
      return true;
    } catch (err) {
      setError(err);
      console.error("Fail to delete employee from hook: ", err);
      return false;
    }
  };

  return {
    loading,
    errorLoad,
    error,
    employees,
    setError,
    getEmployeeByIdLocal,
    getEmployeeByIdHook,
    addEmployeeHook,
    updateEmployeeHook,
    deleteEmployeeHook,
  };
};

export default useEmployees;
