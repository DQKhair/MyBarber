namespace MyBarBer.Models
{
    public class ReceiptDetailsVM
    {
        public Guid ReceiptDetail_ID { get; set; }
        public int ReceiptDetailQuantity { get; set; }
        public double ReceiptDetailPrice { get; set; }
        public Guid? ItemCategory_ID { get; set; }
        public Guid? Receipt_ID { get; set; }
    }
}
