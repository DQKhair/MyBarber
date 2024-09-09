using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public class FunctionsUserRepository : GenericRepository<FunctionsUser>, IFunctionsUserRepository
    {
        public FunctionsUserRepository(MyDBContext context, ILogger logger) : base(context, logger)
        {
        }

        public async Task<IEnumerable<FunctionsUserVM>> GetFunctionsByRole(Guid roleId)
        {
            try
            {
                var _functions = await ( from f in _context.FunctionsUser
                                         join df in _context.FunctionDetails on f.Function_ID equals df.Function_ID
                                         where df.Role_ID == roleId
                                         select new FunctionsUserVM
                                         {
                                             Function_ID = f.Function_ID,
                                             FunctionName = f.FunctionName,
                                             FunctionIcon = f.FunctionIcon,
                                             FunctionRoute = f.FunctionRoute,
                                         }).ToListAsync();
                if(_functions != null)
                {
                    return _functions;
                }
                return null!;
            }catch (Exception ex)
            {
                _logger.LogError(ex, $"Error get functions by role-Id: {roleId}");
                return null!;
            }
        }
    }
}
