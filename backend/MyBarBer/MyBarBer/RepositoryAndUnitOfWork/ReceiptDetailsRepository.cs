using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public class ReceiptDetailsRepository : GenericRepository<ReceiptDetails>, IReceiptDetailsRepository
    {
        public ReceiptDetailsRepository(MyDBContext context, ILogger logger) : base(context, logger)
        {
        }

        public async Task<IEnumerable<ReceiptDetails>> GetAllReceiptDetailByReceiptId(Guid receiptId)
        {
            try
            {
                var _receiptDetails = await _context.ReceiptDetails.Where(rd => rd.Receipt_ID == receiptId).ToListAsync();
                if(_receiptDetails.Count > 0)
                {
                    return _receiptDetails;
                }
                _logger.LogWarning($"Get list receipt detail by receipt id {receiptId} is fail!");
                return null!;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error get list receipt detail by receipt id {receiptId}");
                return null!;
            }
        }
    }
}
