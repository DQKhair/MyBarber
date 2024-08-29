using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyBarBer.Data
{
    [Table("ItemCategories")]
    public class ItemCategories
    {
        [Key]
        public Guid ItemCategory_ID { get; set; }
        [Required]
        [MaxLength(50)]
        public string ItemCategoryName { get; set; } = string.Empty;
        [Range(0, 10000000)]
        public double ItemCategoryPrice { get; set; }
        [MaxLength(100)]
        public string? ItemCategoryDescription { get; set;} = string.Empty;
        public string? ItemCategoryImage { get; set;} = string.Empty;
        public int? Category_ID { get; set; }
        [ForeignKey(nameof(Category_ID))]
        //relationship
        public Categories? Categories { get; set; }

        public ICollection<ReceiptDetails> ReceiptDetails { get; set; }

        public ItemCategories()
        {
            ReceiptDetails = new List<ReceiptDetails>();
        }
    }
}
