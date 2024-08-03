import { useState,useEffect } from "react";
import { fetchEmployees } from "../services/employeeServices"

const useEmployees = () =>{
    const [employees,setEmployees] = useState([]);
    const [selectedEmployee,setSelectedEmployee] = useState(null);

    useEffect(()=>{
        const loadEmployees = async () =>{
            const data = await fetchEmployees();
            setEmployees(data);
        }
        loadEmployees();
    },[]);

    const selectEmployee = (employeeID) => {
        const employee = employees.find((e) => e.Employee_ID === employeeID);
        setSelectedEmployee(employee);
    };
    return {
        employees,
        selectedEmployee,
        selectEmployee
    }
}

export default useEmployees;