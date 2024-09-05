using BCr = BCrypt.Net;

namespace MyBarBer.Helper
{
    public class HashPassword
    {
        public static string ConvertPasswordToHash(string password)
        {
            string salt = BCr.BCrypt.GenerateSalt(12);

            return BCr.BCrypt.HashPassword(password,salt);
        }

        public static bool VerifyPassword(string passwordInput, string passwordHash)
        {
            return BCr.BCrypt.Verify(passwordInput, passwordHash);
        }
    }
}
