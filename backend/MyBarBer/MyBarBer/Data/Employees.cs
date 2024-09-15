using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyBarBer.Data
{
    [Table("Employees")]
    public class Employees
    {
        [Key]
        public Guid Employee_ID { get; set; }
        [Required]
        [MaxLength(100)]
        public string EmployeeName { get; set; } = string.Empty;
        [MaxLength(500)]
        public string? EmployeeAddress { get; set; } = string.Empty;
        [Required]
        [MaxLength(11)]
        public string EmployeePhone { get; set; } = string.Empty;
        public DateTime? EmployeeDate { get; set; } = DateTime.Now;
        [Required]
        [MaxLength (100)]
        public string EmployeeEmail {  get; set; } = string.Empty;
        [Required, MaxLength (100)]
        public string EmployeePassword {  get; set; } = string.Empty;
        public bool EmployeeIsActive { get; set; } = false;
        public Guid? Role_ID { get; set; } = Guid.Empty;
        [ForeignKey(nameof(Role_ID))]

        //relationship
        public RolesUser? RolesUser { get; set; }

        public ICollection<Receipts> Receipts { get; set; }

        public Employees()
        {
            Receipts = new List<Receipts>();
        }
    }
}
