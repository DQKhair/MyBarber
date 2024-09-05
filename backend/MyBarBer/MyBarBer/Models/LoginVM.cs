using System.ComponentModel.DataAnnotations;

namespace MyBarBer.Models
{
    public class LoginVM
    {
        [Required]
        [MaxLength(100)]
        public string email { get; set; } = string.Empty;
        [Required]
        [MaxLength (100)]
        public string password { get; set; } = string.Empty;
    }
}
