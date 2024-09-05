using MyBarBer.Data;
using MyBarBer.Models;

namespace MyBarBer.DTO
{
    public class CategoriesDTO
    {
        private static readonly ILogger<CategoriesDTO> _logger;
        public static Categories CategoriesVMToCategories(CategoriesVM categoriesVM, Categories categories)
        {
            try
            {
                categories.CategoryName = categoriesVM.CategoryName;

                return categories;
            }catch (Exception ex)
            {
                _logger.LogError(ex, "Error convert categoriesVM to categories");
                return null;
            }
        }

        public static CategoriesVM CategoriesToCategoriesVM(Categories categories, CategoriesVM categoriesVM)
        {
            try
            {
                categoriesVM.Category_ID = categoriesVM.Category_ID;
                categoriesVM.CategoryName = categories.CategoryName;

                return categoriesVM;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error convert categories to categoriesVM");
                return null;
            }
        }
    }
}
