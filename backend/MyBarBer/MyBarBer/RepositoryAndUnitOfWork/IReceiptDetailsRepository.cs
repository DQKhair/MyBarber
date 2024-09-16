using MyBarBer.Data;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public interface IReceiptDetailsRepository : IGenericRepository<ReceiptDetails>
    {
        Task<IEnumerable<ReceiptDetails>> GetAllReceiptDetailByReceiptId(Guid receiptId);
    }
}
