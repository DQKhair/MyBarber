using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyBarBer.Data;
using MyBarBer.DTO;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class ReceiptsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<ReceiptsController> _logger;

        public ReceiptsController(IUnitOfWork unitOfWork, ILogger<ReceiptsController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        [Authorize(policy: "RequireAdminRoleAndEmployeeRole")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ReceiptResponseAPIVM>>> GetAllReceipts()
        {
            try
            {
                var _receipts = await _unitOfWork.Receipts.GetAllReceipts();
                if (_receipts != null)
                {
                    return StatusCode(StatusCodes.Status200OK, _receipts.OrderByDescending(r => r.ReceiptDate));
                }
                _logger.LogWarning("Get list receipts is fail!");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Get list receipts is fail!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error get list receipt");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [Authorize(policy: "RequireAdminRoleAndEmployeeRole")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ReceiptResponseAPIVM>> GetReceiptById(Guid id)
        {
            try
            {
                var _receipt = await _unitOfWork.Receipts.GetReceiptById(id);
                if (_receipt != null)
                {
                    _logger.LogInformation($"Get receipt by id {id} is success!");
                    return StatusCode(StatusCodes.Status200OK, _receipt);
                }
                _logger.LogWarning("Get list receipts is fail!");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = $"Get receipt {id} is fail!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error get receipt by id: {id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [Authorize(Roles = "Employee")]
        [HttpPost("{employeeId}")]
        public async Task<IActionResult> AddNewReceipt(Guid employeeId,ReceiptsPostVM receiptsPostVM)
        {
            try
            {
                if(receiptsPostVM != null && receiptsPostVM.CustomerPhone != null)
                {
                    
                    var checkCustomer = await _unitOfWork.Customers.GetCustomerByPhoneNumber(receiptsPostVM.CustomerPhone);
                    var _customerExists = checkCustomer;
                    if (_customerExists == null)
                    {
                        var _receiptWithNewCustomer = await _unitOfWork.Receipts.CreateNewReceiptWithNewCustomer(employeeId, receiptsPostVM);
                        if (_receiptWithNewCustomer != null)
                        {
                            _logger.LogInformation("Add new receipt is success!");
                            return StatusCode(StatusCodes.Status201Created, _receiptWithNewCustomer);
                        }
                    }
                    else
                    {
                        if (_customerExists.CustomerName == receiptsPostVM.CustomerName)
                        {
                            var _receiptWithoutNewCustomer = await _unitOfWork.Receipts.CreateNewReceiptWithoutNewCustomer(_customerExists, employeeId, receiptsPostVM);
                            if(_receiptWithoutNewCustomer != null)
                            {
                                _logger.LogInformation("Add new receipt is success!");
                                return StatusCode(StatusCodes.Status201Created,_receiptWithoutNewCustomer);
                            }
                        }
                        _logger.LogWarning("Create new receipt is fail by customer name and phone is not match!");
                        return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Customer name and phone is not match" });
                    }
                }
                _logger.LogWarning("Create new receipt is fail!");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Add new receipt is fail!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,"Error create new receipt");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [Authorize(policy: "RequireAdminRoleAndEmployeeRole")]
        [HttpPut("confirm_haircut/receiptId={id}&&employeeId={employeeId}")]
        public async Task<IActionResult> ConfirmHairCut(Guid id, Guid employeeId)
        {
            try
            {
                var _receiptUpdated = await _unitOfWork.Receipts.ConfirmHaircutReceipt(id, employeeId);
                if (_receiptUpdated != null)
                {
                    _logger.LogInformation($"Update receipt by id {id} with employ id {employeeId} is success!");
                    return StatusCode(StatusCodes.Status200OK, _receiptUpdated);
                }
                _logger.LogWarning($"Update receipt by id {id} with employ id {employeeId} is fail!");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Confirm haircut is fail!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error update receipt by id {id} with employ id {employeeId}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [Authorize(policy: "RequireAdminRoleAndEmployeeRole")]
        [HttpPut("confirm_hair_wash/receiptId={id}&&employeeId={employeeId}")]
        public async Task<IActionResult> ConfirmHairWash(Guid id, Guid employeeId)
        {
            try
            {
              
                var _receiptUpdated = await _unitOfWork.Receipts.ConfirmHairWashReceipt(id, employeeId);
                if (_receiptUpdated != null)
                {
                    _logger.LogInformation($"Update receipt by id {id} with employ id {employeeId} is success!");
                    return StatusCode(StatusCodes.Status200OK, _receiptUpdated);
                }
                _logger.LogWarning($"Update receipt by id {id} with employ id {employeeId} is fail!");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Confirm hair wash is fail!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error update receipt by id {id} with employ id {employeeId}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [Authorize(policy: "RequireAdminRoleAndEmployeeRole")]
        [HttpPut("confirm_finished/receiptId={id}")]
        public async Task<IActionResult> ConfirmFinished(Guid id)
        {
            try
            {
                

                var _receiptUpdated = await _unitOfWork.Receipts.ConfirmFinishedReceipt(id);
                if (_receiptUpdated != null)
                {
                    _logger.LogInformation($"Update receipt by id {id} is success!");
                    return StatusCode(StatusCodes.Status200OK, _receiptUpdated);
                }
                _logger.LogWarning($"Update receipt by id {id} is fail!");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Confirm finished is fail!" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error update receipt by id {id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [Authorize(policy: "RequireAdminRoleAndEmployeeRole")]
        [HttpPut("confirm_payment_completed/receiptId={id}&&method={methodName}")]
        public async Task<IActionResult> ConfirmPaymentCompleted(Guid id,string methodName)
        {
            try
            {
               
                var _receiptUpdated = await _unitOfWork.Receipts.ConfirmPaymentCompletedReceipt(id, methodName);
                if (_receiptUpdated != null)
                {
                    _logger.LogInformation($"Update receipt by id {id} is success!");
                    return StatusCode(StatusCodes.Status200OK, _receiptUpdated);
                }
                _logger.LogWarning($"Update receipt by id {id} is fail!");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message="Confirm payment completed is fail!"});
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error update receipt by id {id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
