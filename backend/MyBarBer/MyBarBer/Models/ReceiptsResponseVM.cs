using MyBarBer.Data;

namespace MyBarBer.Models
{
    public class ReceiptsResponseVM
    {
        public Guid Receipt_ID { get; set; }
        public int TotalQuantity { get; set; } = 0;
        public double TotalPrice { get; set; } = 0;
        public DateTime ReceiptDate { get; set; } = DateTime.Now;
        public Guid? Status_ID { get; set; } = Guid.Empty;
        public Guid? Method_ID { get; set; } = Guid.Empty;
        public Guid? Employee_ID { get; set; } = Guid.Empty;
        public Guid? Employee2_ID { get; set; }
        public DateTime? Employee2_Time { get; set; }
        public Guid? Employee3_ID { get; set; }
        public DateTime? Employee3_Time { get; set; }
        public Guid? Customer_ID { get; set; } = Guid.Empty;
        
    }

    public class ReceiptResponseAPIVM : ReceiptsResponseVM
    {

        public string? StatusName { get; set; } = string.Empty;
        public string? MethodName { get; set; } = string.Empty;
        public string? EmployeeName { get; set; } = string.Empty;
        public string? EmployeeName2 { get; set; } = string.Empty;
        public string? EmployeeName3 { get; set; } = string.Empty;
        public string? CustomerName { get; set; } = string.Empty;

        public ICollection<ReceiptDetailsVM> listReceiptDetailsVM { get; set; }

        public ReceiptResponseAPIVM()
        {
            listReceiptDetailsVM = new List<ReceiptDetailsVM>();
        }
    }
}
