using Microsoft.AspNetCore.Mvc;
using MyBarBer.Data;
using MyBarBer.DTO;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public class ItemCategoriesRepository : GenericRepository<ItemCategories>, IItemCategoriesRepository
    {
        public ItemCategoriesRepository(MyDBContext context, ILogger logger) : base(context, logger)
        {
        }

        public async Task<ItemCategoriesVM> AddNewItemCategory([FromForm] ItemCategoryPostVM itemCategoryPostVM)
        {
            try
            {
                if(itemCategoryPostVM != null && itemCategoryPostVM.ItemCategoryImage != null)
                {

                    var folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
                    if(!Directory.Exists(folderPath))
                    {
                        Directory.CreateDirectory(folderPath);
                    }

                    string imgPath = Guid.NewGuid().ToString() + "_" + itemCategoryPostVM.ItemCategoryImage.FileName;
                    var filePath = Path.Combine(folderPath, imgPath);

                    using (var stream = new FileStream(filePath,FileMode.Create))
                    {
                        await itemCategoryPostVM.ItemCategoryImage.CopyToAsync(stream);
                    }

                    string _itemCategoryImage = $"/images/{imgPath}";

                    var _itemCategory = ItemCategoriesDTO.CreateNewItemCategory(itemCategoryPostVM, _itemCategoryImage);
                    if (_itemCategory != null)
                    {
                        var _itemCategoryVM = ItemCategoriesDTO.ItemCategoriesToItemCategoriesVM(_itemCategory);
                        if(_itemCategoryVM != null)
                        {
                            await _context.ItemCategories.AddAsync(_itemCategory);
                            return _itemCategoryVM;
                        }
                    }
                }
                _logger.LogWarning($"Create new item category {itemCategoryPostVM?.ItemCategoryName} is fail");
                return null!;
            }catch (Exception ex)
            {
                _logger.LogError(ex, $"Error create new item category {itemCategoryPostVM?.ItemCategoryName}");
                return null!;
            }
        }

        public bool DeleteItemCategoryImage(string oldImagePath)
        {
           try
           {
                if (!string.IsNullOrEmpty(oldImagePath))
                {
                    string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
                    string _oldImagePath = Path.Combine(folderPath, Path.GetFileName(oldImagePath));
                    if (File.Exists(_oldImagePath))
                    {
                        File.Delete(_oldImagePath);
                        return true;
                    }
                }
                _logger.LogWarning($"Delete item category image by path {oldImagePath} is fail!");
                return false;
           }catch (Exception ex)
           {
                _logger.LogError(ex, $"Error delete item category image by path {oldImagePath}");
                return false;
           }
        }

        public async Task<bool> ModifyItemCategoryImage(Guid id, ItemCategoryPostVM itemCategoryPostVM)
        {
            try
            {
                if (itemCategoryPostVM != null && itemCategoryPostVM.ItemCategoryImage != null)
                {
                    var _itemImage = await _context.ItemCategories.FindAsync(id);
                    if (_itemImage != null && _itemImage.ItemCategoryImage != null)
                    {
                        string folderPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot/images");
                        string _oldImagePath = Path.Combine(folderPath, Path.GetFileName(_itemImage.ItemCategoryImage));

                        if(File.Exists(_oldImagePath))
                        {
                            File.Delete(_oldImagePath);
                        }

                        string _imagePath = Guid.NewGuid().ToString() + "_" + itemCategoryPostVM.ItemCategoryImage.FileName;
                        string filePath = Path.Combine(folderPath, _imagePath);

                        using (var stream = new FileStream(filePath,FileMode.Create))
                        {
                            await itemCategoryPostVM.ItemCategoryImage.CopyToAsync(stream);
                        }

                        string _itemCategoryImage = $"/images/{_imagePath}";
                        var updateItemCategoryImage = ItemCategoriesDTO.ItemCategoriesImageVMToItemCategoriesImage(itemCategoryPostVM, _itemImage, _itemCategoryImage);
                        if (updateItemCategoryImage != null)
                        {
                            return true;
                        }
                    }
                }
                _logger.LogWarning($"Modify item category information by id {id} is fail");
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error modify item category information by id {id}");
                return false;
            }
        }

        public async Task<bool> ModifyItemCategoryInformation(Guid id, ItemCategoryInformationVM itemCategoryInformationVM)
        {
            try
            {
                if (itemCategoryInformationVM != null)
                {
                    var _itemCategoryInformation = await _context.ItemCategories.FindAsync(id);
                    if (_itemCategoryInformation != null)
                    {
                        var _itemCategoryVM = ItemCategoriesDTO.ItemCategoriesInformationVMToItemCategoriesInformation(itemCategoryInformationVM, _itemCategoryInformation);
                        if (_itemCategoryVM != null)
                        {
                            return true;
                        }
                    }
                }
                _logger.LogWarning($"Modify item category information by id {id} is fail");
                return false;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex,$"Error modify item category information by id {id}");
                return false;
            }
        }

       
    }
}
