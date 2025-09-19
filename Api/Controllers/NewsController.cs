using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.Extensions.Configuration;
using System;
using System.Threading.Tasks;
using System.Net.Http;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using Api.Models;
using Api.Data;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NewsController : ControllerBase
    {
        private readonly string _apiKey;
        private readonly ApplicationDbContext _context;

        public NewsController(IConfiguration configuration, ApplicationDbContext context)
        {
            _apiKey = configuration["NewsApi:ApiKey"];
            _context = context;
            if (string.IsNullOrWhiteSpace(_apiKey))
                throw new Exception("News API key is missing in configuration.");
        }

        [HttpGet("everything")]
        [Authorize]
        public async Task<IActionResult> GetEverything(
            [FromQuery] string q = "",
            [FromQuery] string sources = "",
            [FromQuery] string domains = "",
            [FromQuery] string from = "",
            [FromQuery] string to = "",
            [FromQuery] string language = "en",
            [FromQuery] string sortBy = "publishedAt",
            [FromQuery] int pageSize = 10,
            [FromQuery] int page = 1)
        {
            var url = $"https://newsapi.org/v2/everything?q={Uri.EscapeDataString(q)}&language={language}&sortBy={sortBy.ToLower()}&pageSize={pageSize}&page={page}";

            if (!string.IsNullOrWhiteSpace(sources))
                url += $"&sources={Uri.EscapeDataString(sources)}";
            if (!string.IsNullOrWhiteSpace(domains))
                url += $"&domains={Uri.EscapeDataString(domains)}";
            if (!string.IsNullOrWhiteSpace(from))
                url += $"&from={Uri.EscapeDataString(from)}";
            if (!string.IsNullOrWhiteSpace(to))
                url += $"&to={Uri.EscapeDataString(to)}";

            using (var httpClient = new HttpClient())
            {
                httpClient.DefaultRequestHeaders.Add("X-Api-Key", _apiKey);
                httpClient.DefaultRequestHeaders.Add("User-Agent", "MyNewsApp/1.0 (your@email.com)");

                var response = await httpClient.GetAsync(url);
                var content = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                    return StatusCode((int)response.StatusCode, content);

                var json = JObject.Parse(content);
                var articles = json["articles"]?.ToObject<List<Article>>();

                return Ok(articles);
            }
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> Create([FromBody] Article article)
        {
            var news = new News
            {
                SourceName = article.source?.name,
                Author = article.author,
                Title = article.title,
                Description = article.description,
                Url = article.url,
                UrlToImage = article.urlToImage,
                PublishedAt = DateTime.TryParse(article.publishedAt, out var dt) ? dt : (DateTime?)null,
                Content = article.content
            };
            _context.News.Add(news);
            await _context.SaveChangesAsync();
            return Ok(new { message = "News created!", id = news.Id });
        }
    }
}