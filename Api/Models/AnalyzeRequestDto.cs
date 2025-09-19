using System.Collections.Generic;

namespace Api.Models
{
    public class AnalyzeRequestDto
    {
        public List<int> NewsIds { get; set; }
        public List<int> PortfolioIds { get; set; }
    }
}