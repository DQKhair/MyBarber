using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;

namespace MyBarBer.Repository
{
    public class CategoriesRepository : GenericRepository<Categories>, ICategoriesRepository
    {
        public CategoriesRepository(MyDBContext context,ILogger logger) : base(context, logger)
        {

        }

        public async Task<bool> DeleteCategoryById(int id)
        {
            try
            {
                var entity = await _context.Categories.FindAsync(id);
                if (entity != null)
                {
                    _context.Categories.Remove(entity);
                    return true;
                }
                else
                {
                    _logger.LogWarning("Entity with id {Id} not found for deletion", id);
                    return false;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting entity with id {Id}", id);
                return false;
            }
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
                    return null;
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,"Error get category by Id ");
                return null;
            }
           
        }

    }
}
