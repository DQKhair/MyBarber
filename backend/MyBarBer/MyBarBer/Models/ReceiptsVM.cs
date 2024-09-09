namespace MyBarBer.Models
{
    public class ReceiptsVM
    {
        public Guid Receipt_ID { get; set; }
        public int TotalQuantity { get; set; } = 0;
        public double TotalPrice { get; set; } = 0;
        public DateTime ReceiptDate { get; set; } = DateTime.Now;
        public Guid? Status_ID { get; set; }
        public Guid? Method_ID { get; set; }
        public Guid? Employee_ID { get; set; }
        public Guid? Customer_ID { get; set; }
    }
}
