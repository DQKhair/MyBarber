using MyBarBer.Data;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public interface IAdminRepository : IGenericRepository<Administrator>
    {
        Task<Administrator> IsAuthenticatedAdmin(string email, string password);
        Task<Administrator> ModifyAdminInfomation(Guid id, AdministratorVM administratorVM);
    }
}
