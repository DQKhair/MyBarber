using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyBarBer.Data
{
    [Table("ReceiptDetails")]
    public class ReceiptDetails
    {
        [Key]
        public Guid ReceiptDetail_ID { get; set; }
        [Range(1, 1000)]
        public int ReceiptDetailQuantity { get; set; }
        [Range (1, 10000000)]
        public double ReceiptDetailPrice { get; set; } = 0;
        public Guid? ItemCategory_ID { get; set; }
        [ForeignKey(nameof(ItemCategory_ID))]
        public Guid? Receipt_ID { get; set; }
        [ForeignKey(nameof(Receipt_ID))]

        //relationship
        public ItemCategories? ItemCategories { get; set; }
        public Receipts? Receipts { get; set; }
    }
}
