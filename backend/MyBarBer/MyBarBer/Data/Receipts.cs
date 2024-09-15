using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyBarBer.Data
{
    [Table("Receipts")]
    public class Receipts
    {
        [Key]
        public Guid Receipt_ID { get; set; }
        [Range(1,1000)]
        public int TotalQuantity { get; set; } = 0;
        [Range (1,10000000)]
        public double TotalPrice { get; set; } = 0;
        public DateTime ReceiptDate { get; set; } = DateTime.Now;
        public Guid? Status_ID { get; set; } = Guid.Empty;
        [ForeignKey(nameof(Status_ID))]
        public Guid? Method_ID { get; set; } = Guid.Empty;
        [ForeignKey (nameof(Method_ID))]
        public Guid? Employee_ID { get; set; } = Guid.Empty;
        [ForeignKey(nameof(Employee_ID))]
        public Guid? Employee2_ID { get; set; }
        public DateTime? Employee2_Time {  get; set; }
        public Guid? Employee3_ID { get; set; }
        public DateTime? Employee3_Time { get; set; }
        public Guid? Customer_ID { get; set; } = Guid.Empty;
        [ForeignKey(nameof(Customer_ID))]

        //relationship
        public Statuses? Statuses { get; set; }
        public Methods? Methods { get; set; }
        public Employees? Employees { get; set; }
        public Customers? Customers { get; set; }

        public ICollection<ReceiptDetails> ReceiptDetails { get; set; }

        public Receipts() 
        {
            ReceiptDetails = new List<ReceiptDetails>();
        }
    }
}
