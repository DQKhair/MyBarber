using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public class RolesUserRepository : GenericRepository<RolesUser>, IRolesUserRepository
    {
        public RolesUserRepository(MyDBContext context, ILogger logger) : base(context, logger)
        {
        }

        public async Task<RolesUser> GetRoleUserById(Guid id)
        {
            try
            {
                var roleUser = await _context.RolesUser.SingleOrDefaultAsync(r => r.Role_ID == id);
                if (roleUser != null)
                {
                    return roleUser;
                }
                _logger.LogWarning($"Get role user by id: {id} is fail!");
                return null!;
            }catch (Exception ex)
            {
                _logger.LogError(ex, $"Error get role user by id: {id}");
                return null!;
            }
        }
    }
}
