using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyBarBer.Data
{
    [Table("Categories")]
    public class Categories
    {
        [Key]
        public int Category_ID { get; set; }
        [Required]
        [MaxLength(50)]
        public string CategoryName { get; set; } = string.Empty;

        //relationship
        public ICollection<ItemCategories> ItemCategories { get; set; }

        public Categories() 
        {
            ItemCategories = new List<ItemCategories>();
        }
    }
}
