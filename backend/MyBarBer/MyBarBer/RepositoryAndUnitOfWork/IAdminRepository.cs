using MyBarBer.Data;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public interface IAdminRepository : IGenericRepository<Administrator>
    {
        Task<Administrator> IsAuthenticatedAdmin(string email, string password);
    }
}
