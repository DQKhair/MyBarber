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
        public async Task<IActionResult> GetAllReceipts()
        {
            try
            {
                var _receipts = await _unitOfWork.Receipts.GetAllAsync();
                var _customers = await _unitOfWork.Customers.GetAllAsync();
                var _methods = await _unitOfWork.Methods.GetAllAsync();
                var _status = await _unitOfWork.Statuss.GetAllAsync();
                var _employees = await _unitOfWork.Employees.GetAllAsync();
                var _listReceiptDetails = await _unitOfWork.ReceiptDetails.GetAllAsync();

                var _receiptResponseAPI = _receipts.Select(r => new ReceiptResponseAPIVM
                {
                    Receipt_ID = r.Receipt_ID,
                    TotalQuantity = r.TotalQuantity,
                    TotalPrice = r.TotalPrice,
                    ReceiptDate = r.ReceiptDate,
                    Status_ID = r.Status_ID,
                    StatusName = _status.Where(s => s.Status_ID == r.Status_ID).Select(s => s.StatusName).SingleOrDefault(),
                    Method_ID = r.Method_ID,
                    MethodName = _methods.Where(m => m.Method_ID == r.Method_ID).Select(m => m.MethodName).SingleOrDefault(),
                    Employee_ID = r.Employee_ID,
                    EmployeeName = _employees.Where(e => e.Employee_ID == r.Employee_ID).Select(e => e.EmployeeName).SingleOrDefault(),
                    Employee2_ID = r.Employee2_ID,
                    EmployeeName2 = _employees.Where(e => e.Employee_ID == r.Employee2_ID).Select(e => e.EmployeeName).SingleOrDefault(),
                    Employee2_Time = r.Employee2_Time,
                    Employee3_ID = r.Employee3_ID,
                    EmployeeName3 = _employees.Where(e => e.Employee_ID == r.Employee3_ID).Select(e => e.EmployeeName).SingleOrDefault(),
                    Employee3_Time = r.Employee3_Time,
                    Customer_ID = r.Customer_ID,
                    CustomerName = _customers.Where(c => c.Customer_ID == r.Customer_ID).Select(c => c.CustomerName).SingleOrDefault(),
                    listReceiptDetailsVM = _listReceiptDetails.Where(rd => rd.Receipt_ID == r.Receipt_ID).Select(rd => new ReceiptDetailsVM
                    {
                        ReceiptDetail_ID = rd.ReceiptDetail_ID,
                        ProductName = rd.ReceiptDetailName,
                        ProductQuantity = rd.ReceiptDetailQuantity,
                        ProductPrice = rd.ReceiptDetailPrice,
                        ItemCategory_ID = rd.ItemCategory_ID,
                        Receipt_ID = rd.Receipt_ID,
                    }).ToList()
                });
                if (_receiptResponseAPI != null && _listReceiptDetails != null && _receipts != null)
                {
                    return StatusCode(StatusCodes.Status200OK, _receiptResponseAPI);
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
        public async Task<IActionResult> GetReceiptById(Guid id)
        {
            try
            {
                var _receipt = await _unitOfWork.Receipts.GetByIdAsync(id);
                var _customers = await _unitOfWork.Customers.GetAllAsync();
                var _methods = await _unitOfWork.Methods.GetAllAsync();
                var _status = await _unitOfWork.Statuss.GetAllAsync();
                var _employees = await _unitOfWork.Employees.GetAllAsync();
                var _listReceiptDetails = await _unitOfWork.ReceiptDetails.GetAllAsync();



                var _receiptResponseAPI = new ReceiptResponseAPIVM
                {
                    Receipt_ID = _receipt.Receipt_ID,
                    TotalQuantity = _receipt.TotalQuantity,
                    TotalPrice = _receipt.TotalPrice,
                    ReceiptDate = _receipt.ReceiptDate,
                    Status_ID = _receipt.Status_ID,
                    StatusName = _status.Where(s => s.Status_ID == _receipt.Status_ID).Select(s => s.StatusName).SingleOrDefault(),
                    Method_ID = _receipt.Method_ID,
                    MethodName = _methods.Where(m => m.Method_ID == _receipt.Method_ID).Select(m => m.MethodName).SingleOrDefault(),
                    Employee_ID = _receipt.Employee_ID,
                    EmployeeName = _employees.Where(e => e.Employee_ID == _receipt.Employee_ID).Select(e => e.EmployeeName).SingleOrDefault(),
                    Employee2_ID = _receipt.Employee2_ID,
                    EmployeeName2 = _employees.Where(e => e.Employee_ID == _receipt.Employee2_ID).Select(e => e.EmployeeName).SingleOrDefault(),
                    Employee2_Time = _receipt.Employee2_Time,
                    Employee3_ID = _receipt.Employee3_ID,
                    EmployeeName3 = _employees.Where(e => e.Employee_ID == _receipt.Employee3_ID).Select(e => e.EmployeeName).SingleOrDefault(),
                    Employee3_Time = _receipt.Employee3_Time,
                    Customer_ID = _receipt.Customer_ID,
                    CustomerName = _customers.Where(c => c.Customer_ID == _receipt.Customer_ID).Select(c => c.CustomerName).SingleOrDefault(),
                    listReceiptDetailsVM = _listReceiptDetails.Where(rd => rd.Receipt_ID == _receipt.Receipt_ID).Select(rd => new ReceiptDetailsVM
                    {
                        ReceiptDetail_ID = rd.ReceiptDetail_ID,
                        ProductName = rd.ReceiptDetailName,
                        ProductQuantity = rd.ReceiptDetailQuantity,
                        ProductPrice = rd.ReceiptDetailPrice,
                        ItemCategory_ID = rd.ItemCategory_ID,
                        Receipt_ID = rd.Receipt_ID,
                    }).ToList()
                };
                if (_receiptResponseAPI != null)
                {
                    _logger.LogInformation($"Get receipt by id {id} is success1");
                    return StatusCode(StatusCodes.Status200OK, _receiptResponseAPI);
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
                    
                    var _customerExists = await _unitOfWork.Customers.GetCustomerByPhoneNumber(receiptsPostVM.CustomerPhone);
                    if (_customerExists == null)
                    {
                        //handle create new customer
                        var _customer = new CustomersVM
                        {
                            CustomerName = receiptsPostVM.CustomerName,
                            CustomerPhone = receiptsPostVM.CustomerPhone,
                            CustomerAddress = receiptsPostVM.CustomerAddress,
                        };
                        var _newCustomer = CustomersDTO.CreateNewCustomer(_customer);
                        if(_newCustomer != null)
                        {
                            var result = await _unitOfWork.Customers.AddAsync(_newCustomer);
                            if(result)
                            {
                                bool _isComplete = await _unitOfWork.CompleteAsync();
                                if(_isComplete)
                                {
                                    _logger.LogInformation($"Create new customer by id {_newCustomer.Customer_ID} fo receipt is success! ");

                                    // handle get total quantity and total price
                                    int _totalQuantity = 0;
                                    double _totalPriceProducts = 0;
                                    double _totalPriceServices = 0;

                                    for (int i = 0; i < receiptsPostVM.ProductsInput.Count; i++)
                                    {
                                        _totalQuantity +=  receiptsPostVM.ProductsQuantityInput[i];
                                        _totalPriceProducts = _totalPriceProducts + (receiptsPostVM.ProductsInput[i].ItemCategoryPrice * receiptsPostVM.ProductsQuantityInput[i]);
                                    }
                                    for(int j = 0; j < receiptsPostVM.ServicesInput.Count; j++)
                                    {
                                        _totalPriceServices += receiptsPostVM.ServicesInput[j].ItemCategoryPrice;
                                    }

                                    //handle add Receipts table
                                    var getStatus = await _unitOfWork.Statuss.GetStatusByName("Waiting");
                                    var getMethod = await _unitOfWork.Methods.GetMethodByName("Waiting");
                                    if(getStatus != null && getMethod != null)
                                    {
                                        var _receipt = new Receipts
                                        {
                                            Receipt_ID = Guid.NewGuid(),
                                            TotalQuantity = _totalQuantity,
                                            TotalPrice = _totalPriceProducts + _totalPriceServices,
                                            ReceiptDate = DateTime.Now,
                                            Status_ID = getStatus.Status_ID,
                                            Method_ID = getMethod.Method_ID,
                                            Employee_ID = employeeId,
                                            Customer_ID = _newCustomer.Customer_ID,
                                        };

                                        bool _addReceipt = await _unitOfWork.Receipts.AddAsync(_receipt);
                                        if(_addReceipt == true)
                                        {
                                            bool _createdReceipted = await _unitOfWork.CompleteAsync();
                                            if(_createdReceipted == true)
                                            {
                                                //handle add receipt detail table
                                                bool _resultReceiptDetailService = false, _resultReceiptDetailProduct = false;

                                                //handle add receipt detail for services
                                                for (int k = 0; k < receiptsPostVM.ServicesInput.Count; k++)
                                                {
                                                    var _receiptDetailServices = new ReceiptDetails
                                                    {
                                                        ReceiptDetail_ID = Guid.NewGuid(),
                                                        ReceiptDetailQuantity = 1,
                                                        ReceiptDetailPrice = receiptsPostVM.ServicesInput[k].ItemCategoryPrice,
                                                        ReceiptDetailName = receiptsPostVM.ServicesInput[k].ItemCategoryName,
                                                        ItemCategory_ID = receiptsPostVM.ServicesInput[k].ItemCategory_ID,
                                                        Receipt_ID = _receipt.Receipt_ID,
                                                    };
                                                    _resultReceiptDetailService = await _unitOfWork.ReceiptDetails.AddAsync(_receiptDetailServices);
                                                }
                                                //handle add receipt detail fo products
                                                for(int h = 0; h < receiptsPostVM.ProductsInput.Count;h++)
                                                {
                                                    var _receiptDetailProducts = new ReceiptDetails
                                                    {
                                                        ReceiptDetail_ID = Guid.NewGuid(),
                                                        ReceiptDetailQuantity = receiptsPostVM.ProductsQuantityInput[h],
                                                        ReceiptDetailPrice = receiptsPostVM.ProductsInput[h].ItemCategoryPrice * receiptsPostVM.ProductsQuantityInput[h],
                                                        ReceiptDetailName = receiptsPostVM.ProductsInput[h].ItemCategoryName,
                                                        ItemCategory_ID = receiptsPostVM.ProductsInput[h].ItemCategory_ID,
                                                        Receipt_ID = _receipt.Receipt_ID,
                                                    };
                                                    _resultReceiptDetailProduct = await _unitOfWork.ReceiptDetails.AddAsync(_receiptDetailProducts);
                                                }
                                                //save 
                                                if(_resultReceiptDetailService == true && _resultReceiptDetailProduct == true)
                                                {
                                                   var _response = await _unitOfWork.CompleteAsync();
                                                    if(_response == true)
                                                    {
                                                        _logger.LogInformation("Add new receipt is success!");
                                                        return StatusCode(StatusCodes.Status201Created);
                                                    }
                                                }
                                               
                                            }

                                        }
                                    }
                                }

                            }
                        }
                    }else
                    {
                        if (_customerExists.CustomerName == receiptsPostVM.CustomerName)
                        {

                            // handle get total quantity and total price
                            int _totalQuantity = 0;
                            double _totalPriceProducts = 0;
                            double _totalPriceServices = 0;

                            for (int i = 0; i < receiptsPostVM.ProductsInput.Count; i++)
                            {
                                _totalQuantity += receiptsPostVM.ProductsQuantityInput[i];
                                _totalPriceProducts = _totalPriceProducts + (receiptsPostVM.ProductsInput[i].ItemCategoryPrice * receiptsPostVM.ProductsQuantityInput[i]);
                            }
                            for (int j = 0; j < receiptsPostVM.ServicesInput.Count; j++)
                            {
                                _totalPriceServices += receiptsPostVM.ServicesInput[j].ItemCategoryPrice;
                            }

                            //handle add Receipts table
                            var getStatus = await _unitOfWork.Statuss.GetStatusByName("Waiting");
                            var getMethod = await _unitOfWork.Methods.GetMethodByName("Waiting");
                            if (getStatus != null && getMethod != null)
                            {
                                var _receipt = new Receipts
                                {
                                    Receipt_ID = Guid.NewGuid(),
                                    TotalQuantity = _totalQuantity,
                                    TotalPrice = _totalPriceProducts + _totalPriceServices,
                                    ReceiptDate = DateTime.Now,
                                    Status_ID = getStatus.Status_ID,
                                    Method_ID = getMethod.Method_ID,
                                    Employee_ID = employeeId,
                                    Customer_ID = _customerExists.Customer_ID,
                                };

                                bool _addReceipt = await _unitOfWork.Receipts.AddAsync(_receipt);
                                if (_addReceipt == true)
                                {
                                    bool _createdReceipted = await _unitOfWork.CompleteAsync();
                                    if (_createdReceipted == true)
                                    {
                                        //handle add receipt detail table
                                        bool _resultReceiptDetailService = false, _resultReceiptDetailProduct = false;

                                        //handle add receipt detail for services
                                        for (int k = 0; k < receiptsPostVM.ServicesInput.Count; k++)
                                        {
                                            var _receiptDetailServices = new ReceiptDetails
                                            {
                                                ReceiptDetail_ID = Guid.NewGuid(),
                                                ReceiptDetailQuantity = 1,
                                                ReceiptDetailPrice = receiptsPostVM.ServicesInput[k].ItemCategoryPrice,
                                                ReceiptDetailName = receiptsPostVM.ServicesInput[k].ItemCategoryName,
                                                ItemCategory_ID = receiptsPostVM.ServicesInput[k].ItemCategory_ID,
                                                Receipt_ID = _receipt.Receipt_ID,
                                            };
                                            _resultReceiptDetailService = await _unitOfWork.ReceiptDetails.AddAsync(_receiptDetailServices);
                                        }
                                        //handle add receipt detail fo products
                                        for (int h = 0; h < receiptsPostVM.ProductsInput.Count; h++)
                                        {
                                            var _receiptDetailProducts = new ReceiptDetails
                                            {
                                                ReceiptDetail_ID = Guid.NewGuid(),
                                                ReceiptDetailQuantity = receiptsPostVM.ProductsQuantityInput[h],
                                                ReceiptDetailPrice = receiptsPostVM.ProductsInput[h].ItemCategoryPrice * receiptsPostVM.ProductsQuantityInput[h],
                                                ReceiptDetailName = receiptsPostVM.ProductsInput[h].ItemCategoryName,
                                                ItemCategory_ID = receiptsPostVM.ProductsInput[h].ItemCategory_ID,
                                                Receipt_ID = _receipt.Receipt_ID,
                                            };
                                            _resultReceiptDetailProduct = await _unitOfWork.ReceiptDetails.AddAsync(_receiptDetailProducts);
                                        }
                                        //save 
                                        if (_resultReceiptDetailService == true && _resultReceiptDetailProduct == true)
                                        {
                                            var _response = await _unitOfWork.CompleteAsync();
                                            if (_response == true)
                                            {
                                                _logger.LogInformation("Add new receipt is success!");
                                                return StatusCode(StatusCodes.Status201Created);
                                            }
                                        }

                                    }

                                }
                            }
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
                string statusName = "Waiting for a haircut";
                var _receipt = await _unitOfWork.Receipts.GetByIdAsync(id);
                var _status = await _unitOfWork.Statuss.GetStatusByName(statusName);
                if (_receipt != null && _status != null)
                {
                    _receipt.Status_ID = _status.Status_ID;
                    _receipt.Employee2_ID = employeeId;
                    _receipt.Employee2_Time = DateTime.Now;
                    bool result = await _unitOfWork.CompleteAsync();
                    if (result == true)
                    {
                        _logger.LogInformation($"Update receipt by id {id} with employ id {employeeId} is success!");
                        return StatusCode(StatusCodes.Status200OK);
                    }
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
                string statusName = "Waiting for a hair wash";
                var _receipt = await _unitOfWork.Receipts.GetByIdAsync(id);
                var _status = await _unitOfWork.Statuss.GetStatusByName(statusName);
                if (_receipt != null && _status != null)
                {
                    _receipt.Status_ID = _status.Status_ID;
                    _receipt.Employee3_ID = employeeId;
                    _receipt.Employee3_Time = DateTime.Now;
                    bool result = await _unitOfWork.CompleteAsync();
                    if (result == true)
                    {
                        _logger.LogInformation($"Update receipt by id {id} with employ id {employeeId} is success!");
                        return StatusCode(StatusCodes.Status200OK);
                    }
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
                string statusName = "Finished";
                var _receipt = await _unitOfWork.Receipts.GetByIdAsync(id);
                var _status = await _unitOfWork.Statuss.GetStatusByName(statusName);
                if (_receipt != null && _status != null)
                {
                    _receipt.Status_ID = _status.Status_ID;

                    bool result = await _unitOfWork.CompleteAsync();
                    if (result == true)
                    {
                        _logger.LogInformation($"Update receipt by id {id} is success!");
                        return StatusCode(StatusCodes.Status200OK);
                    }
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
                string statusName = "Payment completed";
                var _method = await _unitOfWork.Methods.GetMethodByName(methodName);
                var _receipt = await _unitOfWork.Receipts.GetByIdAsync(id);
                var _status = await _unitOfWork.Statuss.GetStatusByName(statusName);
                if (_receipt != null && _status != null && _method != null)
                {
                    _receipt.Method_ID = _method.Method_ID;
                    _receipt.Status_ID = _status.Status_ID;

                    bool result = await _unitOfWork.CompleteAsync();
                    if (result == true)
                    {
                        _logger.LogInformation($"Update receipt by id {id} is success!");
                        return StatusCode(StatusCodes.Status200OK);
                    }
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
