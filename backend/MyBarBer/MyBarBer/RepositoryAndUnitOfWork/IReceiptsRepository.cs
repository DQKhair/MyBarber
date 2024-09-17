using MyBarBer.Data;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public interface  IReceiptsRepository : IGenericRepository<Receipts>
    {
        Task<IEnumerable<ReceiptResponseAPIVM>> GetAllReceipts();
        Task<ReceiptResponseAPIVM> GetReceiptById(Guid id);
        Task<ReceiptResponseAPIVM> CreateNewReceiptWithNewCustomer(Guid employeeId, ReceiptsPostVM receiptsPostVM);
        Task<ReceiptResponseAPIVM> CreateNewReceiptWithoutNewCustomer(CustomersVM customersIsExists, Guid employeeId, ReceiptsPostVM receiptsPostVM);
        Task<ReceiptResponseAPIVM> ConfirmHaircutReceipt(Guid id, Guid employeeId);
        Task<ReceiptResponseAPIVM> ConfirmHairWashReceipt(Guid id, Guid employeeId);
        Task<ReceiptResponseAPIVM> ConfirmFinishedReceipt(Guid id);
        Task<ReceiptResponseAPIVM> ConfirmPaymentCompletedReceipt(Guid id, string methodName);
    }
}
