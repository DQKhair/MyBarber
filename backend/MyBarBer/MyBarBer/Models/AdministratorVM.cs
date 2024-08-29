using MyBarBer.Data;

namespace MyBarBer.Models
{
    public class AdministratorVM
    {
        public Guid Admin_ID { get; set; }
        public required string AdminName { get; set; }
        public string? AdminAddress { get; set; }
        public required string AdminPhone { get; set; }
        public required string AdminEmail { get; set; }
        public required string AdminPassword { get; set; }
        public Guid? Role_ID { get; set; }
    }
}
