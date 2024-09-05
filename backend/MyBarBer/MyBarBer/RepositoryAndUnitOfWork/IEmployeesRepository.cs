using MyBarBer.Data;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public interface IEmployeesRepository : IGenericRepository<Employees>
    {
        Task<bool> AddNewEmployee(EmployeesVM employeeVM);
        Task<bool> ModifyEmployee(Guid id, EmployeesVM employeesVM);
    }
}
