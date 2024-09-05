
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
                _logger.LogInformation("Add new entity is success");
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
                    _logger.LogInformation("Remove entity is success");
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
                    _logger.LogInformation("Updated entity is success");
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
            try
            {
                var entity = await _dbSet.ToListAsync();
                if (entity != null)
                {
                    _logger.LogInformation("Get list entity is success");
                    return entity;
                }else
                {
                    _logger.LogWarning("Get list entity is not found");
                    return null; 
                }    
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,"Error get list entity");
                return null;
            }
           
        }

        public virtual async Task<T> GetByIdAsync(Guid id)
        {
            try
            {
                var result = await _dbSet.FindAsync(id);
                if (result != null)
                {
                    _logger.LogInformation("get entity is success");
                    return result;
                    
                }else
                {
                    _logger.LogWarning("Entity with ID '{id}' not found.",id);
                    return null;
                }    
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error getting entity with id {Id}", id);
                return null;
            }
           
        }
    }
}
