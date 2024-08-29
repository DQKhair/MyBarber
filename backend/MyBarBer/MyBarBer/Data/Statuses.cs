using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyBarBer.Data
{
    [Table("Statuses")]
    public class Statuses
    {
        [Key]
        public Guid Status_ID { get; set; }
        [Required]
        [MaxLength(100)]
        public string StatusName { get; set; } = string.Empty;

        //relationship
        public ICollection<Receipts> Receipts { get; set; }

        public Statuses()
        {
             Receipts = new List<Receipts>();
        }
    }
}
