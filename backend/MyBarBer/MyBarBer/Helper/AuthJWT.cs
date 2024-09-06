using Microsoft.IdentityModel.Tokens;
using MyBarBer.Data;
using MyBarBer.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace MyBarBer.Helper
{
    public class AuthJWT
    {
        private readonly IConfiguration _configuration;

        public AuthJWT(IConfiguration configuration)
        {
            this._configuration = configuration;
        }

        public string GenerateToken(Employees employees,RolesUser rolesUser)
        {
            try
            {
                var jwtTokenHandler = new JwtSecurityTokenHandler();

                var secretKeyBytes = Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"]?? "ykdcesijauessskiudszeakyxfijwwtj");

                var tokenDescription = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.Name,employees.EmployeeName),
                        new Claim(ClaimTypes.Email,employees.EmployeeEmail),
                        new Claim(ClaimTypes.Role,rolesUser.RoleName),
                        new Claim("User_ID",employees.Employee_ID.ToString()),
                        new Claim("Role_ID",employees.Role_ID.ToString()??""),

                        new Claim("Token_ID", Guid.NewGuid().ToString())
                    }),
                    Expires = DateTime.UtcNow.AddHours(6),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKeyBytes), SecurityAlgorithms.HmacSha256Signature)

                };

                var token = jwtTokenHandler.CreateToken(tokenDescription);
                return jwtTokenHandler.WriteToken(token);
            }
            catch (Exception ex)
            {
                return ex.Message;
            }

        }

        public string GenerateToken(Administrator administrator,RolesUser rolesUser)
        {
            try
            {
                var jwtTokenHandler = new JwtSecurityTokenHandler();

                var secretKeyBytes = Encoding.UTF8.GetBytes(_configuration["JWT:SecretKey"]??"ykdcesijauessskiudszeakyxfijwwtj");

                var tokenDescription = new SecurityTokenDescriptor
                {
                    Subject = new ClaimsIdentity(new[]
                    {
                        new Claim(ClaimTypes.Name,administrator.AdminName),
                        new Claim(ClaimTypes.Email,administrator.AdminEmail),
                        new Claim(ClaimTypes.Role,rolesUser.RoleName),
                        new Claim("User_ID",administrator.Admin_ID.ToString()),
                        new Claim("Role_ID",administrator.Role_ID.ToString()??""),

                        new Claim("Token_ID", Guid.NewGuid().ToString())
                    }),
                    Expires = DateTime.UtcNow.AddHours(6),
                    SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(secretKeyBytes), SecurityAlgorithms.HmacSha256Signature)

                };

                var token = jwtTokenHandler.CreateToken(tokenDescription);
                return jwtTokenHandler.WriteToken(token);
            }
            catch (Exception ex)
            {
                return ex.Message; 
            }
            
        }
    }
}
