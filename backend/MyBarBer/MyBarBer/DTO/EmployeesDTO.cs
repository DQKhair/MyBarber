using MyBarBer.Data;
using MyBarBer.Helper;
using MyBarBer.Models;

namespace MyBarBer.DTO
{
    public class EmployeesDTO
    {
        public static Employees EmployeesVMToEmployees(EmployeesVM employeesVM, Employees employees)
        {
            try
            {
                if(employeesVM != null && employees != null)
                {
                    employees.EmployeeName = employeesVM.EmployeeName;
                    employees.EmployeePhone = employeesVM.EmployeePhone;
                    employees.EmployeeAddress = employeesVM.EmployeeAddress;
                    employees.EmployeeEmail = employeesVM.EmployeeEmail;
                    employees.EmployeePassword = HashPassword.ConvertPasswordToHash(employeesVM.EmployeePassword);
                    employees.EmployeeIsActive = employeesVM.EmployeeIsActive;

                    return employees;
                }
                return null!;
            }catch
            {
                return null!;
            }
        }

        public static EmployeesVM EmployeeToEmployeesVM(Employees employees)
        {
            try
            {
                if(employees != null)
                {
                    var _employeeVM = new EmployeesVM
                    { 
                        Employee_ID = employees.Employee_ID,
                        EmployeeName = employees.EmployeeName,
                        EmployeePhone = employees.EmployeePhone,
                        EmployeeAddress = employees.EmployeeAddress,
                        EmployeeEmail = employees.EmployeeEmail,
                        EmployeePassword = employees.EmployeePassword,
                        EmployeeIsActive = employees.EmployeeIsActive,
                        Role_ID = employees.Role_ID
                    };
                
                    return _employeeVM;
                }    
                return null!;
            }
            catch
            {
                return null!;
            }
        }

        public static IEnumerable<EmployeesVM> ListEmployeeToListEmployeesVM(IEnumerable<Employees> employeesList)
        {
            try
            {
                if(employeesList != null)
                {
                    var _employeeVM = employeesList.Select(employee => new EmployeesVM
                    {
                        Employee_ID = employee.Employee_ID,
                        EmployeeName = employee.EmployeeName,
                        EmployeePhone = employee.EmployeePhone,
                        EmployeeAddress = employee.EmployeeAddress,
                        EmployeeEmail = employee.EmployeeEmail,
                        EmployeePassword = employee.EmployeePassword,
                        EmployeeIsActive = employee.EmployeeIsActive,
                        Role_ID = employee.Role_ID
                    }).ToList();
                    return _employeeVM;
                }    
                return null!;
            }
            catch
            {
                return null!;
            }
        }

        public static Employees CreateNewEmployee(EmployeesVM employeesVM,Guid roleId)
        {
            try
            {
                if (employeesVM != null)
                {
                    var _employee = new Employees
                    {
                        Employee_ID = Guid.NewGuid(),
                        EmployeeName = employeesVM.EmployeeName,
                        EmployeePhone = employeesVM.EmployeePhone,
                        EmployeeAddress = employeesVM.EmployeeAddress,
                        EmployeeEmail = employeesVM.EmployeeEmail,
                        EmployeePassword = HashPassword.ConvertPasswordToHash(employeesVM.EmployeePassword),
                        EmployeeIsActive = true,
                        Role_ID = roleId
                    };
                    return _employee;
                } 
                return null!;

            }catch
            {
                return null!;
            }
        }
    }
}
