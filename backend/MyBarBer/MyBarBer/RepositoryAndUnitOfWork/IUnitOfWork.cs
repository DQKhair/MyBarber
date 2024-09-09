using MyBarBer.RepositoryAndUnitOfWork;

namespace MyBarBer.Repository
{
    public interface IUnitOfWork : IDisposable
    {
        IAuthenticationRepository AuthenticationRepository { get; }
        IRolesUserRepository RolesUser { get; }
        IAdminRepository Administrator { get; }
        ICategoriesRepository Categories { get; }
        IEmployeesRepository Employees { get; }
        ICustomersRepository Customers { get; }
        IFunctionsUserRepository FunctionsUser { get; }

        Task<bool> CompleteAsync();
    }
}
