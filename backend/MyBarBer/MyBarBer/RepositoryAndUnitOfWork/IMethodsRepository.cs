using MyBarBer.Data;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public interface IMethodsRepository : IGenericRepository<Methods>
    {
        Task<Methods> GetMethodByName(string name);
    }
}
