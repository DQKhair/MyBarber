using MyBarBer.Data;
using MyBarBer.Helper;
using MyBarBer.Models;

namespace MyBarBer.DTO
{
    public class UsersDTO
    {
        public static UserVM ConvertToUserVM(AdministratorVM administratorVM)
        {
            try
            {
                if (administratorVM != null)
                {
                    var _userVM = new UserVM
                    {
                        User_ID = administratorVM.Admin_ID,
                        UserName = administratorVM.AdminName,
                        UserPhone = administratorVM.AdminPhone,
                        UserAddress = administratorVM.AdminAddress,
                        UserEmail = administratorVM.AdminEmail,
                        UserPassword = administratorVM.AdminPassword,

                    };
                    if (_userVM != null)
                    {
                        return _userVM;
                    }
                }
                return null!;
            }
            catch
            {
                return null!;
            }
        }

        public static UserVM ConvertToUserVM(EmployeesVM employeesVM)
        {
            try
            {
                if (employeesVM != null)
                {
                    var _userVM = new UserVM
                    {
                        User_ID = employeesVM.Employee_ID,
                        UserName = employeesVM.EmployeeName,
                        UserPhone = employeesVM.EmployeePhone,
                        UserAddress = employeesVM.EmployeeAddress,
                        UserEmail = employeesVM.EmployeeEmail,
                        UserPassword = employeesVM.EmployeePassword,
                    };
                    if (_userVM != null)
                    {
                        return _userVM;
                    }
                }
                return null!;
            }
            catch
            {
                return null!;
            }
        }

        public static Administrator UserVMToAdministrator(UserVM userVM, Administrator administrator)
        {
            try
            {
                if (userVM != null && administrator != null)
                {
                    administrator.AdminName = userVM.UserName;
                    administrator.AdminPhone = userVM.UserPhone;
                    administrator.AdminAddress = userVM.UserAddress;
                    administrator.AdminPassword = HashPassword.ConvertPasswordToHash(userVM.UserPassword);

                    return administrator;
                }
                return null!;
            }
            catch
            {
                return null!;
            }
        }

        public static Employees UserVMToEmployee(UserVM userVM, Employees employees)
        {
            try
            {
                if (userVM != null && employees != null)
                {
                    employees.EmployeeName = userVM.UserName;
                    employees.EmployeePhone = userVM.UserPhone;
                    employees.EmployeeAddress = userVM.UserAddress;
                    employees.EmployeePassword = HashPassword.ConvertPasswordToHash(userVM.UserPassword);

                    return employees;
                }
                return null!;
            }
            catch
            {
                return null!;
            }
        }
    }
}
