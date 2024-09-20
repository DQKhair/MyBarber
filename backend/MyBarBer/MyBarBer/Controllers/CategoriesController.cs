using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;
using MyBarBer.DTO;
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
        private readonly IMapper _mapper;

        public CategoriesController(IUnitOfWork unitOfWork, ILogger<CategoriesController> logger, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
            _mapper = mapper;
        }

        // Host/api/Categories
        [Authorize(policy: "RequireAdminRoleAndEmployeeRole")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoriesVM>>> GetCategories()
        {
            try
            {
                var _categories = await _unitOfWork.Categories.GetAllAsync();
                if (_categories != null)
                {
                   //var _listCategoriesVM = CategoriesDTO.ListCategoriesToListCategoriesVM(_categories);
                   var _listCategoriesVM = _mapper.Map<IEnumerable<CategoriesVM>>(_categories);
                    if(_listCategoriesVM != null)
                    {
                        _logger.LogInformation("Get list categories successful!");
                        return StatusCode(StatusCodes.Status200OK, _listCategoriesVM);
                    }
                }
                _logger.LogWarning("Get list categories is fail!");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Get list categories is fail" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error get list categories");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // Host/api/Categories/{id}
        [Authorize(policy: "RequireAdminRoleAndEmployeeRole")]
        [HttpGet("{id}")]
        public async Task<ActionResult<CategoriesVM>> GetCategoryById(int id)
        {
            try
            {
                var _categories = await _unitOfWork.Categories.GetCategoryById(id);
                //var _categoryVM = CategoriesDTO.CategoriesToCategoriesVM(_categories);
                var _categoryVM = _mapper.Map<CategoriesVM>(_categories);
                if (_categories == null && _categoryVM == null)
                {
                    _logger.LogWarning("Could not find this category by Id: {id} ", id);
                    return StatusCode(StatusCodes.Status404NotFound, new APIResVM { Success = false, Message = "Could not find this category" });
                }
                _logger.LogInformation("Get category by Id: {id} successful!", id);
                return StatusCode(StatusCodes.Status200OK, _categoryVM);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error get category by id: {id}", id);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // Host/api/Categories
        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<ActionResult<CategoriesVM>> AddCategories(CategoriesVM categoriesVM)
        {
            try
            {
                var checkCategoryNameExists = await _unitOfWork.Categories.GetCategoryByName(categoriesVM.CategoryName);
                if (checkCategoryNameExists == null)
                {
                    var _category = await _unitOfWork.Categories.AddNewCategory(categoriesVM);

                    if (_category != null)
                    {
                        await _unitOfWork.CompleteAsync();
                        var _categoryByName = await _unitOfWork.Categories.GetCategoryByName(categoriesVM.CategoryName);
                        //var _categoryByNameVM = CategoriesDTO.CategoriesToCategoriesVM(_categoryByName);
                        var _categoryByNameVM = _mapper.Map<CategoriesVM>(_categoryByName);
                        if (_categoryByName != null && _categoryByNameVM != null)
                        {
                            _logger.LogInformation("Add new category successful! Id: {id}", categoriesVM.Category_ID);
                            return CreatedAtAction("GetCategoryById", new { id = _categoryByNameVM.Category_ID }, _categoryByNameVM);
                        }
                        _logger.LogWarning($"Add new category {categoriesVM.CategoryName} is fail!");
                        return StatusCode(StatusCodes.Status400BadRequest);
                    }
                    else
                    {
                        _logger.LogWarning($"Add new category {categoriesVM.CategoryName} is fail!");
                        return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Add new category is fail" });
                    }
                }else
                {
                    _logger.LogWarning($"Category {categoriesVM.CategoryName} is exists!");
                    return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success= false, Message = $"Category {categoriesVM.CategoryName} is exists!" });
                }    
            }
            catch(Exception ex)
            {
                _logger.LogError(ex, "Error create new category: {name}", categoriesVM.CategoryName);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        // Host/api/Categories/5
        [Authorize(Roles = "Administrator")]
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
                    _logger.LogWarning("Delete category is fail by Id: {id}", id);
                    return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Delete category is fail" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error delete category by Id: {id}",id);
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
            
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, CategoriesVM categoriesVM)
        {
            try
            {
                var checkCategoryNameExists = await _unitOfWork.Categories.GetCategoryByName(categoriesVM.CategoryName);
                if (checkCategoryNameExists == null)
                {
                    var result = await _unitOfWork.Categories.ModifyCategory(id, categoriesVM);
                    var _category = await _unitOfWork.Categories.GetCategoryById(id);
                    //var _categoryVM = CategoriesDTO.CategoriesToCategoriesVM(_category);
                    var _categoryVM = _mapper.Map<CategoriesVM>(_category);

                    if (result == true && _categoryVM != null)
                    {
                        await _unitOfWork.CompleteAsync();
                        _logger.LogInformation("Modify category by Id: {Id} successful!", _categoryVM.Category_ID);
                        return StatusCode(StatusCodes.Status200OK, _categoryVM);
                    }
                    _logger.LogWarning("Modify category by Id: {Id} fail!", id);
                    return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Update category is fail" });
                }
                else
                {
                    _logger.LogWarning($"Category {categoriesVM.CategoryName} is exists!");
                    return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = $"Category {categoriesVM.CategoryName} is exists!" });
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
