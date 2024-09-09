using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;
using MyBarBer.DTO;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public class CustomerRepository : GenericRepository<Customers>, ICustomersRepository
    {
        public CustomerRepository(MyDBContext context, ILogger logger) : base(context, logger)
        {
        }

        public async Task<CustomersVM> GetCustomerByPhoneNumber(string phoneNumber)
        {
            try
            {
                if(phoneNumber != null)
                {
                    var _customer = await _context.Customers.SingleOrDefaultAsync(c => c.CustomerPhone == phoneNumber);
                    if(_customer != null)
                    {
                        var _customerConvert = CustomersDTO.CustomersToCustomersVM(_customer);
                        if(_customerConvert != null)
                        {
                            return _customerConvert;
                        }    
                    }    
                }
                _logger.LogWarning($"Get phone number {phoneNumber} is fail");
                return null!;
            }catch(Exception ex)
            {
                _logger.LogError(ex, $"Error get phone number customer: {phoneNumber}");
                return null!;
            }
        }
        public async Task<bool> CheckPhoneNumberCustomerExist(string phoneNumber)
        {
           try
            {
                if(phoneNumber != null)
                {
                    var _customer = await _context.Customers.SingleOrDefaultAsync(c => c.CustomerPhone == phoneNumber);
                    if (_customer != null)
                    {
                        return true;  
                    }    
                }
                _logger.LogWarning($"Phone number {phoneNumber} is not exist");
                return false;
            }catch (Exception ex)
            {
                _logger.LogError(ex,$"Error check phone number customer: {phoneNumber}");
                return false;
            }
        }


        public async Task<bool> ModifyCustomer(Guid id, CustomersVM customersVM)
        {
            try
            {
                var _customerUpdate = await _context.Customers.SingleOrDefaultAsync(c => c.Customer_ID == id);
                if (customersVM != null && _customerUpdate != null)
                {
                    var _customer = CustomersDTO.CustomersVMToCustomers(customersVM, _customerUpdate);
                    if (_customer != null)
                    {
                        return true;
                    }    
                }
                return false;
            }catch(Exception ex)
            {
                _logger.LogError(ex, $"Error modify customer by id: {customersVM.Customer_ID}");
                return false;
            }
        }
    }
}
