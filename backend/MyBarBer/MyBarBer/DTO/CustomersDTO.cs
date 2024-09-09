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
                customers.CustomerName = customersVM.CustomerName;
                customers.CustomerPhone = customersVM.CustomerPhone;
                customers.CustomerAddress = customersVM.CustomerAddress;
                return customers;
            }catch
            {
                return null!;
            }
        }

        public static CustomersVM CustomersToCustomersVM(Customers customers)
        {
            try
            {
                var _customerVM = new CustomersVM
                {
                    Customer_ID = customers.Customer_ID,
                    CustomerName = customers.CustomerName,
                    CustomerPhone = customers.CustomerPhone,
                    CustomerAddress = customers.CustomerAddress,
                };
                return _customerVM;
            }catch
            {
                return null!;
            }
        }

        public static Customers CreateNewCustomer(CustomersVM customerVM)
        {
            try
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
            }catch
            {
                return null!;
            }
        }
    }
}
