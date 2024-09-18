using System.ComponentModel.DataAnnotations;

namespace MyBarBer.Models
{
    public class EmployeesVM
    {
        public Guid Employee_ID { get; set; }
        [Required]
        [MaxLength(100, ErrorMessage = "Name must be less than 50 characters")]
        [MinLength(1,ErrorMessage ="Name must be more than 1 character")]
        public required string EmployeeName { get; set; }
        [MaxLength(200,ErrorMessage = "Address must be less than 100 characters")]
        public string EmployeeAddress { get; set; } = string.Empty;
        [Required,MaxLength(11),MinLength(10)]
        public required string EmployeePhone { get; set; }
        [Required,MaxLength(100),MinLength(5)]
        public required string EmployeeEmail { get; set; }
        [MaxLength(100, ErrorMessage = "Password must be less than 100 characters"), MinLength(3, ErrorMessage = "Password must be more than 2 characters")]
        public string EmployeePassword { get; set; } = string.Empty;
        public bool EmployeeIsActive { get; set; }
        public Guid? Role_ID { get; set; }
    }
}
