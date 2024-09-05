using MyBarBer.Data;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public interface IAuthenticationRepository : IGenericRepository<Employees>
    {
        Task<Employees> IsAuthenticatedEmployee(string email, string password);
    }
}
