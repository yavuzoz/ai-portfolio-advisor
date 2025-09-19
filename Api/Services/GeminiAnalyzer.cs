using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Linq;

namespace Api.Services
{
    public class GeminiAnalyzer
    {
        private readonly string _apiKey;

        public GeminiAnalyzer(string apiKey)
        {
            _apiKey = apiKey;
        }

        public async Task<string> AnalyzeAsync(string prompt)
        {
            var url = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={_apiKey}";

            var requestBody = new
            {
                contents = new[]
                {
                    new
                    {
                        parts = new[]
                        {
                            new { text = prompt }
                        }
                    }
                }
            };

            using (var client = new HttpClient())
            {
                var json = Newtonsoft.Json.JsonConvert.SerializeObject(requestBody);
                var content = new StringContent(json, Encoding.UTF8, "application/json");
                var response = await client.PostAsync(url, content);
                var responseString = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                    throw new Exception(responseString);

                var obj = JObject.Parse(responseString);
                var text = obj["candidates"]?[0]?["content"]?["parts"]?[0]?["text"]?.ToString();
                return text ?? responseString;
            }
        }
    }
}