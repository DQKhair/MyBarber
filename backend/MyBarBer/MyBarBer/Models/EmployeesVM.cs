namespace MyBarBer.Models
{
    public class EmployeesVM
    {
        public Guid Employee_ID { get; set; }
        public required string EmployeeName { get; set; }
        public string? EmployeeAddress { get; set; } = string.Empty;
        public required string EmployeePhone { get; set; }
        public required string EmployeeEmail { get; set; }
        public required string EmployeePassword { get; set; }
        public bool EmployeeIsActive { get; set; }
        public Guid? Role_ID { get; set; }
    }
}
