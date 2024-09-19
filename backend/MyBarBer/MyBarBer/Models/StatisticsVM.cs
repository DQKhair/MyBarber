namespace MyBarBer.Models
{
    public class StatisticsVM
    {
       public DateTime TimeResponse { get; set; } = DateTime.Now;
    }

    public class StatisticsReceiptMoneyVM : StatisticsVM
    {
        public double Data { get; set; }
        public string DateTime { get; set; } = string.Empty;
    }

    public class StatisticsReceiptAndMoneyVM : StatisticsVM
    {
        public List<int> ReceiptData { get; set; } = new List<int>();
        public List<double> TotalMoneyData { get; set; } = new List<double>();
        public List<string> Labels { get; set; } = new List<string>();
    }

    public class StatisticsServicesAndProductsVM : StatisticsVM
    {
        public int Id { get; set; }
        public int Value { get; set; }
        public string Label { get; set; } = string.Empty;
    }
}
