namespace MyBarBer.Models
{
    public class APIAuthenticationResVM
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public object? AccessToken { get; set; }
        public object? RefreshToken { get; set; }
    }
}
