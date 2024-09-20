using AutoMapper;
using MyBarBer.Data;
using MyBarBer.Models;

namespace MyBarBer.MappingProfile
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<Categories, CategoriesVM>();
            CreateMap<CategoriesVM, CategoriesVM>();

            CreateMap<Customers, CustomersVM>();
            CreateMap<CustomersVM, CustomersVM>();

            CreateMap<Employees, EmployeesVM>();
            CreateMap<EmployeesVM, Employees>();

            CreateMap<ItemCategories, ItemCategoriesVM>();
            CreateMap<ItemCategoriesVM, ItemCategories>();
        }
    }
}
