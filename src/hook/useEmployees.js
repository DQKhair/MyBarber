import { useState, useEffect } from "react";
import {
  fetchEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
} from "../services/employeeServices";

const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const data = await fetchEmployees();
        setEmployees(data);
      } catch (err) {
        console.error("Fail to load employees: ", err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    loadEmployees();
  }, []);

  const getEmployeeById = (employeeID) => {
    try {
      return employees.find((e) => e.Employee_ID === employeeID);
    } catch (err) {
      setError(err);
      console.error("Fail to get employee by ID: ", err);
    }
  };

  const addEmployeeHook = async (employee) => {
    try {
      const newEmployee = await addEmployee(employee);
      setEmployees([...employees, newEmployee]);
    } catch (err) {
      setError(err);
      console.error("Fail to add new employee from hook: ", err);
    }
  };

  const updateEmployeeHook = async (employeeID, employee) => {
    try {
      const updated = await updateEmployee(employeeID, employee);
      setEmployees(
        employees.map((e) => (e.Employee_ID === employeeID ? updated : e))
      );
    } catch (err) {
      setError(err);
      console.error("Fail to update employee from hook: ", err);
    }
  };

  const deleteEmployeeHook = async (employeeID) => {
    try {
      await deleteEmployee(employeeID);
      setEmployees(employees.filter((e) => e.Employee_ID !== employeeID));
    } catch (err) {
      setError(err);
      console.error("Fail to delete employee from hook: ", err);
    }
  };

  return {
    loading,
    error,
    employees,
    getEmployeeById,
    addEmployeeHook,
    updateEmployeeHook,
    deleteEmployeeHook,
  };
};

export default useEmployees;
