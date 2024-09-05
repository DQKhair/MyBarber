using MyBarBer.Data;
using MyBarBer.Models;

namespace MyBarBer.Repository
{
    public interface ICategoriesRepository : IGenericRepository<Categories>
    {
        // Add methods specific
        Task<Categories> GetCategoryById(int id);
        Task<bool> AddNewCategory(CategoriesVM categoryVM);
        Task<bool> DeleteCategoryById(int id);
        Task<bool> ModifyCategory(int id,CategoriesVM categoryVM);
    }
}
