using Microsoft.EntityFrameworkCore;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
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
                    var _roleUser = await _context.RolesUser.FirstOrDefaultAsync(r => r.RoleName == "Employee");
                    if(_roleUser != null)
                    {
                        var _employee = EmployeesDTO.CreateNewEmployee(employeesVM, _roleUser.Role_ID);
                        if(_employee != null)
                        {
                            await _context.Employees.AddAsync(_employee);
                            return true;
                        }
                        _logger.LogWarning($"Create employee is fail");
                        return false;
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

        public async Task<EmployeesVM> GetEmployeeByEmail(string email)
        {
            try
            {
                var _employee = await _context.Employees.FirstOrDefaultAsync(e => e.EmployeeEmail == email);
                if (_employee != null)
                {
                    var _employeeVM = EmployeesDTO.EmployeeToEmployeesVM(_employee);
                    if (_employeeVM != null)
                    {
                        return _employeeVM;
                    }
                }
                return null!;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error get employee by email: {email}");
                return null!;
            }
        }

        public async Task<EmployeesVM> GetEmployeeByPhone(string phone)
        {
            try
            {
                var _employee = await _context.Employees.FirstOrDefaultAsync(e => e.EmployeePhone == phone);
                if (_employee != null)
                {
                    var _employeeVM = EmployeesDTO.EmployeeToEmployeesVM(_employee);
                    if (_employeeVM != null)
                    {
                        return _employeeVM;
                    }    
                }    
                return null!;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error get employee by phone number: {phone}");
                return null!;
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
