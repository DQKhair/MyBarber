using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyBarBer.DTO;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.Controllers
{
    [Authorize(policy: "RequireAdminRoleAndEmployeeRole")]
    [Route("api/[controller]")]
    [ApiController]
    public class UserInfosController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<UserInfosController> _logger;

        public UserInfosController(IUnitOfWork unitOfWork, ILogger<UserInfosController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        [HttpGet("user/{id}")]
        public async Task<ActionResult<UserVM>> GetAdminInfomation(Guid id)
        {
            try
            {
                var _admin = await _unitOfWork.Administrator.GetByIdAsync(id);
                if (_admin != null)
                {
                    var _adminVM = AdministratorDTO.AdministratorToAdministratorVM(_admin);
                    if (_admin != null && _adminVM != null)
                    {
                        var _userVM = UsersDTO.ConvertToUserVM(_adminVM);
                        if( _userVM != null )
                        {
                            _logger.LogInformation("Get admin infomation is success!");
                            return StatusCode(StatusCodes.Status200OK, _userVM);
                        }
                    }
                    _logger.LogWarning($"Get infomation user by Id: {id} is fail!");
                    return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Fail to get infomation" });
                }else
                {
                    var _employee = await _unitOfWork.Employees.GetByIdAsync(id);
                    var _employeeVM = EmployeesDTO.EmployeeToEmployeesVM(_employee);
                    if (_employee != null && _employeeVM != null)
                    {
                        var _userVM = UsersDTO.ConvertToUserVM(_employeeVM);
                        if ( _userVM != null )
                        {
                            _logger.LogInformation("Get employee infomation is success!");
                            return StatusCode(StatusCodes.Status200OK, _userVM);
                        }
                    }
                    _logger.LogWarning($"Get infomation user by Id: {id} is fail!");
                    return StatusCode(StatusCodes.Status400BadRequest,new APIResVM { Success = false, Message = "Fail to get infomation"});
                }
               
            }catch (Exception ex)
            {
                _logger.LogError(ex,$"Error get infomation user by Id: {id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("updateAdmin/{id}")]
        public async Task<ActionResult<AdministratorVM>> UpdateAdminInformation(Guid id, UserVM userVM)
        {
            try
            {
                var _admin = await _unitOfWork.Administrator.GetByIdAsync(id);
                if(_admin != null)
                {
                    var result = await _unitOfWork.Administrator.ModifyAdminInfomation(id, userVM);
                    if (result != null)
                    {
                        await _unitOfWork.CompleteAsync();
                        var _adminUpdatedVM = AdministratorDTO.AdministratorToAdministratorVM(result);
                        if (_adminUpdatedVM != null)
                        {
                            return StatusCode(StatusCodes.Status200OK, _adminUpdatedVM);
                        }
                    }    
                }
                _logger.LogWarning("Update admin information is fail");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Fail to update information" });
            }catch (Exception ex)
            {
                _logger.LogError(ex, $"Error update admin information");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("updateEmployee/{id}")]
        public async Task<ActionResult<AdministratorVM>> UpdateEmployeeInformation(Guid id, UserVM userVM)
        {
            try
            {
                var _employee = await _unitOfWork.Employees.GetByIdAsync(id);
                if (_employee != null)
                {
                    var _employeeVMUpdated = await _unitOfWork.Employees.ModifyEmployeeInfomation(id, userVM);
                    if (_employeeVMUpdated != null)
                    {
                        await _unitOfWork.CompleteAsync();
                        return StatusCode(StatusCodes.Status200OK, _employeeVMUpdated);
                    }
                }
                _logger.LogWarning("Update employee information is fail");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Fail to update information" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error update employee information");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
