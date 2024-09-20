using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyBarBer.DTO;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.Controllers
{
    
    [Route("api/[controller]")]
    [ApiController]
    public class ItemCategoriesController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private ILogger<ItemCategoriesController> _logger;

        public ItemCategoriesController(IUnitOfWork unitOfWork, ILogger<ItemCategoriesController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        [Authorize(policy: "RequireAdminRoleAndEmployeeRole")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ItemCategoriesVM>>> GetItemCategories()
        {
            try
            {
                var _itemCategories = await _unitOfWork.ItemCategories.GetAllAsync();
                var _itemCategoriesVM = ItemCategoriesDTO.ListItemCategoriesToListItemCategoriesVM(_itemCategories);
                if (_itemCategories != null && _itemCategoriesVM != null)
                {
                    _logger.LogInformation("Get list item categories is success!");
                    return StatusCode(StatusCodes.Status200OK, _itemCategoriesVM);
                }
                _logger.LogWarning("Get list item categories is fail!");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Get list item categories is fail" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error get list item categories");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [Authorize(policy: "RequireAdminRoleAndEmployeeRole")]
        [HttpGet("{id}")]
        public async Task<ActionResult<ItemCategoriesVM>> GetItemCategoryById(Guid id)
        {
            try
            {
                var _itemCategory = await _unitOfWork.ItemCategories.GetByIdAsync(id);
                if (_itemCategory != null)
                {
                    var _itemCategoryVM = ItemCategoriesDTO.ItemCategoriesToItemCategoriesVM(_itemCategory);
                    if (_itemCategoryVM != null)
                    {
                        _logger.LogInformation($"Get item category by id: {id} is success");
                        return StatusCode(StatusCodes.Status200OK, _itemCategoryVM);
                    }
                }
                _logger.LogWarning($"Get item category by Id: {id} is fail!");
                return StatusCode(StatusCodes.Status404NotFound, new APIResVM { Success = false, Message = "Get item category is fail" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error get item categories by id {id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [Authorize(Roles = "Administrator")]
        [HttpPost]
        public async Task<ActionResult<ItemCategoriesVM>> AddCategory([FromForm] ItemCategoryPostVM itemCategoryPostVM)
        {
            try
            {
                if(itemCategoryPostVM != null && itemCategoryPostVM.ItemCategoryImage != null)
                {
                    var _itemCategory = await _unitOfWork.ItemCategories.AddNewItemCategory(itemCategoryPostVM);
                    if (_itemCategory != null)
                    {
                        await _unitOfWork.CompleteAsync();
                        return CreatedAtAction(nameof(GetItemCategoryById), new { id = _itemCategory.ItemCategory_ID }, _itemCategory);
                    }
                }
                _logger.LogWarning($"Add new item category is fail!");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Add new item category is fail" });
            }catch (Exception ex)
            {
                _logger.LogError(ex, $"Error add new item categories by name {itemCategoryPostVM.ItemCategoryName}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [Authorize(Roles = "Administrator")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteItemCategoryById(Guid id)
        {
            try
            {
                var _itemCategory = await _unitOfWork.ItemCategories.GetByIdAsync(id);
                if (_itemCategory != null) 
                {
                    var _oldImagePath = _itemCategory.ItemCategoryImage;
                    bool result = await _unitOfWork.ItemCategories.DeleteAsync(id);

                    if(result == true && !String.IsNullOrEmpty(_oldImagePath))
                    {
                        await _unitOfWork.CompleteAsync();
                        bool deleted = _unitOfWork.ItemCategories.DeleteItemCategoryImage(_oldImagePath);
                        if(deleted)
                        {
                            _logger.LogInformation($"Delete item category by id {id} is success!");
                            return StatusCode(StatusCodes.Status200OK);
                        }
                        _logger.LogWarning($"Delete item category by id {id} is success But can not delete file item category image path {_oldImagePath}!");
                        return StatusCode(StatusCodes.Status200OK);
                    }
                }
                _logger.LogWarning($"Delete item category by id {id} is fail!");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Delete item category is fail" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error delete item category by id {id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("update_information/{id}")]
        public async Task<ActionResult<ItemCategoriesVM>> UpdateItemCategoryInformation(Guid id, ItemCategoryInformationVM itemCategoryInformationVM)
        {
            try
            {
                if(itemCategoryInformationVM != null)
                {
                    bool result = await _unitOfWork.ItemCategories.ModifyItemCategoryInformation(id, itemCategoryInformationVM);
                    if(result)
                    {
                        await _unitOfWork.CompleteAsync();

                        var _itemCategory = await _unitOfWork.ItemCategories.GetByIdAsync(id);
                        var _itemCategoryVM = ItemCategoriesDTO.ItemCategoriesToItemCategoriesVM(_itemCategory);

                        if (_itemCategory != null && _itemCategoryVM != null)
                        {
                            _logger.LogInformation($"Update item category information by id {id} is success!");
                            return StatusCode(StatusCodes.Status200OK, _itemCategoryVM);
                        }
                    }
                }
                _logger.LogError($"Update item category information by id {id} is fail");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Update item category is fail" });
            }catch (Exception ex)
            {
                _logger.LogError(ex, $"Error update item category infomation by id {id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [Authorize(Roles = "Administrator")]
        [HttpPut("update_Image/{id}")]
        public async Task<ActionResult<ItemCategoriesVM>> UpdateItemCategoryImage(Guid id,[FromForm] ItemCategoryPostVM itemCategoryPostVM)
        {
            try
            {
                if (itemCategoryPostVM != null && itemCategoryPostVM.ItemCategoryImage != null)
                {
                    bool result = await _unitOfWork.ItemCategories.ModifyItemCategoryImage(id, itemCategoryPostVM);
                    if (result)
                    {
                        await _unitOfWork.CompleteAsync();

                        var _itemCategory = await _unitOfWork.ItemCategories.GetByIdAsync(id);
                        var _itemCategoryVM = ItemCategoriesDTO.ItemCategoriesToItemCategoriesVM(_itemCategory);

                        if (_itemCategory != null && _itemCategoryVM != null)
                        {
                            _logger.LogInformation($"Update item category image by id {id} is success!");
                            return StatusCode(StatusCodes.Status200OK, _itemCategoryVM);
                        }
                    }
                }
                _logger.LogError($"Update item category image by id {id} is fail");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Update item category is fail" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error update item category image by id {id}");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
