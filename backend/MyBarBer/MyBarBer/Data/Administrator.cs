using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyBarBer.Data
{
    [Table("Administrator")]
    public class Administrator
    {
        [Key]
        public Guid Admin_ID { get; set; }
        [Required]
        [MaxLength(50)]
        public string AdminName { get; set; } = "admin";
        [MaxLength(500)]
        public string? AdminAddress { get; set; } = string.Empty;
        [Required]
        [MaxLength(11)]
        public string AdminPhone { get; set; } = string.Empty;
        [Required]
        [MaxLength(100)]
        public string AdminEmail { get; set; } = string.Empty;
        [Required]
        [MaxLength(100)]
        public string AdminPassword { get; set; } = string.Empty;
        public Guid? Role_ID { get; set; } = Guid.Empty;
        [ForeignKey(nameof(Role_ID))]
        //relationship
        public RolesUser? RoleUser { get; set; }

    }
}
