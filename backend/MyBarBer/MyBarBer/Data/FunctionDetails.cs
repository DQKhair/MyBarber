using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyBarBer.Data
{
    [Table("FunctionDetails")]
    public class FunctionDetails
    {
        [Key]
        public Guid FunctionDetail_ID { get; set; }
        [MaxLength(100)]
        public string? Desccription { get; set; } = string.Empty;
        public Guid? Role_ID { get; set; } = Guid.Empty;
        [ForeignKey(nameof(Role_ID))]
        public Guid? Function_ID { get; set; } = Guid.Empty;
        [ForeignKey(nameof(Function_ID))]

        //relationships
        public RolesUser? RoleUser { get; set; }
        public FunctionsUser? FunctionsUser { get; set; }
    }
}
