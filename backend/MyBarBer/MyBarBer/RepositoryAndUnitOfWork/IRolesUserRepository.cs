using MyBarBer.Data;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public interface IRolesUserRepository : IGenericRepository<RolesUser>
    {
        Task<RolesUser> GetRoleUserById(Guid id);
    }
}
