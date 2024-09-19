using Microsoft.EntityFrameworkCore;
using MyBarBer.Data;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.RepositoryAndUnitOfWork
{
    public class StatisticsRepository : GenericRepository<StatisticsVM>, IStatisticsRepository
    {
        public StatisticsRepository(MyDBContext context, ILogger logger) : base(context, logger)
        {
        }

        public async Task<IEnumerable<StatisticsServicesAndProductsVM>> StatisticQuantityServicesAndProducts(string dateTime)
        {
          try
          {
                var _dateTime = dateTime.ToLower();
                if (_dateTime == "daily")
                {
                    int _receiptDetailSerivices = await (from rd in _context.ReceiptDetails
                                                         join itemCate in _context.ItemCategories on rd.ItemCategory_ID equals itemCate.ItemCategory_ID
                                                         join r in _context.Receipts on rd.Receipt_ID equals r.Receipt_ID
                                                         where itemCate.Category_ID == 1 && r.ReceiptDate.Day == DateTime.Now.Day && r.ReceiptDate.Month == DateTime.Now.Month && r.ReceiptDate.Year == DateTime.Now.Year
                                                         select new
                                                         {
                                                             rd,
                                                             itemCate,
                                                             r
                                                         }).CountAsync();

                    int _receiptDetailProducts = await (from rd in _context.ReceiptDetails
                                                        join itemCate in _context.ItemCategories on rd.ItemCategory_ID equals itemCate.ItemCategory_ID
                                                        join r in _context.Receipts on rd.Receipt_ID equals r.Receipt_ID
                                                        where itemCate.Category_ID != 1 && r.ReceiptDate.Day == DateTime.Now.Day && r.ReceiptDate.Month == DateTime.Now.Month && r.ReceiptDate.Year == DateTime.Now.Year
                                                        select rd.ReceiptDetailQuantity).SumAsync();

                    var _listData = new List<StatisticsServicesAndProductsVM>
                    {
                        new StatisticsServicesAndProductsVM{Id = 1, Value = _receiptDetailSerivices, Label = "Services"},
                        new StatisticsServicesAndProductsVM{Id = 2, Value = _receiptDetailProducts, Label = "Products"}
                    };
                    return _listData;
                }    
                if (_dateTime == "monthly")
                {
                    int _receiptDetailSerivices = await (from rd in _context.ReceiptDetails
                                                join itemCate in _context.ItemCategories on rd.ItemCategory_ID equals itemCate.ItemCategory_ID
                                                join r in _context.Receipts on rd.Receipt_ID equals r.Receipt_ID
                                                where itemCate.Category_ID == 1 && r.ReceiptDate.Month == DateTime.Now.Month && r.ReceiptDate.Year == DateTime.Now.Year
                                                select new
                                                {
                                                    rd,
                                                    itemCate,
                                                    r
                                                }).CountAsync();

                    int _receiptDetailProducts = await (from rd in _context.ReceiptDetails
                                                        join itemCate in _context.ItemCategories on rd.ItemCategory_ID equals itemCate.ItemCategory_ID
                                                        join r in _context.Receipts on rd.Receipt_ID equals r.Receipt_ID
                                                        where itemCate.Category_ID != 1 && r.ReceiptDate.Month == DateTime.Now.Month && r.ReceiptDate.Year == DateTime.Now.Year
                                                        select rd.ReceiptDetailQuantity).SumAsync();

                    var _listData = new List<StatisticsServicesAndProductsVM>
                    {
                        new StatisticsServicesAndProductsVM{Id = 1, Value = _receiptDetailSerivices, Label = "Services"},
                        new StatisticsServicesAndProductsVM{Id = 2, Value = _receiptDetailProducts, Label = "Products"}
                    };
                    return _listData;
                }
                if(_dateTime == "yearly")
                {
                    int _receiptDetailSerivices = await (from rd in _context.ReceiptDetails
                                                         join itemCate in _context.ItemCategories on rd.ItemCategory_ID equals itemCate.ItemCategory_ID
                                                         join r in _context.Receipts on rd.Receipt_ID equals r.Receipt_ID
                                                         where itemCate.Category_ID == 1 && r.ReceiptDate.Year == DateTime.Now.Year
                                                         select new
                                                         {
                                                             rd,
                                                             itemCate,
                                                             r
                                                         }).CountAsync();

                    int _receiptDetailProducts = await (from rd in _context.ReceiptDetails
                                                        join itemCate in _context.ItemCategories on rd.ItemCategory_ID equals itemCate.ItemCategory_ID
                                                        join r in _context.Receipts on rd.Receipt_ID equals r.Receipt_ID
                                                        where itemCate.Category_ID != 1 && r.ReceiptDate.Year == DateTime.Now.Year
                                                        select rd.ReceiptDetailQuantity).SumAsync();

                    var _listData = new List<StatisticsServicesAndProductsVM>
                    {
                        new StatisticsServicesAndProductsVM{Id = 1, Value = _receiptDetailSerivices, Label = "Services"},
                        new StatisticsServicesAndProductsVM{Id = 2, Value = _receiptDetailProducts, Label = "Products"}
                    };
                    return _listData;
                }    
                return null!;
            }
            catch 
            {
                return null!;
            }
        }

        public async Task<IEnumerable<StatisticsReceiptMoneyVM>> StatisticReceiptMoney(string dateTime)
        {
            try
            {
                var _receipt = await _context.Receipts.ToListAsync();
                if (_receipt != null && !String.IsNullOrEmpty(dateTime))
                {
                    var _dateTime = dateTime.ToLower();

                    if (_dateTime == "daily")
                    {
                        // time start
                        var startOfWeek = DateTime.Now.AddDays(-(int)DateTime.Now.DayOfWeek + 1); // -4 + 1 = -3 || getDate().add(-3) =  Mo
                        var endOfWeek = startOfWeek.AddDays(6); // [0] = Mon => [6] = Su 

                        var _listReceipt = _receipt
                            .Where(r => r.ReceiptDate.Date >= startOfWeek.Date && r.ReceiptDate.Date <= endOfWeek.Date)
                            .ToList();

                        var groupedReceipts = _listReceipt
                            .GroupBy(r => r.ReceiptDate.DayOfWeek)
                            .Select(g => new
                            {
                                Day = g.Key,
                                Total = g.Sum(r => r.TotalPrice)
                            })
                            .ToList();

                        var _listData = new List<StatisticsReceiptMoneyVM>();

                        // mapping
                        var dayMapping = new Dictionary<DayOfWeek, string>
                        {
                            { DayOfWeek.Monday, "Mo" },
                            { DayOfWeek.Tuesday, "Tu" },
                            { DayOfWeek.Wednesday, "We" },
                            { DayOfWeek.Thursday, "Th" },
                            { DayOfWeek.Friday, "Fr" },
                            { DayOfWeek.Saturday, "Sa" },
                            { DayOfWeek.Sunday, "Su" }
                        };

                        // add list
                        foreach (var day in Enum.GetValues(typeof(DayOfWeek)).Cast<DayOfWeek>())
                        {
                            var totalForDay = groupedReceipts.FirstOrDefault(g => g.Day == day)?.Total ?? 0;

                            _listData.Add(new StatisticsReceiptMoneyVM
                            {
                                Data = totalForDay,
                                DateTime = dayMapping[day]
                            });
                        }

                        return _listData;
                    }
                    if (_dateTime == "monthly")
                    {
                        int _currentYear = DateTime.Now.Year;

                        var _groupedReceipts = _receipt
                           .Where(r => r.ReceiptDate.Year == _currentYear).GroupBy(r => r.ReceiptDate.Month).Select(g => new
                           {
                               Month = g.Key,
                               Total = g.Sum(r => r.TotalPrice)
                           })
                           .ToList();

                        var _listData = new List<StatisticsReceiptMoneyVM>
                        {
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "Jan" },
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "Feb" },
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "Mar" },
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "Apr" },
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "May" },
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "Jun" },
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "Jul" },
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "Aug" },
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "Sep" },
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "Oct" },
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "Nov" },
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "Dec" },
                        };

                        foreach (var receipt in _groupedReceipts)
                        {
                            var monthIndex = receipt.Month - 1;
                            _listData[monthIndex].Data = receipt.Total;
                        }    
                        return _listData;
                    }
                    if (_dateTime == "yearly")
                    {
                        var groupedReceipts = _receipt
                            .GroupBy(r => r.ReceiptDate.Year)
                            .Select(g => new
                            {
                                Year = g.Key,
                                Total = g.Sum(r => r.TotalPrice)
                            })
                            .ToList();

                        var _listData = new List<StatisticsReceiptMoneyVM>
                        {
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "2023" },
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "2024" },
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "2025" },
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "2026" },
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "2027" },
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "2028" },
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "2029" },
                            new StatisticsReceiptMoneyVM { Data = 0, DateTime = "2029" },
                        };

                        foreach (var yearItem in _listData)
                        {
                            int year = int.Parse(yearItem.DateTime);

                            var totalForYear = groupedReceipts.FirstOrDefault(g => g.Year == year)?.Total ?? 0;

                            yearItem.Data = totalForYear;
                        }

                        return _listData;
                    }
                }
                return null!;
            }
            catch
            {
                return null!;
            }
        }

        public async Task<StatisticsReceiptAndMoneyVM> StatisticsReceiptAndMoney(string dateTime)
        {
           try
            {
                var _receipt = await _context.Receipts.ToListAsync();
                if (dateTime != null && _receipt != null)
                {
                    var _dateTime = dateTime.ToLower();
                    if (_dateTime == "daily")
                    {
                        var startWeek = DateTime.Now.AddDays(-(int)DateTime.Now.DayOfWeek + 1);
                        var endWeek = startWeek.AddDays(6);

                        var _listReceipt = _receipt
                             .Where(r => r.ReceiptDate.Date >= startWeek.Date && r.ReceiptDate.Date <= endWeek.Date)
                             .ToList();

                        var groupedReceipts = _listReceipt
                            .GroupBy(r => r.ReceiptDate.DayOfWeek)
                            .Select(g => new
                            {
                                Day = g.Key,
                                TotalMoney = g.Sum(r => r.TotalPrice),
                                TotalQuantityReceipt = g.Count()

                            })
                            .ToList();

                        var _listData = new StatisticsReceiptAndMoneyVM();

                        // mapping
                        var dayMapping = new Dictionary<DayOfWeek, string>
                        {
                            { DayOfWeek.Monday, "Mo" },
                            { DayOfWeek.Tuesday, "Tu" },
                            { DayOfWeek.Wednesday, "We" },
                            { DayOfWeek.Thursday, "Th" },
                            { DayOfWeek.Friday, "Fr" },
                            { DayOfWeek.Saturday, "Sa" },
                            { DayOfWeek.Sunday, "Su" }
                        };

                        // add list
                        foreach (var day in Enum.GetValues(typeof(DayOfWeek)).Cast<DayOfWeek>()) // tranfer array day of week to IEnumrable
                        {
                            var totalMoneyForDay = groupedReceipts.FirstOrDefault(g => g.Day == day)?.TotalMoney ?? 0;
                            var totalQuantityReceiptForDay = groupedReceipts.FirstOrDefault(g => g.Day == day)?.TotalQuantityReceipt ?? 0;

                            _listData.TotalMoneyData.Add(totalMoneyForDay);
                            _listData.ReceiptData.Add(totalQuantityReceiptForDay);
                            _listData.Labels.Add(dayMapping[day]);
                        }

                        return _listData;
                    }
                    if (_dateTime == "monthly")
                    {
                        int _currentYear = DateTime.Now.Year;

                        var _groupedReceipts = _receipt
                           .Where(r => r.ReceiptDate.Year == _currentYear).GroupBy(r => r.ReceiptDate.Month).Select(g => new
                           {
                               Month = g.Key,
                               TotalMoneyData = g.Sum(r => r.TotalPrice),
                               QuantityReceipt = g.Count()
                           })
                           .ToList();



                        var _listData = new StatisticsReceiptAndMoneyVM
                        {
                            ReceiptData = new List<int>(new int[12]),
                            TotalMoneyData = new List<double>(new double[12]),
                            Labels = new List<string> { "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" }
                        };

                             foreach (var monthItem in _groupedReceipts)
                             {
                                int month = monthItem.Month;

                                _listData.ReceiptData[month - 1] = monthItem.QuantityReceipt;
                                _listData.TotalMoneyData[month - 1] = monthItem.TotalMoneyData;
                             }

                        return _listData;
                    }
                    if (_dateTime == "yearly")
                    {
                        var _groupedReceipts = _receipt
                            .GroupBy(r => r.ReceiptDate.Year)
                            .Select(g => new
                            {
                                Year = g.Key,
                                TotalMoneyData = g.Sum(r => r.TotalPrice),
                                QuantityReceipt = g.Count()
                            })
                            .ToList();



                        var _listData = new StatisticsReceiptAndMoneyVM
                        {
                            ReceiptData = new List<int>(new int[8]),
                            TotalMoneyData = new List<double> (new double[8]),
                            Labels = new List<string> { "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030" }
                        };

                        foreach (var yearItem in _groupedReceipts)
                        {
                            int index = _listData.Labels.IndexOf(yearItem.Year.ToString());
                            if (index >= 0 && index < _listData.ReceiptData.Count)
                            {
                                _listData.ReceiptData[index] = yearItem.QuantityReceipt;
                                _listData.TotalMoneyData[index] = yearItem.TotalMoneyData;
                            }
                        }

                        return _listData;
                    }
                }
                return null!;
            }catch
            { return null!; }
        }
    }
}
