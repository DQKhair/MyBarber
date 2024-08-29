using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyBarBer.Data
{
    [Table("RolesUser")]
    public class RolesUser
    {
        [Key]
        public Guid Role_ID { get; set; }
        [Required]
        [MaxLength(100)]
        public string RoleName { get; set; }

        //relationship
        public ICollection<FunctionDetails> FunctionDetails { get; set; }
        public ICollection<Employees> Employees { get; set; }
        public ICollection<Administrator> Administrators { get; set; }

        public RolesUser()
        {
            FunctionDetails = new List<FunctionDetails>();
            Employees = new List<Employees>();
            Administrators = new List<Administrator>(); 
        }

    }
}
