using System.ComponentModel.DataAnnotations;

namespace MyBarBer.Models
{
    public class CategoriesVM
    {
        public int Category_ID { get; set; }
        [Required]
        [MaxLength(50,ErrorMessage ="Name must be less than 50 characters")]
        [MinLength(1,ErrorMessage ="Name must be more than 1 character")]
        public required string CategoryName { get; set; }
    }
}
