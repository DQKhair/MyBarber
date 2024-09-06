using Microsoft.AspNetCore.Mvc;
using MyBarBer.Repository;
using MyBarBer.Models;
using MyBarBer.Helper;

namespace MyBarBer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<AuthenticationController> _logger;
        private readonly IConfiguration _configuration;

        public AuthenticationController(IUnitOfWork unitOfWork, ILogger<AuthenticationController> logger, IConfiguration configuration)
        {
            this._unitOfWork = unitOfWork;
            _logger = logger;
            _configuration = configuration;
        }

        [HttpPost("Login")]
        public async Task<ActionResult> LoginUser(string email, string password)
        {
            AuthJWT authJWT = new AuthJWT(_configuration);
            try
            {

                var resultAdmin = await _unitOfWork.Administrator.IsAuthenticatedAdmin(email,password);
                if(resultAdmin != null)
                {
                    var _roleUser = await _unitOfWork.RolesUser.GetByIdAsync(Guid.Parse(resultAdmin.Role_ID.ToString()??""));
                    if(_roleUser != null)
                    {
                        _logger.LogInformation("Login admin is success!");
                        return StatusCode(StatusCodes.Status200OK, new APIResVM
                        {
                            Success = true,
                            Message = "Authentication success",
                            Data = authJWT.GenerateToken(resultAdmin, _roleUser)
                        });
                    }    
                }
                else
                {
                    var resultEmployee = await _unitOfWork.AuthenticationRepository.IsAuthenticatedEmployee(email,password);
                    if (resultEmployee != null)
                    {
                        var _roleUser = await _unitOfWork.RolesUser.GetByIdAsync(Guid.Parse(resultEmployee.Role_ID.ToString() ?? ""));

                        if(_roleUser != null)
                        {
                            _logger.LogInformation("Login employee is success!");
                            return StatusCode(StatusCodes.Status200OK, new APIResVM
                            {
                                Success = true,
                                Message = "Authentication success",
                                Data = authJWT.GenerateToken(resultEmployee, _roleUser)
                            });
                        }    
                    }
                }
                _logger.LogWarning("Authentication user is fail");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM 
                { Success = false,
                    Message = "Email or password is incorrect" 
                });
            }catch (Exception ex)
            {
                _logger.LogError(ex, "Error login user");
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

    }
}
