using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyBarBer.Data;
using MyBarBer.DTO;
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
                var _employeesVM = EmployeesDTO.ListEmployeeToListEmployeesVM(_employees);
                if(_employees != null && _employeesVM != null)
                {
                    _logger.LogInformation("Get list employees is success");
                    return StatusCode(StatusCodes.Status200OK, _employeesVM);
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
                var _employeeVM = EmployeesDTO.EmployeeToEmployeesVM(_employee);
                if (_employee != null && _employeeVM != null)
                {
                    _logger.LogInformation($"Get employee by id: ${id} is success");
                    return StatusCode(StatusCodes.Status200OK, _employeeVM);
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
                var _checkPhoneNumberExists = await _unitOfWork.Employees.GetEmployeeByPhone(employeeVM.EmployeePhone);
                var _checkEmailExists = await _unitOfWork.Employees.GetEmployeeByEmail(employeeVM.EmployeeEmail);

                if(_checkEmailExists == null)
                {
                    if (_checkPhoneNumberExists == null)
                    {
                        bool _result = await _unitOfWork.Employees.AddNewEmployee(employeeVM);
                        if(_result == true)
                        {
                            await _unitOfWork.CompleteAsync();

                            var _employeeNewVM = await _unitOfWork.Employees.GetEmployeeByEmail(employeeVM.EmployeeEmail);
                            if(_employeeNewVM != null)
                            {
                                _logger.LogInformation($"Create new employee {_employeeNewVM.EmployeeName} is success");
                                return CreatedAtAction(nameof(GetEmployeeById), new { id = _employeeNewVM.Employee_ID }, _employeeNewVM);
                            }else
                            {
                                _logger.LogWarning($"Add new employee {employeeVM.EmployeeName} is fail");
                                return StatusCode(StatusCodes.Status400BadRequest);
                            }    
                        }else
                        {
                            _logger.LogWarning($"Add new employee {employeeVM.EmployeeName} is fail");
                            return StatusCode(StatusCodes.Status400BadRequest);
                        }
                    }else
                    {
                        _logger.LogWarning("Add new employee is fail with phone number already exists");
                        return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "This phone number already exists " });
                    }    
                } else
                {
                    _logger.LogWarning("Add new employee is fail with email already exists");
                    return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "This email already exists " } );
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
        public async Task<IActionResult> UpdateEmployee(Guid id, EmployeesVM employeeVM)
        {
            try
            {
                var _employee = await _unitOfWork.Employees.GetByIdAsync(id);
                string _phoneNumberOld = _employee.EmployeePhone;
                string _emailOld = _employee.EmployeeEmail;
                  
                var result = await _unitOfWork.Employees.ModifyEmployee(id, employeeVM);
                if (result == true)
                {
                    if(_phoneNumberOld == employeeVM.EmployeePhone && _emailOld == employeeVM.EmployeeEmail)
                    {
                        await _unitOfWork.CompleteAsync();

                        var _updatedEmployee = await _unitOfWork.Employees.GetEmployeeByEmail(employeeVM.EmployeeEmail);
                        if (_updatedEmployee != null)
                        {
                            _logger.LogInformation("Modify employee by Id: {Id} successful!", _updatedEmployee.Employee_ID);
                            return StatusCode(StatusCodes.Status200OK, _updatedEmployee);
                        }else
                        {
                            _logger.LogWarning($"Modify category by Id: {id} fail!");
                            return StatusCode(StatusCodes.Status400BadRequest);
                        }    
                    }else
                    {
                        if(_phoneNumberOld == employeeVM.EmployeePhone)
                        {
                            var _checkEmailExists = await _unitOfWork.Employees.GetEmployeeByEmail(employeeVM.EmployeeEmail);

                            if(_checkEmailExists == null)
                            {
                                await _unitOfWork.CompleteAsync();

                                var _employeeUpdatedVM = await _unitOfWork.Employees.GetEmployeeByEmail(employeeVM.EmployeeEmail);
                                if (_employeeUpdatedVM != null)
                                {
                                    _logger.LogInformation("Update employee by Id: {Id} successful!", _employeeUpdatedVM.Employee_ID);
                                    return StatusCode(StatusCodes.Status200OK, _employeeUpdatedVM);
                                }else
                                {
                                    _logger.LogWarning($"Modify employee {id} is fail!");
                                    return StatusCode(StatusCodes.Status400BadRequest);
                                }    
                            }
                            else
                            {
                                _logger.LogWarning($"Modify employee {id} is fail with email already exists");
                                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "This email already exists " });
                            }
                        }
                        else if(_emailOld == employeeVM.EmployeeEmail)
                        {
                            var _checkPhoneNumberExists = await _unitOfWork.Employees.GetEmployeeByPhone(employeeVM.EmployeePhone);

                            if (_checkPhoneNumberExists == null)
                            {
                                    await _unitOfWork.CompleteAsync();
                                var _employeeUpdatedVM = await _unitOfWork.Employees.GetEmployeeByEmail(employeeVM.EmployeeEmail);
                                if (_employeeUpdatedVM != null)
                                {
                                    _logger.LogInformation("Update employee by Id: {Id} successful!", _employeeUpdatedVM.Employee_ID);
                                    return StatusCode(StatusCodes.Status200OK, _employeeUpdatedVM);
                                }
                                else
                                {
                                    _logger.LogWarning($"Update employee {id} is fail!");
                                    return StatusCode(StatusCodes.Status400BadRequest);
                                }    
                            }
                            else
                            {
                                _logger.LogWarning($"Update employee {id} is fail with phone number already exists");
                                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "This phone number already exists " });
                            }
                        }
                        else
                        {
                            var _checkEmailExists = await _unitOfWork.Employees.GetEmployeeByEmail(employeeVM.EmployeeEmail);
                            var _checkPhoneNumberExists = await _unitOfWork.Employees.GetEmployeeByPhone(employeeVM.EmployeePhone);

                            if (_checkPhoneNumberExists == null)
                            {
                                if (_checkEmailExists == null)
                                {
                                    await _unitOfWork.CompleteAsync();

                                    var _employeeUpdatedVM = await _unitOfWork.Employees.GetEmployeeByEmail(employeeVM.EmployeeEmail);
                                    if (_employeeUpdatedVM != null)
                                    {
                                        _logger.LogInformation("Update employee by Id: {Id} successful!", _employeeUpdatedVM.Employee_ID);
                                        return StatusCode(StatusCodes.Status200OK, _employeeUpdatedVM);
                                    }else
                                    {
                                        _logger.LogWarning($"Modify employee {id} is fail!");
                                        return StatusCode(StatusCodes.Status400BadRequest);
                                    }    
                                }
                                else
                                {
                                    _logger.LogWarning($"Modify employee {id} is fail with email already exists");
                                    return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "This email already exists " });
                                }
                            }
                            else
                            {
                                _logger.LogWarning($"Update employee {id} is fail with phone number already exists");
                                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "This phone number already exists " });
                            }
                        }    
                    }    
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
