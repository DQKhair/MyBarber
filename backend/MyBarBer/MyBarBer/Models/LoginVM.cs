using System.ComponentModel.DataAnnotations;

namespace MyBarBer.Models
{
    public class LoginVM
    {
        [Required]
        [MaxLength(100)]
        public string email { get; set; } = string.Empty;
        [Required]
        [MaxLength (100,ErrorMessage ="Password must be less than 100 characters")]
        [MinLength(6,ErrorMessage ="Password must be more than 6 characters")]
        public string password { get; set; } = string.Empty;
    }
}
