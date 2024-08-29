using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyBarBer.Data
{
    [Table("Customers")]
    public class Customers
    {
        [Key]
        public Guid Customer_ID { get; set; }
        [Required]
        [MaxLength(100)]
        public string CustomerName { get; set; } = string.Empty;
        [Required]
        [MaxLength (11)]
        public string CustomerPhone {  get; set; } = string.Empty;
        [MaxLength(500)]
        public string? CustomerAddress { get; set; } = string.Empty;

        //relationship
        public ICollection<Receipts> Receipts { get; set; }

        public Customers()
        {
            Receipts = new List<Receipts>();
        }
    }
}
