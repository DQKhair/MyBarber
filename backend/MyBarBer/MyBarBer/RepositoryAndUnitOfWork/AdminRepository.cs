using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;
using MyBarBer.Helper;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public class AdminRepository : GenericRepository<Administrator>, IAdminRepository
    {
        public AdminRepository(MyDBContext context, ILogger logger) : base(context, logger)
        {
        }

        public async Task<Administrator> IsAuthenticatedAdmin(string email, string password)
        {
            try
            {
                var _admin = await _context.Administrators.SingleOrDefaultAsync(ad => ad.AdminEmail == email);
                if (_admin != null)
                {
                    bool checkPass = HashPassword.VerifyPassword(password, _admin.AdminPassword);
                    if (checkPass)
                    {
                        return _admin;
                    }    
                }
                _logger.LogWarning("Authentication admin is fail");
                return null!;
            }catch(Exception ex)
            {
                _logger.LogError(ex, "Error Authentication admin");
                return null!;
            }
        }
    }
}
