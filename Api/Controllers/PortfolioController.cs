using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class PortfolioController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetPortfolio()
        {
            var username =
                User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value ??
                User.FindFirst("sub")?.Value ??
                User.Identity?.Name ??
                "unknown";

            return Ok(new
            {
                message = $"This is protected portfolio data for user: {username}"
            });
        }
    }
}