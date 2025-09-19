using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Api.Data;
using Api.Services;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AnalyzeController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly GeminiAnalyzer _gemini;

        public AnalyzeController(IConfiguration configuration, ApplicationDbContext context)
        {
            _context = context;
            _gemini = new GeminiAnalyzer(configuration["Gemini:ApiKey"]);
        }

        [HttpPost]
        public async Task<IActionResult> Analyze([FromBody] AnalyzeRequestDto request)
        {
            var selectedNews = _context.News
                .Where(n => request.NewsIds.Contains(n.Id))
                .ToList();

            if (!selectedNews.Any())
                return NotFound("No news found for provided IDs.");

            var sb = new StringBuilder();
            foreach (var news in selectedNews)
            {
                sb.AppendLine($"Başlık: {news.Title}");
                sb.AppendLine($"İçerik: {news.Content}");
                sb.AppendLine();
            }

            var prompt = $"Aşağıdaki haberleri analiz et ve önemli çıkarımları özetle:\n\n{sb}";

            var aiResult = await _gemini.AnalyzeAsync(prompt);

            return Ok(new
            {
                analysis = aiResult,
                news = selectedNews.Select(n => new { n.Id, n.Title })
            });
        }
    }

    public class AnalyzeRequestDto
    {
        public List<int> NewsIds { get; set; }
    }
}