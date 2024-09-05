using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;
using MyBarBer.DTO;
using MyBarBer.Helper;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public class EmployeesRepository : GenericRepository<Employees>, IEmployeesRepository
    {
        public EmployeesRepository(MyDBContext context, ILogger logger) : base(context, logger)
        {
        }

        public async Task<bool> AddNewEmployee(EmployeesVM employeesVM)
        {
            try
            {
                if (employeesVM != null)
                {
                    var RoleUser = await _context.RolesUser.FirstOrDefaultAsync(r => r.RoleName == "Employee");
                    if(RoleUser != null)
                    {
                        var _employee = new Employees
                        {
                            Employee_ID = Guid.NewGuid(),
                            EmployeeName = employeesVM.EmployeeName,
                            EmployeeAddress = employeesVM.EmployeeAddress,
                            EmployeePhone = employeesVM.EmployeePhone,
                            EmployeeEmail = employeesVM.EmployeeEmail,
                            EmployeePassword = HashPassword.ConvertPasswordToHash(employeesVM.EmployeePassword),
                            EmployeeIsActive = true,
                            Role_ID = RoleUser.Role_ID,
                        };
                        await _context.Employees.AddAsync(_employee);
                        return true;
                    }else
                    {
                        _logger.LogWarning($"Name role user employee is null");
                        return false;
                    }
                    
                }else
                {
                    _logger.LogWarning("Employee is null");
                    return false;
                }
            }catch (Exception ex)
            {
                _logger.LogError(ex,$"Error create new employee {employeesVM.EmployeeName}");
                return false;
            }
        }

        public async Task<bool> ModifyEmployee(Guid id, EmployeesVM employeesVM)
        {
            try
            {
                var _employeeUpdate = await _context.Employees.FindAsync(id);
                if(_employeeUpdate != null )
                {
                    if(employeesVM != null)
                    {
                        var _employee = EmployeesDTO.EmployeesVMToEmployees(employeesVM, _employeeUpdate);
                        if(_employee != null)
                        {
                            return true;
                        }
                    }
                    _logger.LogWarning($"Modify employee by Id: {id} is fail");
                    return false;
                }
                else
                {
                    _logger.LogWarning($"Modify employee by Id: {id} is fail");
                    return false;
                }

            }catch (Exception ex)
            {
                _logger.LogError(ex, $"Error modify employee by Id: {id}");
                return false ;
            }
        }

    }
}
