using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;
using MyBarBer.Helper;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public class AuthenticationRepository : GenericRepository<Employees>, IAuthenticationRepository
    {
        public AuthenticationRepository(MyDBContext context, ILogger logger) : base(context, logger)
        {
        }

        public async Task<Employees> IsAuthenticatedEmployee(string email, string password)
        { 
            try
            {
                var _employeeLogin = await _context.Employees.SingleOrDefaultAsync(e => e.EmployeeEmail == email);
                if (_employeeLogin != null)
                {
                    bool CheckPass = HashPassword.VerifyPassword(password, _employeeLogin.EmployeePassword);
                    if (CheckPass)
                    {
                        return _employeeLogin;
                    }    
                }
                _logger.LogWarning("Authentication employee is fail");
                return null!;
            }catch (Exception ex)
            {
                _logger.LogError(ex, "Error Authentication");
                return null!;
            }
        }
    }
}
