using System.ComponentModel.DataAnnotations;

namespace MyBarBer.Models
{
    public class ReceiptDetailsVM
    {
        public Guid ReceiptDetail_ID { get; set; }
        public int ProductQuantity { get; set; } = 0;
        public double ProductPrice { get; set; } = 0;
        public string? ProductName { get; set; }
        public Guid? ItemCategory_ID { get; set; }
        public Guid? Receipt_ID { get; set; }
    }
}
