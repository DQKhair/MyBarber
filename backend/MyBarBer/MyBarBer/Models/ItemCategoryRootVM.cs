using System.ComponentModel.DataAnnotations;

namespace MyBarBer.Models
{
    public class ItemCategoryRootVM
    {
        [Required]
        [MaxLength(50, ErrorMessage = "Name must be less than 50 characters")]
        [MinLength(1, ErrorMessage = "Name must be more than 1 characters")]
        public required string ItemCategoryName { get; set; }
        [Required]
        [Range(1, 10000000)]
        public double ItemCategoryPrice { get; set; }
        [MaxLength(100, ErrorMessage = "Description must be less than 100 characters")]
        public string? ItemCategoryDescription { get; set; } = string.Empty;
        public int? Category_ID { get; set; }
    }

    public class ItemCategoryPostVM : ItemCategoryRootVM
    {
        [Required]
        public required IFormFile ItemCategoryImage { get; set; }
    }

    public class ItemCategoryInformationVM() : ItemCategoryRootVM
    {

    }
}
