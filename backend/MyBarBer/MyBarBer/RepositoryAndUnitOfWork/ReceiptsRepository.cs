using MyBarBer.Data;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public class ReceiptsRepository : GenericRepository<Receipts>, IReceiptsRepository
    {
        public ReceiptsRepository(MyDBContext context, ILogger logger) : base(context, logger)
        {
        }
    }
}
