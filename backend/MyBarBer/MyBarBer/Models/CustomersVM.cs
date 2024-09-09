using System.ComponentModel.DataAnnotations;

namespace MyBarBer.Models
{
    public class CustomersVM
    {
        public Guid Customer_ID { get; set; }
        [Required]
        [MaxLength(50,ErrorMessage ="Name must be less than 50 characters")]
        [MinLength(4,ErrorMessage ="Name must be more than 3 characters")]
        public required string CustomerName { get; set; }
        [Required]
        [MaxLength(11)]
        [MinLength(10)]
        public required string CustomerPhone { get; set; }
        [MaxLength(200)]
        public string? CustomerAddress { get; set; } = string.Empty;
    }
}
