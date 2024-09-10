using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
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
        private readonly ILogger<CategoriesController> _logger;

        public CategoriesController(IUnitOfWork unitOfWork, ILogger<CategoriesController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        // GET: api/Categories
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoriesVM>>> GetCategories()
        {
            try
            {
                var _categories = await _unitOfWork.Categories.GetAllAsync();
                if (_categories != null)
                {
                    _logger.LogInformation("Get list categories successful!");
                    return StatusCode(StatusCodes.Status200OK,_categories);
                }
                else
                {
                    _logger.LogWarning("Get list categories is fail!");
                    return StatusCode(StatusCodes.Status400BadRequest);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error get list categories");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoriesVM>> GetCategoryById(int id)
        {
            try
            {
                var _categories = await _unitOfWork.Categories.GetCategoryById(id);

                if (_categories == null)
                {
                    _logger.LogWarning("Could not find this category by Id: {id} ", id);
                    return StatusCode(StatusCodes.Status404NotFound);
                }else
                {
                    _logger.LogInformation("Get category by Id: {id} successful!", id);
                    return StatusCode(StatusCodes.Status200OK, _categories);
                }    
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error get category by id: {id}", id);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // POST: api/Categories
        [HttpPost]
        public async Task<ActionResult<CategoriesVM>> AddCategories(CategoriesVM categoriesVM)
        {
            try
            {
                var result = await _unitOfWork.Categories.AddNewCategory(categoriesVM);

                if(result == true)
                {
                    await _unitOfWork.CompleteAsync();
                    _logger.LogInformation("Add new category successful! Id: {id}", categoriesVM.Category_ID);
                    //return StatusCode(StatusCodes.Status201Created, new { id = categoriesVM.Category_ID });
                    return CreatedAtAction("GetCategoryById", new { id = categoriesVM.Category_ID }, categoriesVM);
                }
                else
                {
                    _logger.LogWarning($"Add new category {categoriesVM.CategoryName} is fail!");
                    return StatusCode(StatusCodes.Status400BadRequest);
                }  
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error create new category: {name}", categoriesVM.CategoryName);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategories(int id)
        {
            try
            {
                    var isComplete = await _unitOfWork.Categories.DeleteCategoryById(id);
                    if (isComplete == true)
                    {
                        await _unitOfWork.CompleteAsync();
                        _logger.LogInformation("Delete category successful! Id: {id}", id);
                        return StatusCode(StatusCodes.Status200OK);
                    }
                    else
                    {
                        _logger.LogWarning("Delete category is fail by Id: {id}", id);
                        return StatusCode(StatusCodes.Status400BadRequest);
                    }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error delete category by Id: {id}",id);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, CategoriesVM categoriesVM)
        {
            if (id != categoriesVM.Category_ID)
            {
                _logger.LogWarning("Modify category by Id: {Id} is not match", categoriesVM.Category_ID);
                return StatusCode(StatusCodes.Status400BadRequest);
            }
            try
            {
                var result = await _unitOfWork.Categories.ModifyCategory(id, categoriesVM);
                if (result == true)
                {
                    await _unitOfWork.CompleteAsync();
                    _logger.LogInformation("Modify category by Id: {Id} successful!", categoriesVM.Category_ID);
                    return StatusCode(StatusCodes.Status200OK,categoriesVM);
                }
                else
                {
                    _logger.LogWarning("Modify category by Id: {Id} fail!",id);
                    return StatusCode(StatusCodes.Status400BadRequest);
                }
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error modify category by id: {id}", id);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
