
using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;
using MyBarBer.RepositoryAndUnitOfWork;

namespace MyBarBer.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly MyDBContext _context;
        private readonly ILogger _logger;

        public IAuthenticationRepository AuthenticationRepository { get; private set; }
        public IRolesUserRepository RolesUser { get; private set; }
        public IAdminRepository Administrator { get; private set; }
        public ICategoriesRepository Categories {  get; private set; }
        public IEmployeesRepository Employees { get; private set; }
        public ICustomersRepository Customers { get; private set; }
        public IFunctionsUserRepository FunctionsUser { get; private set; }
        public IItemCategoriesRepository ItemCategories { get; private set; }
        public IReceiptsRepository Receipts { get; private set; }
        public IReceiptDetailsRepository ReceiptDetails { get; private set; }
        public IMethodsRepository Methods { get; private set; }
        public IStatusesRepository Statuss { get; private set; }

        public UnitOfWork(MyDBContext context, ILoggerFactory loggerFactory)
        {
            _context = context;
            _logger = loggerFactory.CreateLogger("logs Entity");

            AuthenticationRepository = new AuthenticationRepository(_context,_logger);
            RolesUser = new RolesUserRepository(_context,_logger);
            Administrator = new AdminRepository(_context,_logger);
            Categories = new CategoriesRepository(_context, _logger);
            Employees = new EmployeesRepository(_context, _logger);
            Customers = new CustomerRepository(_context,_logger);
            FunctionsUser = new FunctionsUserRepository(_context,_logger);
            ItemCategories = new ItemCategoriesRepository(_context,_logger);
            Receipts = new ReceiptsRepository(_context,_logger);
            ReceiptDetails = new ReceiptDetailsRepository(_context,_logger);
            Methods = new MethodsRepository(_context,_logger);
            Statuss = new StatusesRepository(_context,_logger);
        }

        public async Task<bool> CompleteAsync()
        {
            try
            {
                await _context.SaveChangesAsync();
                return true;
            }catch (Exception ex)
            {
                _logger.LogError(ex, "Error save change");
                return false;
            }
        }

        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
