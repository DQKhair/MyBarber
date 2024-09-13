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

        [HttpGet("admin/{id}")]
        public async Task<IActionResult> GetAdminInfomation(Guid id)
        {
            try
            {
                var _admin = await _unitOfWork.Administrator.GetByIdAsync(id);
                var _adminVM = AdministratorDTO.AdministratorToAdministratorVM(_admin);
                if (_admin != null && _adminVM != null)
                {
                    _logger.LogInformation("Get admin infomation is success!");
                    return StatusCode(StatusCodes.Status200OK, _adminVM);
                }
                _logger.LogWarning($"Get infomation user by Id: {id} is fail!");
                return StatusCode(StatusCodes.Status400BadRequest);
            }catch (Exception ex)
            {
                _logger.LogError(ex,$"Error get infomation user by Id: {id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("employee/{id}")]
        public async Task<IActionResult> GetEmployeeInfomation(Guid id)
        {
            try
            {
                var _employee = await _unitOfWork.Employees.GetByIdAsync(id);
                var _employeeVM = EmployeesDTO.EmployeeToEmployeesVM(_employee);
                if (_employee != null && _employeeVM != null)
                {
                    _logger.LogInformation("Get employee infomation is success!");
                    return StatusCode(StatusCodes.Status200OK, _employeeVM);
                }

                _logger.LogWarning($"Get infomation user by Id: {id} is fail!");
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error get infomation user by Id: {id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("updateAdmin/{id}")]
        public async Task<ActionResult<AdministratorVM>> UpdateAdminInfomation(Guid id, AdministratorVM administratorVM)
        {
            try
            {
                var _admin = await _unitOfWork.Administrator.GetByIdAsync(id);
                if(_admin != null)
                {
                    var result = await _unitOfWork.Administrator.ModifyAdminInfomation(id, administratorVM);
                    if (result != null)
                    {
                        await _unitOfWork.CompleteAsync();
                        var _adminUpdatedVM = AdministratorDTO.AdministratorToAdministratorVM(result);
                        return StatusCode(StatusCodes.Status200OK, _adminUpdatedVM);
                    }    
                }
                _logger.LogWarning("Update admin infomation is fail");
                return StatusCode(StatusCodes.Status400BadRequest);
            }catch (Exception ex)
            {
                _logger.LogError(ex, $"Error update admin infomation");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
