using MyBarBer.Data;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public class ReceiptDetailsRepository : GenericRepository<ReceiptDetails>, IReceiptDetailsRepository
    {
        public ReceiptDetailsRepository(MyDBContext context, ILogger logger) : base(context, logger)
        {
        }
    }
}
