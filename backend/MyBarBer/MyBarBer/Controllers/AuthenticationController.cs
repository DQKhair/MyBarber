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

        [HttpPost("Forgot_Password")]
        public async Task<IActionResult> ForgotPassword(ForgotPasswordVM forgotPasswordVM)
        {
            try
            {
                if (forgotPasswordVM.Email != null)
                {
                    var result = await _unitOfWork.AuthenticationRepository.ForgotPassword(_configuration, forgotPasswordVM.Email);
                    if(result)
                    {
                        _logger.LogInformation($"Sen mail to email {forgotPasswordVM.Email} is success");
                        return StatusCode(StatusCodes.Status200OK, new APIResVM { Success = true, Message = "Reset password is success. Please! check your mail." });
                    }    
                }_logger.LogWarning($"Send mail to email {forgotPasswordVM.Email} is fail!");
                return StatusCode(StatusCodes.Status400BadRequest,new APIResVM { Success = false, Message = "Email is not exists!"});
            }catch (Exception ex)
            {
                _logger.LogError(ex,"Error reset password");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost("Login")]
        public async Task<ActionResult> LoginUser(LoginVM loginVM)
        {
            AuthJWT authJWT = new AuthJWT(_configuration);
            try
            {
                if(loginVM.email != null && loginVM.password != null)
                {

                    var resultAdmin = await _unitOfWork.Administrator.IsAuthenticatedAdmin(loginVM.email, loginVM.password);
                    if(resultAdmin != null)
                    {
                        var _roleUser = await _unitOfWork.RolesUser.GetByIdAsync(Guid.Parse(resultAdmin.Role_ID.ToString()??""));
                        if(_roleUser != null)
                        {
                            _logger.LogInformation("Login admin is success!");
                            return StatusCode(StatusCodes.Status200OK, new APIAuthenticationResVM
                            {
                                Success = true,
                                Message = "Authentication success",
                                AccessToken = authJWT.GenerateToken(resultAdmin, _roleUser)
                            });
                        }    
                    }
                    else
                    {
                        var resultEmployee = await _unitOfWork.AuthenticationRepository.IsAuthenticatedEmployee(loginVM.email, loginVM.password);
                        if (resultEmployee != null)
                        {
                            if (resultEmployee.EmployeeIsActive == true)
                            {
                                var _roleUser = await _unitOfWork.RolesUser.GetByIdAsync(Guid.Parse(resultEmployee.Role_ID.ToString() ?? ""));

                                if(_roleUser != null)
                                {
                                    _logger.LogInformation("Login employee is success!");
                                    return StatusCode(StatusCodes.Status200OK, new APIAuthenticationResVM
                                    {
                                        Success = true,
                                        Message = "Authentication success",
                                        AccessToken = authJWT.GenerateToken(resultEmployee, _roleUser)
                                    });
                                }  
                                
                            }
                            else
                            {
                                _logger.LogWarning("Authentication user is fail");
                                return StatusCode(StatusCodes.Status400BadRequest, new APIAuthenticationResVM
                                {
                                    Success = false,
                                    Message = "Your account has been locked."
                                });
                            }    
                        }
                    }
                    _logger.LogWarning("Authentication user is fail");
                    return StatusCode(StatusCodes.Status400BadRequest, new APIAuthenticationResVM 
                    { Success = false,
                        Message = "Email or password is incorrect" 
                    });
                }
                _logger.LogWarning("Authentication user is fail");
                return StatusCode(StatusCodes.Status400BadRequest, new APIAuthenticationResVM
                {
                    Success = false,
                    Message = "Email or password is incorrect"
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error login user");
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

    }
}
