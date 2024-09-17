using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyBarBer.Data;
using MyBarBer.DTO;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.Controllers
{
    [Authorize(policy: "RequireAdminRoleAndEmployeeRole")]
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
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error get list receipt");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

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
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error get receipt by id: {id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

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

                        ////handle create new customer
                        //var _customer = new CustomersVM
                        //{
                        //    CustomerName = receiptsPostVM.CustomerName,
                        //    CustomerPhone = receiptsPostVM.CustomerPhone,
                        //    CustomerAddress = receiptsPostVM.CustomerAddress,
                        //};
                        //var _newCustomer = CustomersDTO.CreateNewCustomer(_customer);
                        //if(_newCustomer != null)
                        //{
                        //    var result = await _unitOfWork.Customers.AddAsync(_newCustomer);
                        //    if(result)
                        //    {
                        //        bool _isComplete = await _unitOfWork.CompleteAsync();
                        //        if(_isComplete)
                        //        {
                        //            _logger.LogInformation($"Create new customer by id {_newCustomer.Customer_ID} fo receipt is success! ");

                        //            // handle get total quantity and total price
                        //            int _totalQuantity = 0;
                        //            double _totalPriceProducts = 0;
                        //            double _totalPriceServices = 0;

                        //            for (int i = 0; i < receiptsPostVM.ProductsInput.Count; i++)
                        //            {
                        //                _totalQuantity +=  receiptsPostVM.ProductsQuantityInput[i];
                        //                _totalPriceProducts = _totalPriceProducts + (receiptsPostVM.ProductsInput[i].ItemCategoryPrice * receiptsPostVM.ProductsQuantityInput[i]);
                        //            }
                        //            for(int j = 0; j < receiptsPostVM.ServicesInput.Count; j++)
                        //            {
                        //                _totalPriceServices += receiptsPostVM.ServicesInput[j].ItemCategoryPrice;
                        //            }

                        //            //handle add Receipts table
                        //            var getStatus = await _unitOfWork.Statuss.GetStatusByName("Waiting");
                        //            var getMethod = await _unitOfWork.Methods.GetMethodByName("Waiting");
                        //            if(getStatus != null && getMethod != null)
                        //            {
                        //                var _receipt = new Receipts
                        //                {
                        //                    Receipt_ID = Guid.NewGuid(),
                        //                    TotalQuantity = _totalQuantity,
                        //                    TotalPrice = _totalPriceProducts + _totalPriceServices,
                        //                    ReceiptDate = DateTime.Now,
                        //                    Status_ID = getStatus.Status_ID,
                        //                    Method_ID = getMethod.Method_ID,
                        //                    Employee_ID = employeeId,
                        //                    Customer_ID = _newCustomer.Customer_ID,
                        //                };

                        //                bool _addReceipt = await _unitOfWork.Receipts.AddAsync(_receipt);
                        //                if(_addReceipt == true)
                        //                {
                        //                    bool _createdReceipted = await _unitOfWork.CompleteAsync();
                        //                    if(_createdReceipted == true)
                        //                    {
                        //                        //handle add receipt detail table
                        //                        bool _resultReceiptDetailService = false, _resultReceiptDetailProduct = false;

                        //                        //handle add receipt detail for services
                        //                        for (int k = 0; k < receiptsPostVM.ServicesInput.Count; k++)
                        //                        {
                        //                            var _receiptDetailServices = new ReceiptDetails
                        //                            {
                        //                                ReceiptDetail_ID = Guid.NewGuid(),
                        //                                ReceiptDetailQuantity = 1,
                        //                                ReceiptDetailPrice = receiptsPostVM.ServicesInput[k].ItemCategoryPrice,
                        //                                ReceiptDetailName = receiptsPostVM.ServicesInput[k].ItemCategoryName,
                        //                                ItemCategory_ID = receiptsPostVM.ServicesInput[k].ItemCategory_ID,
                        //                                Receipt_ID = _receipt.Receipt_ID,
                        //                            };
                        //                            _resultReceiptDetailService = await _unitOfWork.ReceiptDetails.AddAsync(_receiptDetailServices);
                        //                        }
                        //                        //handle add receipt detail fo products
                        //                        for(int h = 0; h < receiptsPostVM.ProductsInput.Count;h++)
                        //                        {
                        //                            var _receiptDetailProducts = new ReceiptDetails
                        //                            {
                        //                                ReceiptDetail_ID = Guid.NewGuid(),
                        //                                ReceiptDetailQuantity = receiptsPostVM.ProductsQuantityInput[h],
                        //                                ReceiptDetailPrice = receiptsPostVM.ProductsInput[h].ItemCategoryPrice * receiptsPostVM.ProductsQuantityInput[h],
                        //                                ReceiptDetailName = receiptsPostVM.ProductsInput[h].ItemCategoryName,
                        //                                ItemCategory_ID = receiptsPostVM.ProductsInput[h].ItemCategory_ID,
                        //                                Receipt_ID = _receipt.Receipt_ID,
                        //                            };
                        //                            _resultReceiptDetailProduct = await _unitOfWork.ReceiptDetails.AddAsync(_receiptDetailProducts);
                        //                        }
                        //                        //save 
                        //                        if(_resultReceiptDetailService == true && _resultReceiptDetailProduct == true)
                        //                        {
                        //                           var _response = await _unitOfWork.CompleteAsync();
                        //                            if(_response == true)
                        //                            {
                        //                                _logger.LogInformation("Add new receipt is success!");
                        //                                return StatusCode(StatusCodes.Status201Created);
                        //                            }
                        //                        }

                        //                    }

                        //                }
                        //            }
                        //        }

                        //    }
                        //}
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
                            //// handle get total quantity and total price
                            //int _totalQuantity = 0;
                            //double _totalPriceProducts = 0;
                            //double _totalPriceServices = 0;

                            //for (int i = 0; i < receiptsPostVM.ProductsInput.Count; i++)
                            //{
                            //    _totalQuantity += receiptsPostVM.ProductsQuantityInput[i];
                            //    _totalPriceProducts = _totalPriceProducts + (receiptsPostVM.ProductsInput[i].ItemCategoryPrice * receiptsPostVM.ProductsQuantityInput[i]);
                            //}
                            //for (int j = 0; j < receiptsPostVM.ServicesInput.Count; j++)
                            //{
                            //    _totalPriceServices += receiptsPostVM.ServicesInput[j].ItemCategoryPrice;
                            //}

                            ////handle add Receipts table
                            //var getStatus = await _unitOfWork.Statuss.GetStatusByName("Waiting");
                            //var getMethod = await _unitOfWork.Methods.GetMethodByName("Waiting");
                            //if (getStatus != null && getMethod != null)
                            //{
                            //    var _receipt = new Receipts
                            //    {
                            //        Receipt_ID = Guid.NewGuid(),
                            //        TotalQuantity = _totalQuantity,
                            //        TotalPrice = _totalPriceProducts + _totalPriceServices,
                            //        ReceiptDate = DateTime.Now,
                            //        Status_ID = getStatus.Status_ID,
                            //        Method_ID = getMethod.Method_ID,
                            //        Employee_ID = employeeId,
                            //        Customer_ID = _customerExists.Customer_ID,
                            //    };

                            //    bool _addReceipt = await _unitOfWork.Receipts.AddAsync(_receipt);
                            //    if (_addReceipt == true)
                            //    {
                            //        bool _createdReceipted = await _unitOfWork.CompleteAsync();
                            //        if (_createdReceipted == true)
                            //        {
                            //            //handle add receipt detail table
                            //            bool _resultReceiptDetailService = false, _resultReceiptDetailProduct = false;

                            //            //handle add receipt detail for services
                            //            for (int k = 0; k < receiptsPostVM.ServicesInput.Count; k++)
                            //            {
                            //                var _receiptDetailServices = new ReceiptDetails
                            //                {
                            //                    ReceiptDetail_ID = Guid.NewGuid(),
                            //                    ReceiptDetailQuantity = 1,
                            //                    ReceiptDetailPrice = receiptsPostVM.ServicesInput[k].ItemCategoryPrice,
                            //                    ReceiptDetailName = receiptsPostVM.ServicesInput[k].ItemCategoryName,
                            //                    ItemCategory_ID = receiptsPostVM.ServicesInput[k].ItemCategory_ID,
                            //                    Receipt_ID = _receipt.Receipt_ID,
                            //                };
                            //                _resultReceiptDetailService = await _unitOfWork.ReceiptDetails.AddAsync(_receiptDetailServices);
                            //            }
                            //            //handle add receipt detail fo products
                            //            for (int h = 0; h < receiptsPostVM.ProductsInput.Count; h++)
                            //            {
                            //                var _receiptDetailProducts = new ReceiptDetails
                            //                {
                            //                    ReceiptDetail_ID = Guid.NewGuid(),
                            //                    ReceiptDetailQuantity = receiptsPostVM.ProductsQuantityInput[h],
                            //                    ReceiptDetailPrice = receiptsPostVM.ProductsInput[h].ItemCategoryPrice * receiptsPostVM.ProductsQuantityInput[h],
                            //                    ReceiptDetailName = receiptsPostVM.ProductsInput[h].ItemCategoryName,
                            //                    ItemCategory_ID = receiptsPostVM.ProductsInput[h].ItemCategory_ID,
                            //                    Receipt_ID = _receipt.Receipt_ID,
                            //                };
                            //                _resultReceiptDetailProduct = await _unitOfWork.ReceiptDetails.AddAsync(_receiptDetailProducts);
                            //            }
                            //            //save 
                            //            if (_resultReceiptDetailService == true && _resultReceiptDetailProduct == true)
                            //            {
                            //                var _response = await _unitOfWork.CompleteAsync();
                            //                if (_response == true)
                            //                {
                            //                    _logger.LogInformation("Add new receipt is success!");
                            //                    return StatusCode(StatusCodes.Status201Created);
                            //                }
                            //            }

                            //        }

                            //    }
                            //}
                        }
                        _logger.LogWarning("Create new receipt is fail by customer name and phone is not match!");
                        return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Customer name and phone is not match" });
                    }
                }
                _logger.LogWarning("Create new receipt is fail!");
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,"Error create new receipt");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

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
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error update receipt by id {id} with employ id {employeeId}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

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
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error update receipt by id {id} with employ id {employeeId}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

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
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error update receipt by id {id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

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
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error update receipt by id {id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
