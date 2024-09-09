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
                employees.EmployeeName = employeesVM.EmployeeName;
                employees.EmployeePhone = employeesVM.EmployeePhone;
                employees.EmployeeAddress = employeesVM.EmployeeAddress;
                employees.EmployeeEmail = employeesVM.EmployeeEmail;
                employees.EmployeePassword = HashPassword.ConvertPasswordToHash(employeesVM.EmployeePassword);
                employees.EmployeeIsActive = employeesVM.EmployeeIsActive;

                return employees;
            }catch
            {
                return null!;
            }
        }

        public static EmployeesVM EmployeeToEmployeesVM(Employees employees)
        {
            try
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
            catch
            {
                return null!;
            }
        }

        public static Employees CreateNewEmployee(EmployeesVM employeesVM,Guid roleId)
        {
            try
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
            }catch
            {
                return null!;
            }
        }
    }
}
