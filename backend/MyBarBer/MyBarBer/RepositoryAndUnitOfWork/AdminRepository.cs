using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;
using MyBarBer.DTO;
using MyBarBer.Helper;
using MyBarBer.Models;
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

        public async Task<Administrator> ModifyAdminInfomation(Guid id,AdministratorVM administratorVM)
        {
           try
            {
                if(administratorVM != null)
                {
                    var _admin = await _context.Administrators.FindAsync(id);
                    if(_admin != null)
                    {
                        var _adminUpdate = AdministratorDTO.AdministratorVMToAdministrator(administratorVM,_admin);
                        if (_adminUpdate != null)
                        {
                            return _adminUpdate;
                        }    
                    }    
                }    
                _logger.LogWarning("Modify admin infomation is fail");
                return null!;
            }catch(Exception ex)
            {
                _logger.LogError(ex,"Error modify admin infomation!");
                return null!;
            }
        }
    }
}
