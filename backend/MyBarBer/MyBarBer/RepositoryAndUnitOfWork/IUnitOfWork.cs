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
        IItemCategoriesRepository ItemCategories { get; }
        IReceiptsRepository Receipts { get; }
        IReceiptDetailsRepository ReceiptDetails { get; }
        IMethodsRepository Methods { get; }
        IStatusesRepository Statuss { get; }
        IStatisticsRepository Statistics { get; }

        Task<bool> CompleteAsync();
    }
}
