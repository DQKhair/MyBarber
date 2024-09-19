using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public interface IStatisticsRepository : IGenericRepository<StatisticsVM>
    {
        Task<IEnumerable<StatisticsReceiptMoneyVM>> StatisticReceiptMoney(string dateTime);
        Task<IEnumerable<StatisticsServicesAndProductsVM>> StatisticQuantityServicesAndProducts(string dateTime);
        Task<StatisticsReceiptAndMoneyVM> StatisticsReceiptAndMoney(string dateTime);
    }
}
