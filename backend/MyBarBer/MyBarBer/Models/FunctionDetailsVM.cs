namespace MyBarBer.Models
{
    public class FunctionDetailsVM
    {
        public Guid FunctionDetail_ID { get; set; }
        public string? Desccription { get; set; } = string.Empty;
        public Guid? Role_ID { get; set; }
        public Guid? Function_ID { get; set; }
    }
}
