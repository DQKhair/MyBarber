using MyBarBer.RepositoryAndUnitOfWork;

namespace MyBarBer.Repository
{
    public interface IUnitOfWork : IDisposable
    {
        IAuthenticationRepository AuthenticationRepository { get; }
        IAdminRepository Administrator { get; }
        ICategoriesRepository Categories { get; }
        IEmployeesRepository Employees { get; }

        Task<bool> CompleteAsync();
    }
}
