using MyBarBer.Data;
using MyBarBer.Repository;
using MyBarBer.Models;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public interface IFunctionsUserRepository : IGenericRepository<FunctionsUser>
    {
        Task<IEnumerable<FunctionsUserVM>> GetFunctionsByRole(Guid roleId);
    }
}
