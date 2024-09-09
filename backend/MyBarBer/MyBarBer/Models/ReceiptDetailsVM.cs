using System.ComponentModel.DataAnnotations;

namespace MyBarBer.Models
{
    public class ReceiptDetailsVM
    {
        public Guid ReceiptDetail_ID { get; set; }
        public int ReceiptDetailQuantity { get; set; } = 0;
        public double ReceiptDetailPrice { get; set; } = 0;
        public Guid? ItemCategory_ID { get; set; }
        public Guid? Receipt_ID { get; set; }
    }
}
