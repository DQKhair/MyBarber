using MailKit.Net.Smtp;
using MimeKit;

namespace MyBarBer.Helper
{
    public class MailServices
    {
        public static async Task<bool> SenEmailAsync(string toEmail, string subject, string message, ILogger logger, IConfiguration configuration)
        {
            try
            {
                var _email = new MimeMessage();
                _email.From.Add(new MailboxAddress("My Barber", configuration["Mail:Email"]));
                _email.To.Add(new MailboxAddress("Reset passwork", toEmail));
                _email.Subject = subject;

                _email.Body = new TextPart("plain")
                {
                    Text = message
                };

                using (var client = new SmtpClient())
                {
                    await client.ConnectAsync("smtp.gmail.com", 587,false);
                    await client.AuthenticateAsync(configuration["Mail:Email"], configuration["Mail:AuthenticationKey"]);
                    await client.SendAsync(_email);
                    await client.DisconnectAsync(true);
                } 
                
                return true;
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error sending email to {ToEmail}: {Message}", toEmail, ex.Message);
                return false;
            }
        }
    }
}
