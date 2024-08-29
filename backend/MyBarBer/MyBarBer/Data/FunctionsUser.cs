using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyBarBer.Data
{
    [Table("FunctionsUser")]
    public class FunctionsUser
    {
        [Key]
        public Guid Function_ID { get; set; }
        [Required]
        [MaxLength(100)]
        public string FunctionName { get; set; } = string.Empty;
        [MaxLength(200)]
        public string? FunctionIcon {  get; set; } = string.Empty;
        [MaxLength(200)]
        public string? FunctionRoute {  get; set; } = string.Empty;

        //relationship
        public ICollection<FunctionDetails> FunctionDetails { get; set; }

        public FunctionsUser() 
        { 
            FunctionDetails = new List<FunctionDetails>();
        }
    }
}
