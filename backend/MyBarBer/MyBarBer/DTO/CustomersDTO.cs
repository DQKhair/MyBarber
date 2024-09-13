using MyBarBer.Data;
using MyBarBer.Models;

namespace MyBarBer.DTO
{
    public class CustomersDTO
    {
        public static Customers CustomersVMToCustomers(CustomersVM customersVM, Customers customers)
        {
            try
            {
                if(customersVM != null && customers != null)
                {
                    customers.CustomerName = customersVM.CustomerName;
                    customers.CustomerPhone = customersVM.CustomerPhone;
                    customers.CustomerAddress = customersVM.CustomerAddress;
                    return customers;
                }
                return null!;
            }catch
            {
                return null!;
            }
        }

        public static CustomersVM CustomersToCustomersVM(Customers customers)
        {
            try
            {
                if(customers != null)
                {
                    var _customerVM = new CustomersVM
                    {
                        Customer_ID = customers.Customer_ID,
                        CustomerName = customers.CustomerName,
                        CustomerPhone = customers.CustomerPhone,
                        CustomerAddress = customers.CustomerAddress,
                    };
                    return _customerVM;
                } 
                return null!;
            }catch
            {
                return null!;
            }
        }

        public static IEnumerable<CustomersVM> ListCustomersToListCustomersVM(IEnumerable<Customers> customersList)
        {
            try
            {
                if(customersList != null)
                {
                    var _customerVM = customersList.Select(customers => new CustomersVM
                    { 
                        Customer_ID = customers.Customer_ID,
                        CustomerName = customers.CustomerName,
                        CustomerPhone = customers.CustomerPhone,
                        CustomerAddress = customers.CustomerAddress,
                    }).ToList();
                    return _customerVM;
                }    
                return null !;
            }
            catch
            {
                return null!;
            }
        }

        public static Customers CreateNewCustomer(CustomersVM customerVM)
        {
            try
            {
                if (customerVM != null)
                {
                    var _customer = new Customers
                    {
                        Customer_ID = Guid.NewGuid(),
                        CustomerName = customerVM.CustomerName,
                        CustomerPhone = customerVM.CustomerPhone,
                        CustomerAddress = customerVM.CustomerAddress,
                    };
                    if(_customer != null)
                    {
                        return _customer;
                    }else
                    {
                        return null!;
                    }    
                }
                return null!;
            }catch
            {
                return null!;
            }
        }
    }
}
