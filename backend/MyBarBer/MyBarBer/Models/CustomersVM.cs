namespace MyBarBer.Models
{
    public class CustomersVM
    {
        public Guid Customer_ID { get; set; }
        public required string CustomerName { get; set; }
        public required string CustomerPhone { get; set; }
        public string? CustomerAddress { get; set; } = string.Empty;
    }
}
