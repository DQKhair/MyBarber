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
    public class CustomersController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<CustomersController> _logger;

        public CustomersController(IUnitOfWork unitOfWork, ILogger<CustomersController> logger)
        {
            this._unitOfWork = unitOfWork;
            this._logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CustomersVM>>> GetCustomers()
        {
            try
            {
                var _customers = await _unitOfWork.Customers.GetAllAsync();
                var _customersVM = CustomersDTO.ListCustomersToListCustomersVM(_customers);
                if (_customers != null && _customersVM != null)
                {
                    _logger.LogInformation("Get list customer is success!");
                    return StatusCode(StatusCodes.Status200OK, _customersVM);
                }
                _logger.LogWarning("Get list customer is fail!");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Get list customers is fail" });
            } catch (Exception ex)
            {
                _logger.LogError(ex, "Error get list customers");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        [HttpGet("{id}")]        
        public async Task<ActionResult<CustomersVM>> GetCustomerById(Guid id)
        {
            try
            {
                var _customer = await _unitOfWork.Customers.GetByIdAsync(id);
                var _customerVM = CustomersDTO.CustomersToCustomersVM(_customer);
                if (_customer != null && _customerVM != null)
                {
                    _logger.LogInformation($"Get customer by Id: {id} is success!");
                    return StatusCode(StatusCodes.Status200OK, _customerVM);
                }
                _logger.LogWarning($"Get customer by id: {id} is fail!");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Get customer is fail" });
            }catch (Exception ex)
            {
                _logger.LogError(ex, $"Error get customer by id: {id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpPost]
        public async Task<IActionResult> AddCustomer(CustomersVM customersVM)
        {
            try
            {
                bool _checkPhoneNumberExists = await _unitOfWork.Customers.CheckPhoneNumberCustomerExist(customersVM.CustomerPhone);
                var _customer = CustomersDTO.CreateNewCustomer(customersVM);
                if (_customer != null)
                {
                    if(!_checkPhoneNumberExists)
                    {
                        var result = await _unitOfWork.Customers.AddAsync(_customer);
                        if(result)
                        {
                            await _unitOfWork.CompleteAsync();
                            _logger.LogInformation($"Create new customer {_customer.CustomerName} is success!");
                            return CreatedAtAction(nameof(GetCustomerById),new { id = _customer.Customer_ID}, _customer);
                        }    
                    }else
                    {
                        _logger.LogWarning($"Create new cusmer {customersVM.CustomerName} with phone number {customersVM.CustomerPhone} is fail !");
                        return StatusCode(StatusCodes.Status400BadRequest,new APIResVM{Success = false,Message = "This phone number already exists"});
                    }    
                }
                _logger.LogWarning($"Create new cusmer {customersVM.CustomerName} is fail!");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Add new customer is fail" });
            }catch(Exception ex)
            {
                _logger.LogError(ex,$"Error Create new customer: {customersVM.CustomerName}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        //[HttpDelete]
        //public async Task<IActionResult> DeleteCustomer(Guid id)
        //{
        //    try
        //    {
        //        var result = await _unitOfWork.Customers.DeleteAsync(id);
        //        if(result)
        //        {
        //            _logger.LogInformation($"Delete customer by Id: {id} is success!");
        //            return StatusCode(StatusCodes.Status200OK);
        //        }
        //        _logger.LogWarning($"Delete customer by Id: {id} is fail!");
        //        return StatusCode(StatusCodes.Status400BadRequest);
        //    }catch (Exception ex)
        //    {
        //        _logger.LogError(ex, $"Error delete customer by id: {id}");
        //        return StatusCode(StatusCodes.Status500InternalServerError);
        //    }
        //}

        [HttpPut("{id}")]
        public async Task<ActionResult<CustomersVM>> UpdateCustomer(Guid id,CustomersVM customersVM)
        {
            try
            {
                var _customerByphone = await _unitOfWork.Customers.GetByIdAsync(id);
                string oldPhone = _customerByphone.CustomerPhone;

                bool result = await _unitOfWork.Customers.ModifyCustomer(id, customersVM);
             
                if(result)
                {
                    var _customerVMRes = CustomersDTO.CustomersToCustomersVM(_customerByphone);

                    if (oldPhone != customersVM.CustomerPhone)
                    {
                        bool _checkPhoneNumberExists = await _unitOfWork.Customers.CheckPhoneNumberCustomerExist(customersVM.CustomerPhone);
                        if (!_checkPhoneNumberExists)
                        {
                            await _unitOfWork.CompleteAsync();
                          
                            _logger.LogInformation($"Update customer by id: {id} is success!");
                            return StatusCode(StatusCodes.Status200OK, _customerVMRes);
                        }
                        else
                        {
                            _logger.LogWarning($"Create new cusmer {customersVM.CustomerName} with phone number {customersVM.CustomerPhone} is fail !");
                            return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "This phone number already exists" });
                        }
                    }
                    else
                    {
                        await _unitOfWork.CompleteAsync();
                        _logger.LogInformation($"Update customer by id: {id} is success!");
                        return StatusCode(StatusCodes.Status200OK, _customerVMRes);
                    }
                       
                }
                _logger.LogWarning($"Update customer bu id: {id} is fail");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Update customer is fail" });
            }catch (Exception ex)
            {
                _logger.LogError(ex,$"Error modify customer by id: {id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
