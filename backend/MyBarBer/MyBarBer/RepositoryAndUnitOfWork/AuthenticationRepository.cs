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

        public async Task<bool> ForgotPassword(IConfiguration configuration, string email)
        {
            try
            {
                if (email != null)
                {
                    var _user = await _context.Employees.SingleOrDefaultAsync(e => e.EmployeeEmail == email);
                    if (_user != null)
                    {
                        Random random = new Random();
                        int numRD = random.Next(1000, 9999);
                        string _newPassword = $"Mybarber_{numRD}";
                        string subject = "Reset password";
                        string message = $"Password: {_newPassword}";

                        _user.EmployeePassword = HashPassword.ConvertPasswordToHash(_newPassword);
                        var updated = await _context.SaveChangesAsync();
                        if(updated > 0)
                        {
                            var sendMail = await MailServices.SenEmailAsync(email, subject, message, _logger, configuration);
                            if(sendMail)
                            {
                                return true;
                            }    
                        }    
                    }
                }
                _logger.LogWarning($"Send Mail to email {email} is fail");
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error send mail to email {email}");
                return false;
            }
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
