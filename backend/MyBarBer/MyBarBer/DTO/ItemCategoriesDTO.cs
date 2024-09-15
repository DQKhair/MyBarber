using MyBarBer.Data;
using MyBarBer.Models;

namespace MyBarBer.DTO
{
    public class ItemCategoriesDTO
    {
        public static ItemCategories ItemCategoriesVMToItemCategories(ItemCategoriesVM itemCategoriesVM, ItemCategories itemCategories)
        {
            try
            {
                if (itemCategoriesVM != null && itemCategories != null)
                {
                    itemCategories.ItemCategoryName = itemCategoriesVM.ItemCategoryName;
                    itemCategories.ItemCategoryPrice = itemCategoriesVM.ItemCategoryPrice;
                    itemCategories.ItemCategoryDescription = itemCategoriesVM.ItemCategoryDescription;
                    itemCategories.ItemCategoryImage = itemCategoriesVM.ItemCategoryImage;
                    itemCategories.Category_ID = itemCategoriesVM.Category_ID;

                    return itemCategories;
                }
                return null!;
            }
            catch
            {
                return null!;
            }
        }

        public static ItemCategories ItemCategoriesInformationVMToItemCategoriesInformation(ItemCategoryInformationVM itemCategoryInformationVM, ItemCategories itemCategories)
        {
            try
            {
                if (itemCategoryInformationVM != null && itemCategories != null)
                {
                    itemCategories.ItemCategoryName = itemCategoryInformationVM.ItemCategoryName;
                    itemCategories.ItemCategoryPrice = itemCategoryInformationVM.ItemCategoryPrice;
                    itemCategories.ItemCategoryDescription = itemCategoryInformationVM.ItemCategoryDescription;
                    itemCategories.Category_ID = itemCategoryInformationVM.Category_ID;

                    return itemCategories;
                }
                return null!;
            }
            catch
            {
                return null!;
            }
        }

        public static ItemCategories ItemCategoriesImageVMToItemCategoriesImage(ItemCategoryPostVM itemCategoryPostVM, ItemCategories itemCategories, string itemCategoryImage)
        {
            try
            {
                if (itemCategoryImage != null && itemCategories != null)
                {
                    itemCategories.ItemCategoryName = itemCategoryPostVM.ItemCategoryName;
                    itemCategories.ItemCategoryPrice = itemCategoryPostVM.ItemCategoryPrice;
                    itemCategories.ItemCategoryDescription = itemCategoryPostVM.ItemCategoryDescription;
                    itemCategories.ItemCategoryImage = itemCategoryImage;
                    itemCategories.Category_ID = itemCategoryPostVM.Category_ID;

                    return itemCategories;
                }
                return null!;
            }
            catch
            {
                return null!;
            }
        }

        public static ItemCategoriesVM ItemCategoriesToItemCategoriesVM(ItemCategories itemCategories)
        {
            try
            {
                if (itemCategories != null)
                {
                    var _itemCategory = new ItemCategoriesVM
                    {
                        ItemCategory_ID = itemCategories.ItemCategory_ID,
                        ItemCategoryName = itemCategories.ItemCategoryName,
                        ItemCategoryPrice = itemCategories.ItemCategoryPrice,
                        ItemCategoryImage = itemCategories.ItemCategoryImage,
                        ItemCategoryDescription = itemCategories.ItemCategoryDescription,
                        Category_ID = itemCategories.Category_ID,
                    };
                    return _itemCategory;
                }
                return null!;
            }
            catch
            {
                return null!;
            }
        }

        public static ItemCategories CreateNewItemCategory(ItemCategoryRootVM itemCategoryPostVM,string imagePath)
        {
            try
            {
                if (itemCategoryPostVM != null)
                {
                    var _itemCategory = new ItemCategories
                    {
                        ItemCategory_ID = Guid.NewGuid(),
                        ItemCategoryName = itemCategoryPostVM.ItemCategoryName,
                        ItemCategoryPrice = itemCategoryPostVM.ItemCategoryPrice,
                        ItemCategoryDescription = itemCategoryPostVM.ItemCategoryDescription,
                        ItemCategoryImage = imagePath,
                        Category_ID = itemCategoryPostVM.Category_ID,
                    };
                    return _itemCategory;
                }
                return null!;
            }
            catch
            {
                return null!;
            }
        }

        public static IEnumerable<ItemCategoriesVM> ListItemCategoriesToListItemCategoriesVM(IEnumerable<ItemCategories> itemCategoriesList)
        {
            try
            {
                if (itemCategoriesList != null)
                {
                    var itemCategoriesVMList = itemCategoriesList.Select(itemCategory => new ItemCategoriesVM
                    {
                        ItemCategory_ID = itemCategory.ItemCategory_ID,
                        ItemCategoryName = itemCategory.ItemCategoryName,
                        ItemCategoryPrice = itemCategory.ItemCategoryPrice,
                        ItemCategoryDescription= itemCategory.ItemCategoryDescription,
                        ItemCategoryImage = itemCategory.ItemCategoryImage,
                        Category_ID= itemCategory.Category_ID,
                    }).ToList();

                    return itemCategoriesVMList;
                }
                return null!;
            }
            catch
            {
                return null!;
            }
        }
    }
}
