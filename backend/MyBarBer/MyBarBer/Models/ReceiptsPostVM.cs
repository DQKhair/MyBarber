using System.ComponentModel.DataAnnotations;

namespace MyBarBer.Models
{
    public class ReceiptsPostVM
    {
        [Required]
        public string CustomerName { get; set; } = string.Empty;
        [Required]
        public string CustomerPhone { get; set; } = string.Empty;
        [Required]
        public string CustomerAddress { get; set; } = string.Empty;
        public List<ItemCategoriesVM> ProductsInput { get; set; } = new List<ItemCategoriesVM>();
        public List<int> ProductQuantityInput { get; set;} = new List<int>();
        public List<ItemCategoriesVM> ServicesInput { get; set ; } = new List<ItemCategoriesVM>();
    }
}
