namespace MyBarBer.Models
{
    public class ItemCategoriesVM
    {
        public Guid ItemCategory_ID { get; set; }
        public required string ItemCategoryName { get; set; }
        public double ItemCategoryPrice { get; set; }
        public string? ItemCategoryDescription { get; set; } = string.Empty;
        public string? ItemCategoryImage { get; set; } = string.Empty;
        public int? Category_ID { get; set; }
    }
}
