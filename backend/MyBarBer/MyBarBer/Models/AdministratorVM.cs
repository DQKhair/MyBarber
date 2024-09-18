using MyBarBer.Data;
using System.ComponentModel.DataAnnotations;

namespace MyBarBer.Models
{
    public class AdministratorVM
    {
        public Guid Admin_ID { get; set; }
        [Required]
        public required string AdminName { get; set; }
        public string AdminAddress { get; set; } = string.Empty;
        [Required]
        public required string AdminPhone { get; set; }
        [Required]
        public required string AdminEmail { get; set; }
        [Required]
        public required string AdminPassword { get; set; }
        public Guid? Role_ID { get; set; }
    }
}
