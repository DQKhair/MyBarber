using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyBarBer.Data;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.Controllers
{
    [Authorize(Roles = "Administrator")]
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<EmployeesController> _logger;

        public EmployeesController(IUnitOfWork unitOfWork, ILogger<EmployeesController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<EmployeesVM>>> GetEmployees()
        {
            try
            {
                var _employees = await _unitOfWork.Employees.GetAllAsync();
                if(_employees != null)
                {
                    _logger.LogInformation("Get list employees is success");
                    return StatusCode(StatusCodes.Status200OK, _employees);
                }else
                {
                    _logger.LogWarning("Get list employees is fail");
                    return StatusCode(StatusCodes.Status400BadRequest);
                }
            }catch (Exception ex)
            {
                _logger.LogError("Error get list employees");
                return StatusCode(StatusCodes.Status500InternalServerError, ex);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<EmployeesVM>> GetEmployeeById(Guid id)
        {
            try
            {
               var _employee = await _unitOfWork.Employees.GetByIdAsync(id);
                if (_employee != null)
                {
                    _logger.LogInformation($"Get employee by id: ${id} is success");
                    return StatusCode(StatusCodes.Status200OK, _employee);
                }
                else
                {
                    _logger.LogWarning($"Employees were found: {id}");
                    return StatusCode(StatusCodes.Status404NotFound);
                }
            }catch (Exception ex)
            {
                _logger.LogError(ex, $"Error get employee by id: {id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public async Task<ActionResult<EmployeesVM>> AddEmployee(EmployeesVM employeeVM)
        {
            try
            {
                var _result = await _unitOfWork.Employees.AddNewEmployee(employeeVM);
                if(_result == true)
                {
                    await _unitOfWork.CompleteAsync();
                    _logger.LogInformation($"Add new employee {employeeVM.EmployeeName} is success");
                    return CreatedAtAction(nameof(GetEmployeeById), new { id = employeeVM.Employee_ID }, employeeVM);
                }else
                {
                    _logger.LogWarning($"Add new employee {employeeVM.EmployeeName} is fail");
                    return StatusCode(StatusCodes.Status400BadRequest);
                }
            }catch (Exception ex)
            {
                _logger.LogError(ex, $"Error create new employee {employeeVM.EmployeeName}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteEmployee(Guid id)
        {
            try
            {
                var result = await _unitOfWork.Employees.DeleteAsync(id);
                if(result == true)
                {
                    await _unitOfWork.CompleteAsync();
                    _logger.LogInformation($"Delete employee by Id: {id} success");
                    return StatusCode(StatusCodes.Status200OK);
                }else
                {
                    _logger.LogWarning($"Delete employee by Id: {id} is fail");
                    return StatusCode(StatusCodes.Status400BadRequest);
                }
            }catch (Exception ex)
            {
                _logger.LogError(ex, $"Error delete employee by Id: {id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateEmployee(Guid id, EmployeesVM employeesVM)
        {
            if(id != employeesVM.Employee_ID)
            {
                _logger.LogWarning($"Modify employee by Id: {employeesVM.Employee_ID} is not match");
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            try
            {
                var result = await _unitOfWork.Employees.ModifyEmployee(id, employeesVM);
                if (result == true)
                {
                    await _unitOfWork.CompleteAsync();
                    _logger.LogInformation("Modify employee by Id: {Id} successful!", employeesVM.Employee_ID);
                    return StatusCode(StatusCodes.Status200OK,employeesVM);
                }else
                {
                    _logger.LogWarning($"Modify category by Id: {id} fail!");
                    return StatusCode(StatusCodes.Status400BadRequest);
                }
            }catch (Exception ex)
            {
                _logger.LogError(ex, $"Error modify employee by id: {id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
