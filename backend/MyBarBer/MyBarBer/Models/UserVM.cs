namespace MyBarBer.Models
{
    public class UserVM
    {
        public Guid User_ID { get; set; }
        public string UserName { get; set; } = string.Empty;  
        public string UserAddress { get; set; } = string.Empty;
        public string UserPhone { get; set; } = string.Empty;
        public string UserEmail { get; set; } = string.Empty;
        public string UserPassword { get; set; } = string.Empty;
    }
}
