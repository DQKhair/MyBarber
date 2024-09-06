
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

        public UnitOfWork(MyDBContext context, ILoggerFactory loggerFactory)
        {
            _context = context;
            _logger = loggerFactory.CreateLogger("logs");

            AuthenticationRepository = new AuthenticationRepository(_context,_logger);
            RolesUser = new RolesUserRepository(_context,_logger);
            Administrator = new AdminRepository(_context,_logger);
            Categories = new CategoriesRepository(_context, _logger);
            Employees = new EmployeesRepository(_context, _logger);
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
