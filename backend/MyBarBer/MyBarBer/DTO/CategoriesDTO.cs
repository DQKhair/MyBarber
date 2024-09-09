using MyBarBer.Data;
using MyBarBer.Models;

namespace MyBarBer.DTO
{
    public class CategoriesDTO
    {

        public static Categories CategoriesVMToCategories(CategoriesVM categoriesVM, Categories categories)
        {
            try
            {
                categories.CategoryName = categoriesVM.CategoryName;

                return categories;
            }catch
            {
                return null!;
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
            catch
            {
                return null!;
            }
        }
    }
}
