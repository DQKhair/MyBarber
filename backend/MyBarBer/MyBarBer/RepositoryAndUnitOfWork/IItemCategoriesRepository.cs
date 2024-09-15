using MyBarBer.Data;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public interface IItemCategoriesRepository : IGenericRepository<ItemCategories>
    {
        Task<ItemCategoriesVM> AddNewItemCategory(ItemCategoryPostVM itemCategoryPostVM);
        Task<bool> ModifyItemCategoryInformation(Guid id, ItemCategoryInformationVM itemCategoryInformationVM);
        Task<bool> ModifyItemCategoryImage(Guid id, ItemCategoryPostVM itemCategoryPostVM);
        bool DeleteItemCategoryImage(string oldImagePath);
    }
}
