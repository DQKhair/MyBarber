using MyBarBer.Data;

namespace MyBarBer.Repository
{
    public interface ICategoriesRepository : IGenericRepository<Categories>
    {
        // add methods that are specific to the Player entity
        Task<Categories> GetCategoryById(int id);
        Task<bool> DeleteCategoryById(int id);
    }
}
