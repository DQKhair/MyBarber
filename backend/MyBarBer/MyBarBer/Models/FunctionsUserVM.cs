namespace MyBarBer.Models
{
    public class FunctionsUserVM
    {
        public Guid Function_ID { get; set; }
        public required string FunctionName { get; set; }
        public string? FunctionIcon { get; set; } = string.Empty;
        public string? FunctionRoute { get; set; } = string.Empty;
    }
}
