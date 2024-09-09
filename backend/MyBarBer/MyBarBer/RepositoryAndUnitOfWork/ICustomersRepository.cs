
using MyBarBer.Data;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public interface ICustomersRepository : IGenericRepository<Customers>
    {
        Task<CustomersVM> GetCustomerByPhoneNumber(string phoneNumber);
        Task<bool> CheckPhoneNumberCustomerExist(string phoneNumber);
        Task<bool> ModifyCustomer(Guid id,CustomersVM customersVM);
    }
}
