using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;

        public CategoriesController(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Categories>>> GetCategories()
        {
              var _categories = await _unitOfWork.Categories.GetAllAsync();
            if (_categories != null)
            {
                return Ok(_categories);
            }else
            {
                return BadRequest();
            }    

           
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Categories>> GetCategories(int id)
        {
            var categories = await _unitOfWork.Categories.GetCategoryById(id);

            if (categories == null)
            {
                return NotFound();
            }

            return Ok(categories);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategories(int id, Categories categories)
        {
            if (id != categories.Category_ID)
            {
                return BadRequest();
            }

            await _unitOfWork.Categories.UpdateAsync(categories);
            try
            {
                await _unitOfWork.CompleteAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                return BadRequest();
                //if (!CategoriesExists(id))
                //{
                //    return NotFound();
                //}
                //else
                //{
                //    throw;
                //}
            }

            return NoContent();
        }

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Categories>> PostCategories(CategoriesVM categoriesVM)
        {
            var _category = new Categories
            {
                CategoryName = categoriesVM.CategoryName,
            };
            await  _unitOfWork.Categories.AddAsync(_category);
            await _unitOfWork.CompleteAsync();

            return CreatedAtAction("GetCategories", new { id = categoriesVM.Category_ID }, categoriesVM);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategories(int id)
        {
            var isComplete = await _unitOfWork.Categories.DeleteCategoryById(id);
            if(isComplete == true)
            {
                await _unitOfWork.CompleteAsync();
                return NoContent();
            }else
            {
                return BadRequest();
            }    
        }

        //private bool CategoriesExists(int id)
        //{
        //    return _context.Categories.Any(e => e.Category_ID == id);
        //}
    }
}
