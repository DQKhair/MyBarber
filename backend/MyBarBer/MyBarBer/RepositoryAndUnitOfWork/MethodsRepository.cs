using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public class MethodsRepository : GenericRepository<Methods>, IMethodsRepository
    {
        public MethodsRepository(MyDBContext context, ILogger logger) : base(context, logger)
        {
        }

        public async Task<Methods> GetMethodByName(string name)
        {
            try
            {
                var _method = await _context.Methods.SingleOrDefaultAsync(m => m.MethodName == name);
                if (_method != null)
                {
                    return _method;
                }
                _logger.LogWarning($"Get method by name {name} is fail!");
                return null!;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error get method by name {name}");
                return null!;
            }
        }
    }
}
