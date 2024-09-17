using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;
using MyBarBer.DTO;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public class ReceiptsRepository : GenericRepository<Receipts>, IReceiptsRepository
    {
        public ReceiptsRepository(MyDBContext context, ILogger logger) : base(context, logger)
        {
        }

        public async Task<IEnumerable<ReceiptResponseAPIVM>> GetAllReceipts()
        {
           try
            {
                var _receipts = await _context.Receipts.ToListAsync();
                var _listReceiptDetails = await _context.ReceiptDetails.ToListAsync();
                var _employees = await _context.Employees.ToListAsync();
                var _customers = await _context.Customers.ToListAsync();
                var _methods = await _context.Methods.ToListAsync();
                var _statuses = await _context.Statuses.ToListAsync();


                var _receiptResponseAPI = ReceiptsDTO.ConvertToListReceiptResponseAPI(_receipts, _listReceiptDetails, _employees, _customers, _methods, _statuses);
                if(_receiptResponseAPI != null)
                {
                    return _receiptResponseAPI;
                }
                _logger.LogWarning("Get list receipts is fail!");
                return null!;
            }catch (Exception ex)
            {
                _logger.LogError(ex, $"Error get list receipts");
                return null!;
            }
        }

        public async Task<ReceiptResponseAPIVM> GetReceiptById(Guid id)
        {
            try
            {
                var _receipt = await _context.Receipts.SingleOrDefaultAsync(r => r.Receipt_ID == id);
                var _listReceiptDetails = await _context.ReceiptDetails.ToListAsync();
                var _employees = await _context.Employees.ToListAsync();
                var _customers = await _context.Customers.ToListAsync();
                var _methods = await _context.Methods.ToListAsync();
                var _statuses = await _context.Statuses.ToListAsync();
                if(_receipt != null)
                {
                    var _receiptResponseAPI = ReceiptsDTO.ConvertToReceiptResponseAPI(_receipt,_listReceiptDetails,_employees,_customers,_methods, _statuses);
                    if (_receiptResponseAPI != null)
                    {
                        return _receiptResponseAPI;
                    }
                }
                _logger.LogWarning($"Get receipt by id {id} is fail!");
                return null!;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error get receipts by id{id}");
                return null!;
            }
        }

       

        public async Task<ReceiptResponseAPIVM> CreateNewReceiptWithNewCustomer(Guid employeeId, ReceiptsPostVM receiptsPostVM)
        {
            try
            {
                var _customer = new CustomersVM
                {
                    CustomerName = receiptsPostVM.CustomerName,
                    CustomerPhone = receiptsPostVM.CustomerPhone,
                    CustomerAddress = receiptsPostVM.CustomerAddress,
                };
                var _newCustomer = CustomersDTO.CreateNewCustomer(_customer);
                if (_newCustomer != null)
                {
                    var result = await _context.Customers.AddAsync( _newCustomer );
                    if(result != null )
                    {
                        var _isCompleted = await _context.SaveChangesAsync();
                        if(_isCompleted > 0)
                        {
                            _logger.LogInformation($"Create new customer by id {_newCustomer.Customer_ID} fo receipt is success! ");
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
                            var getStatus = await _context.Statuses.SingleOrDefaultAsync(s => s.StatusName == "Waiting");
                            var getMethod = await _context.Methods.SingleOrDefaultAsync(m => m.MethodName == "Waiting");
                            double _totalPrice = _totalPriceProducts + _totalPriceServices;
                            if (getStatus != null && getMethod != null)
                            {
                                var _receipt = ReceiptsDTO.CreateNewReceipt(_totalQuantity, _totalPrice, getStatus.Status_ID, getMethod.Method_ID, employeeId,_newCustomer.Customer_ID);
                                if(_receipt != null)
                                {
                                    var _addReceipt = await _context.Receipts.AddAsync(_receipt);
                                    if(_addReceipt != null)
                                    {
                                        //handle add receipt detail table
                                        var _resultReceiptDetailService = false;
                                        var _resultReceiptDetailProduct = false; 

                                        //handle add receipt detail for services
                                        for (int k = 0; k < receiptsPostVM.ServicesInput.Count; k++)
                                        {
                                            var _receiptDetailServices = ReceiptsDTO.CreateNewReceiptDetailForServices(k,receiptsPostVM,_receipt);

                                            _resultReceiptDetailService = (await _context.ReceiptDetails.AddAsync(_receiptDetailServices)) != null;
                                        }
                                        //handle add receipt detail fo products
                                        for (int h = 0; h < receiptsPostVM.ProductsInput.Count; h++)
                                        {
                                            var _receiptDetailProducts = ReceiptsDTO.CreateNewReceiptDetailForProducts(h, receiptsPostVM, _receipt);

                                            _resultReceiptDetailProduct = (await _context.ReceiptDetails.AddAsync(_receiptDetailProducts)) != null;
                                        }
                                        //save 
                                        if (_resultReceiptDetailService == false && _resultReceiptDetailProduct == false)
                                        {
                                            _logger.LogWarning($"Create receipt is fail!");
                                            return null!;
                                        }else
                                        {
                                            var _response = await _context.SaveChangesAsync();
                                            if (_response > 0)
                                            {
                                                _logger.LogInformation("Add new receipt is success!");
                                                var _newReceipt = await GetReceiptById(_receipt.Receipt_ID);
                                                if (_newReceipt != null)
                                                {
                                                    return _newReceipt;
                                                }
                                            }
                                        }
                                    }
                                }
                            }

                        }
                    }
                }
                _logger.LogWarning($"Create receipt is fail!");
                return null!;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error create new receipt");
                return null!;
            }
        }

        public async Task<ReceiptResponseAPIVM> CreateNewReceiptWithoutNewCustomer(CustomersVM customersIsExists,Guid employeeId, ReceiptsPostVM receiptsPostVM)
        {
            try
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
                var getStatus = await _context.Statuses.SingleOrDefaultAsync(s => s.StatusName == "Waiting");
                var getMethod = await _context.Methods.SingleOrDefaultAsync(m => m.MethodName == "Waiting");
                double _totalPrice = _totalPriceProducts + _totalPriceServices;
                if (getStatus != null && getMethod != null)
                {
                    var _receipt = ReceiptsDTO.CreateNewReceipt(_totalQuantity, _totalPrice, getStatus.Status_ID, getMethod.Method_ID, employeeId, customersIsExists.Customer_ID);
                    if (_receipt != null)
                    {
                        var _addReceipt = await _context.Receipts.AddAsync(_receipt);
                        if (_addReceipt != null)
                        {
                            //handle add receipt detail table
                            var _resultReceiptDetailService = false;
                            var _resultReceiptDetailProduct = false;

                            //handle add receipt detail for services
                            for (int k = 0; k < receiptsPostVM.ServicesInput.Count; k++)
                            {
                                var _receiptDetailServices = ReceiptsDTO.CreateNewReceiptDetailForServices(k, receiptsPostVM, _receipt);

                                _resultReceiptDetailService = (await _context.ReceiptDetails.AddAsync(_receiptDetailServices)) != null;
                            }
                            //handle add receipt detail fo products
                            for (int h = 0; h < receiptsPostVM.ProductsInput.Count; h++)
                            {
                                var _receiptDetailProducts = ReceiptsDTO.CreateNewReceiptDetailForProducts(h, receiptsPostVM, _receipt);

                                _resultReceiptDetailProduct = (await _context.ReceiptDetails.AddAsync(_receiptDetailProducts)) != null;
                            }
                            //save 
                            if (_resultReceiptDetailService == false && _resultReceiptDetailProduct == false)
                            {
                                _logger.LogWarning($"Create receipt is fail!");
                                return null!;
                            }
                            else
                            {
                                var _response = await _context.SaveChangesAsync();
                                if (_response > 0)
                                {
                                    _logger.LogInformation("Add new receipt is success!");
                                    var _newReceipt = await GetReceiptById(_receipt.Receipt_ID);
                                    if (_newReceipt != null)
                                    {
                                        return _newReceipt;
                                    }
                                }
                            }
                        }
                    }
                }
                _logger.LogWarning($"Create receipt is fail!");
                return null!;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error create new receipt");
                return null!;
            }

        }

        public async Task<ReceiptResponseAPIVM> ConfirmHaircutReceipt(Guid id, Guid employeeId)
        {
            try
            {
                string statusName = "Waiting for a haircut";
                var _receipt = await _context.Receipts.SingleOrDefaultAsync(r => r.Receipt_ID == id);
                var _status = await _context.Statuses.SingleOrDefaultAsync(r => r.StatusName == statusName);
                if (_receipt != null && _status != null)
                {
                    _receipt.Status_ID = _status.Status_ID;
                    _receipt.Employee2_ID = employeeId;
                    _receipt.Employee2_Time = DateTime.Now;

                    var result = await _context.SaveChangesAsync(); 
                    if(result > 0)
                    {
                        var _receiptResponseAPIVM = await GetReceiptById(id); 
                        if (_receiptResponseAPIVM != null)
                        {
                            return _receiptResponseAPIVM;
                        }
                    }
                }
                _logger.LogWarning($"Confirm haircut receipt is fail!");
                return null!;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error confirm haircut receipt");
                return null!;
            }
        }

        public async Task<ReceiptResponseAPIVM> ConfirmHairWashReceipt(Guid id, Guid employeeId)
        {
            try
            {
                string statusName = "Waiting for a hair wash";
                var _receipt = await _context.Receipts.SingleOrDefaultAsync(r => r.Receipt_ID == id);
                var _status = await _context.Statuses.SingleOrDefaultAsync(r => r.StatusName == statusName);
                if (_receipt != null && _status != null)
                {
                    _receipt.Status_ID = _status.Status_ID;
                    _receipt.Employee3_ID = employeeId;
                    _receipt.Employee3_Time = DateTime.Now;

                    var result = await _context.SaveChangesAsync();
                    if (result > 0)
                    {
                        var _receiptResponseAPIVM = await GetReceiptById(id);
                        if (_receiptResponseAPIVM != null)
                        {
                            return _receiptResponseAPIVM;
                        }
                    }
                }
                _logger.LogWarning($"Confirm hair wash receipt is fail!");
                return null!;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error confirm hair wash receipt");
                return null!;
            }
        }

        public async Task<ReceiptResponseAPIVM> ConfirmFinishedReceipt(Guid id)
        {
            try
            {
                string statusName = "Finished";
                var _receipt = await _context.Receipts.SingleOrDefaultAsync(r => r.Receipt_ID == id);
                var _status = await _context.Statuses.SingleOrDefaultAsync(r => r.StatusName == statusName);
                if (_receipt != null && _status != null)
                {
                    _receipt.Status_ID = _status.Status_ID;

                    var result = await _context.SaveChangesAsync();
                    if (result > 0)
                    {
                        var _receiptResponseAPIVM = await GetReceiptById(id);
                        if (_receiptResponseAPIVM != null)
                        {
                            return _receiptResponseAPIVM;
                        }
                    }
                }
                _logger.LogWarning($"Confirm finished receipt is fail!");
                return null!;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error confirm finished receipt");
                return null!;
            }
        }


        public async Task<ReceiptResponseAPIVM> ConfirmPaymentCompletedReceipt(Guid id, string methodName)
        {
            try
            {
                string statusName = "Payment completed";
                var _method = await _context.Methods.SingleOrDefaultAsync(m => m.MethodName == methodName);
                var _receipt = await _context.Receipts.SingleOrDefaultAsync(r => r.Receipt_ID == id);
                var _status = await _context.Statuses.SingleOrDefaultAsync(r => r.StatusName == statusName);
                if (_receipt != null && _status != null && _method != null)
                {
                    _receipt.Method_ID = _method.Method_ID;
                    _receipt.Status_ID = _status.Status_ID;

                    var result = await _context.SaveChangesAsync();
                    if (result > 0)
                    {
                        var _receiptResponseAPIVM = await GetReceiptById(id);
                        if (_receiptResponseAPIVM != null)
                        {
                            return _receiptResponseAPIVM;
                        }
                    }
                }
                _logger.LogWarning($"Confirm payment completed receipt is fail!");
                return null!;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error confirm payment completed receipt");
                return null!;
            }
        }



       
    }
}
