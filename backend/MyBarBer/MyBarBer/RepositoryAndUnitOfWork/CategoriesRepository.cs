using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;
using MyBarBer.DTO;
using MyBarBer.Models;
using System.Net.WebSockets;

namespace MyBarBer.Repository
{
    public class CategoriesRepository : GenericRepository<Categories>, ICategoriesRepository
    {
        public CategoriesRepository(MyDBContext context,ILogger logger) : base(context, logger)
        {
            
        }

        public async Task<Categories> GetCategoryById(int id)
        {
            var _category = await _context.Categories.SingleOrDefaultAsync(c => c.Category_ID == id);
            try
            {
                if (_category != null)
                {
                    return _category;
                }
                else
                {
                    _logger.LogWarning($"Could not find category {id}");
                    return null!;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error get category by Id ");
                return null!;
            }

        }

        public async Task<bool> AddNewCategory(CategoriesVM categoriesVM)
        {
            try
            {
                if (categoriesVM != null)
                {

                    var _category = new Categories
                    {
                        CategoryName = categoriesVM.CategoryName,
                    };
                    await _context.Categories.AddAsync(_category);
                    return true;
                }else
                {
                    _logger.LogWarning("Category is null");
                    return false;
                }    
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error add new category");
                return false;
            }
        }

        public async Task<bool> DeleteCategoryById(int id)
        {
            try
            {
                var _category = await _context.Categories.FindAsync(id);
                if (_category != null)
                {
                    _context.Categories.Remove(_category);
                    return true;
                }
                else
                {
                    _logger.LogWarning("Category with id {Id} not found for deletion", id);
                    return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting category with id {Id}", id);
                return false;
            }
        }

        public async Task<bool> ModifyCategory(int id,CategoriesVM categoriesVM)
        {
            try
            {
                var _categorytoUpdate = await _context.Categories.FindAsync(id);
                if(_categorytoUpdate != null)
                {
                    if (categoriesVM != null)
                    {
                        var _category =  CategoriesDTO.CategoriesVMToCategories(categoriesVM, _categorytoUpdate);
                        if (_category != null)
                        {
                            return true;
                        }else
                        {
                            _logger.LogWarning($"Modify category by Id: {id} is fail");
                            return false;
                        }
                    }
                }
                _logger.LogWarning($"Modify category by Id: {id} is fail");
                return false;
                  
            }catch (Exception ex)
            {
                _logger.LogError(ex, $"Error modify category by Id: {id}");
                return false;
            }
        }

    }
}
