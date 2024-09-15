using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public class StatusesRepository : GenericRepository<Statuses>, IStatusesRepository
    {
        public StatusesRepository(MyDBContext context, ILogger logger) : base(context, logger)
        {
        }

        public async Task<Statuses> GetStatusByName(string name)
        {
            try
            {
                var _status = await _context.Statuses.SingleOrDefaultAsync(s => s.StatusName == name);
                if (_status != null)
                {
                    return _status;
                }
                _logger.LogWarning($"Get status by name {name} is fail!");
                return null!;
            }catch (Exception ex)
            {
                _logger.LogError(ex, $"Error get status by name {name}");
                return null!;
            }
        }
    }
}
