using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyBarBer.Repository;
using MyBarBer.Models;
using System;

namespace MyBarBer.Controllers
{
    [Authorize(policy: "RequireAdminRoleAndEmployeeRole")]
    [Route("api/[controller]")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<StatisticsController> _logger;

        public StatisticsController (IUnitOfWork unitOfWork, ILogger<StatisticsController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        }

        [HttpGet("receipt_money/datetime={dateTime}")]
        public async Task<ActionResult<IEnumerable<StatisticsReceiptMoneyVM>>> GetStatisticReceiptMoney(string dateTime)
        {
            try
            {   
              
                if (!String.IsNullOrEmpty(dateTime))
                {
                    var _listData = await _unitOfWork.Statistics.StatisticReceiptMoney(dateTime);
                    if (_listData != null)
                    {
                        _logger.LogInformation("Get statistic receipt money is success");
                        return StatusCode(StatusCodes.Status200OK, _listData);
                    }
                }
                _logger.LogWarning("Get statistic daily is fail!");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Get statistic daily is fail" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error get statistic daily");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("quantity_products_and_services/datetime={dateTime}")]
        public async Task<ActionResult<IEnumerable<StatisticsServicesAndProductsVM>>> GetStatisticQuantityServicesAndProducts(string dateTime)
        {
            try
            {
                    if (!String.IsNullOrEmpty(dateTime))
                    {
                        var _listData = await _unitOfWork.Statistics.StatisticQuantityServicesAndProducts(dateTime);
                        if (_listData != null)
                        {
                            _logger.LogInformation("Get statistic is success");
                            return StatusCode(StatusCodes.Status200OK, _listData);
                        }
                    }
                _logger.LogWarning("Get statistic is fail!");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Get statistic is fail" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error get statistic");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

        [HttpGet("quantity_receipts_and_total_money/datetime={dateTime}")]
        public async Task<ActionResult<StatisticsReceiptAndMoneyVM>> GetQuantityReceiptsAndTotalMoney(string dateTime)
        {
            try
            {
                if (!String.IsNullOrEmpty(dateTime))
                {
                    var _listData = await _unitOfWork.Statistics.StatisticsReceiptAndMoney(dateTime);
                    if (_listData != null)
                    {
                        _logger.LogInformation("Get statistic is success");
                        return StatusCode(StatusCodes.Status200OK, _listData);
                    }
                }
                _logger.LogWarning("Get statistic is fail!");
                return StatusCode(StatusCodes.Status400BadRequest, new APIResVM { Success = false, Message = "Get statistic is fail" });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error get statistic");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }

    }
}
