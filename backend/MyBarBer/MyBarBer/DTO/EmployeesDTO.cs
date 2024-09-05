using MyBarBer.Data;
using MyBarBer.Helper;
using MyBarBer.Models;

namespace MyBarBer.DTO
{
    public class EmployeesDTO
    {
        private static readonly ILogger<EmployeesDTO>? _logger;

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
            }catch (Exception ex)
            {
                _logger?.LogError(ex, "Error convert employeesVM to employees");
                return null!;
            }
        }

        public static EmployeesVM EmployeeToEmployeesVM(Employees employees, EmployeesVM employeesVM)
        {
            try
            {
                employeesVM.Employee_ID = employees.Employee_ID;
                employeesVM.EmployeeName = employees.EmployeeName;
                employeesVM.EmployeePhone = employees.EmployeePhone;
                employeesVM.EmployeeAddress = employees.EmployeeAddress;
                employeesVM.EmployeeEmail = employees.EmployeeEmail;
                employeesVM.EmployeePassword = employees.EmployeePassword;
                employeesVM.EmployeeIsActive = employees.EmployeeIsActive;
                employeesVM.Role_ID = employees.Role_ID;

                return employeesVM;
            }
            catch (Exception ex)
            {
                _logger?.LogError(ex, "Error convert employees to employeesVM");
                return null!;
            }
        }
    }
}
