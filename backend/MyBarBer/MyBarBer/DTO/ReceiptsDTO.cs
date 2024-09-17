using Microsoft.DotNet.Scaffolding.Shared.CodeModifier.CodeChange;
using Microsoft.IdentityModel.Tokens;
using MyBarBer.Data;
using MyBarBer.Models;
using System.Net.NetworkInformation;

namespace MyBarBer.DTO
{
    public class ReceiptsDTO
    {
        public static IEnumerable<ReceiptResponseAPIVM> ConvertToListReceiptResponseAPI(IEnumerable<Receipts> receipts, IEnumerable<ReceiptDetails> receiptDetails, IEnumerable<Employees> employees, IEnumerable<Customers> customers, IEnumerable<Methods> methods, IEnumerable<Statuses> statuses)
        {
            try
            {
                if (receipts != null && receiptDetails != null && employees != null && customers != null && methods != null && statuses != null)
                {
                    var _listReceiptDetails = receipts.Select(r => new ReceiptResponseAPIVM
                    {
                        Receipt_ID = r.Receipt_ID,
                        TotalQuantity = r.TotalQuantity,
                        TotalPrice = r.TotalPrice,
                        ReceiptDate = r.ReceiptDate,
                        Status_ID = r.Status_ID,
                        StatusName = statuses.Where(s => s.Status_ID == r.Status_ID).Select(s => s.StatusName).SingleOrDefault(),
                        Method_ID = r.Method_ID,
                        MethodName = methods.Where(m => m.Method_ID == r.Method_ID).Select(m => m.MethodName).SingleOrDefault(),
                        Employee_ID = r.Employee_ID,
                        EmployeeName = employees.Where(e => e.Employee_ID == r.Employee_ID).Select(e => e.EmployeeName).SingleOrDefault(),
                        Employee2_ID = r.Employee2_ID,
                        EmployeeName2 = employees.Where(e => e.Employee_ID == r.Employee2_ID).Select(e => e.EmployeeName).SingleOrDefault(),
                        Employee2_Time = r.Employee2_Time,
                        Employee3_ID = r.Employee3_ID,
                        EmployeeName3 = employees.Where(e => e.Employee_ID == r.Employee3_ID).Select(e => e.EmployeeName).SingleOrDefault(),
                        Employee3_Time = r.Employee3_Time,
                        Customer_ID = r.Customer_ID,
                        CustomerName = customers.Where(c => c.Customer_ID == r.Customer_ID).Select(c => c.CustomerName).SingleOrDefault(),
                        listReceiptDetailsVM = receiptDetails.Where(rd => rd.Receipt_ID == r.Receipt_ID).Select(rd => new ReceiptDetailsVM
                        {
                            ReceiptDetail_ID = rd.ReceiptDetail_ID,
                            ProductName = rd.ReceiptDetailName,
                            ProductQuantity = rd.ReceiptDetailQuantity,
                            ProductPrice = rd.ReceiptDetailPrice,
                            ItemCategory_ID = rd.ItemCategory_ID,
                            Receipt_ID = rd.Receipt_ID,
                        }).ToList(),
                    });
                    if(_listReceiptDetails != null)
                    {
                        return _listReceiptDetails;
                    }
                }
                return null!;
            }
            catch
            {
                return null!;
            }
        }

        public static ReceiptResponseAPIVM ConvertToReceiptResponseAPI(Receipts receipt, IEnumerable<ReceiptDetails> receiptDetails, IEnumerable<Employees> employees, IEnumerable<Customers> customers, IEnumerable<Methods> methods, IEnumerable<Statuses> statuses)
        {
            try
            {
                if (receipt != null && receiptDetails != null && employees != null && customers != null && methods != null && statuses != null)
                {
                    var _listReceiptDetails = new ReceiptResponseAPIVM
                    {
                        Receipt_ID = receipt.Receipt_ID,
                        TotalQuantity = receipt.TotalQuantity,
                        TotalPrice = receipt.TotalPrice,
                        ReceiptDate = receipt.ReceiptDate,
                        Status_ID = receipt.Status_ID,
                        StatusName = statuses.Where(s => s.Status_ID == receipt.Status_ID).Select(s => s.StatusName).SingleOrDefault(),
                        Method_ID = receipt.Method_ID,
                        MethodName = methods.Where(m => m.Method_ID == receipt.Method_ID).Select(m => m.MethodName).SingleOrDefault(),
                        Employee_ID = receipt.Employee_ID,
                        EmployeeName = employees.Where(e => e.Employee_ID == receipt.Employee_ID).Select(e => e.EmployeeName).SingleOrDefault(),
                        Employee2_ID = receipt.Employee2_ID,
                        EmployeeName2 = employees.Where(e => e.Employee_ID == receipt.Employee2_ID).Select(e => e.EmployeeName).SingleOrDefault(),
                        Employee2_Time = receipt.Employee2_Time,
                        Employee3_ID = receipt.Employee3_ID,
                        EmployeeName3 = employees.Where(e => e.Employee_ID == receipt.Employee3_ID).Select(e => e.EmployeeName).SingleOrDefault(),
                        Employee3_Time = receipt.Employee3_Time,
                        Customer_ID = receipt.Customer_ID,
                        CustomerName = customers.Where(c => c.Customer_ID == receipt.Customer_ID).Select(c => c.CustomerName).SingleOrDefault(),
                        listReceiptDetailsVM = receiptDetails.Where(rd => rd.Receipt_ID == receipt.Receipt_ID).Select(rd => new ReceiptDetailsVM
                        {
                            ReceiptDetail_ID = rd.ReceiptDetail_ID,
                            ProductName = rd.ReceiptDetailName,
                            ProductQuantity = rd.ReceiptDetailQuantity,
                            ProductPrice = rd.ReceiptDetailPrice,
                            ItemCategory_ID = rd.ItemCategory_ID,
                            Receipt_ID = rd.Receipt_ID,
                        }).ToList()
                    };
                    if (_listReceiptDetails != null)
                    {
                        return _listReceiptDetails;
                    }
                }
                return null!;
            }
            catch
            {
                return null!;
            }
        }

        public static Receipts CreateNewReceipt(int totalQuantity, double totalPrice,Guid statusId, Guid methodId, Guid employeeId, Guid customerId)
        {
            try
            {
                if (totalQuantity >= 0 && totalPrice >= 0 && !String.IsNullOrEmpty(statusId.ToString()) && !String.IsNullOrEmpty(methodId.ToString()) && !String.IsNullOrEmpty(employeeId.ToString()) && !String.IsNullOrEmpty(customerId.ToString()))
                {
                    var _receipt = new Receipts
                    {
                        Receipt_ID = Guid.NewGuid(),
                        TotalQuantity = totalQuantity,
                        TotalPrice = totalPrice,
                        ReceiptDate = DateTime.Now,
                        Status_ID = statusId,
                        Method_ID = methodId,
                        Employee_ID = employeeId,
                        Customer_ID = customerId,
                    };
                    if (_receipt != null)
                    {
                        return _receipt;
                    }
                }
                return null!;
            }
            catch
            {
                return null!;
            }
        }

        public static ReceiptDetails CreateNewReceiptDetailForServices(int numLoop, ReceiptsPostVM receiptsPostVM, Receipts receipt)
        {
            try
            {
                if (receiptsPostVM != null && receipt != null)
                {
                    var _receiptDetailServices = new ReceiptDetails
                    {
                        ReceiptDetail_ID = Guid.NewGuid(),
                        ReceiptDetailQuantity = 1,
                        ReceiptDetailPrice = receiptsPostVM.ServicesInput[numLoop].ItemCategoryPrice,
                        ReceiptDetailName = receiptsPostVM.ServicesInput[numLoop].ItemCategoryName,
                        ItemCategory_ID = receiptsPostVM.ServicesInput[numLoop].ItemCategory_ID,
                        Receipt_ID = receipt.Receipt_ID,
                    };
                    if (_receiptDetailServices != null)
                    {
                        return _receiptDetailServices;
                    }
                }
                return null!;
            }
            catch
            {
                return null!;
            }
        }

        public static ReceiptDetails CreateNewReceiptDetailForProducts(int numLoop, ReceiptsPostVM receiptsPostVM, Receipts receipt)
        {
            try
            {
                if (receiptsPostVM != null && receipt != null)
                {
                    var _receiptDetailProducts = new ReceiptDetails
                    {
                        ReceiptDetail_ID = Guid.NewGuid(),
                        ReceiptDetailQuantity = receiptsPostVM.ProductsQuantityInput[numLoop],
                        ReceiptDetailPrice = receiptsPostVM.ProductsInput[numLoop].ItemCategoryPrice,
                        ReceiptDetailName = receiptsPostVM.ProductsInput[numLoop].ItemCategoryName,
                        ItemCategory_ID = receiptsPostVM.ProductsInput[numLoop].ItemCategory_ID,
                        Receipt_ID = receipt.Receipt_ID,
                    };
                    if (_receiptDetailProducts != null)
                    {
                        return _receiptDetailProducts;
                    }
                }
                return null!;
            }
            catch
            {
                return null!;
            }
        }
    }
}
