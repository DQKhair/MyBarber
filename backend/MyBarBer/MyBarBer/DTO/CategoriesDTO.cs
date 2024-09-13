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
                if(categoriesVM != null && categories != null)
                {
                    categories.CategoryName = categoriesVM.CategoryName;

                    return categories;
                }
                return null!;
            }catch
            {
                return null!;
            }
        }

        public static CategoriesVM CategoriesToCategoriesVM(Categories categories)
        {
            try
            {
                if(categories != null)
                {
                    var _category = new CategoriesVM
                    {
                        Category_ID = categories.Category_ID,
                        CategoryName = categories.CategoryName,
                    };
                    return _category;
                }    
                return null!;
            }
            catch
            {
                return null!;
            }
        }

        public static Categories CreateNewCategory(CategoriesVM categoryVM)
        {
            try
            {
                if(categoryVM != null)
                {
                    var _category = new Categories
                    {
                        CategoryName = categoryVM.CategoryName,
                    };
                    return _category;
                }   
                return null!;
            }catch
            {
                return null!;
            }
        }

        public static IEnumerable<CategoriesVM> ListCategoriesToListCategoriesVM(IEnumerable<Categories> categoriesList)
        {
            try
            {
                if(categoriesList != null)
                {
                    var categoriesVMList = categoriesList.Select(categories => new CategoriesVM
                    {
                        Category_ID = categories.Category_ID,
                        CategoryName = categories.CategoryName,
                    }).ToList();

                    return categoriesVMList;
                }    
                return null!;
            }
            catch
            {
                return null!;
            }
        }
    }
}
