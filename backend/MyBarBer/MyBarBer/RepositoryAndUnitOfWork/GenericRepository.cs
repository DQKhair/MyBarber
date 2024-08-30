
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using MyBarBer.Data;

namespace MyBarBer.Repository
{
    public class GenericRepository<T> : IGenericRepository<T> where T : class
    {
        protected readonly MyDBContext _context;
        protected readonly ILogger _logger;
        protected DbSet<T> _dbSet;

        public GenericRepository(MyDBContext context, ILogger logger)
        {
            _context = context;
            _logger = logger;
            this._dbSet = _context.Set<T>();
        }

        public virtual async Task<bool> AddAsync(T entity)
        {
            try
            {
                await _dbSet.AddAsync(entity);
                return true;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding entity");
                return false;
            }
        }

        public virtual async Task<bool> DeleteAsync(Guid id)
        {
                try
                {
                    var entity = await _dbSet.FindAsync(id);
                    if (entity != null)
                    {
                    _dbSet.Remove(entity);
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

        public virtual async Task<bool> UpdateAsync(T entity)
        {
            try
            {
                if(entity != null)
                {
                    _context.Entry(entity).State = EntityState.Modified;
                    return true;
                }   
                else
                {
                    _logger.LogWarning("Entity not found for update");
                    return false;
                }    
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating entity");
                return false;
            }
        }

        public virtual async Task<IEnumerable<T>> GetAllAsync()
        {
            return await _dbSet.ToListAsync();
        }

        public virtual async Task<T> GetByIdAsync(Guid id)
        {
            try
            {
                var result = await _dbSet.FindAsync(id);
                if (result == null)
                {
                    throw new KeyNotFoundException($"Entity with ID '{id}' not found.");
                }
                return result;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting entity with id {Id}", id);
                return null;
            }
           
        }
    }
}
