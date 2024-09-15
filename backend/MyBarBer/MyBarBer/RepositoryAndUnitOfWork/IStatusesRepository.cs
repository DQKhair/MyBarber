using MyBarBer.Data;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public interface IStatusesRepository : IGenericRepository<Statuses>
    {
        Task<Statuses> GetStatusByName(string name);
    }
}
