using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using MyBarBer.Models;
using MyBarBer.Repository;

namespace MyBarBer.Controllers
{
    [Authorize(Policy = "RequireAdminRoleAndEmployeeRole")]
    [Route("api/[controller]")]
    [ApiController]
    public class FunctionsUserController : ControllerBase
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ILogger<FunctionsUserController> _logger;

        public FunctionsUserController(IUnitOfWork unitOfWork, ILogger<FunctionsUserController> logger)
        {
            _unitOfWork = unitOfWork;
            _logger = logger;
        } 

        [HttpGet("{roleId}")]
        public async Task<ActionResult<IEnumerable<FunctionsUserVM>>> GetFunctionsByRole(Guid roleId)
        {
            try
            {
                var _functions = await _unitOfWork.FunctionsUser.GetFunctionsByRole(roleId);
                if (_functions != null)
                {
                    _logger.LogInformation("Get list functions is success!");
                    return StatusCode(StatusCodes.Status200OK, _functions);
                }
                _logger.LogWarning("Get list functions is fail!");
                return StatusCode(StatusCodes.Status400BadRequest);
            }catch(Exception ex)
            {
                _logger.LogError(ex,"Error get list functions");
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
    }
}
