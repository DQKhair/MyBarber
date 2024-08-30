
using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;

namespace MyBarBer.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly MyDBContext _context;
        private readonly ILogger _logger;

        public ICategoriesRepository Categories {  get; private set; }

        public UnitOfWork(MyDBContext context, ILoggerFactory loggerFactory)
        {
            _context = context;
            _logger = loggerFactory.CreateLogger("logs");

            Categories = new CategoriesRepository(_context, _logger);
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
