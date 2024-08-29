using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyBarBer.Data
{
    [Table("Methods")]
    public class Methods
    {
        [Key]
        public Guid Method_ID { get; set; }
        [Required]
        [MaxLength(100)]
        public string MethodName { get; set; } = string.Empty;

        //relationship
        public ICollection<Receipts> Receipts { get; set; }

        public Methods() 
        {
            Receipts = new List<Receipts>();
        }
    }
}
