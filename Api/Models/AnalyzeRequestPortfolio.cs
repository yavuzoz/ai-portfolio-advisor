namespace Api.Models
{
    public class AnalyzeRequestPortfolio
    {
        public int AnalyzeId { get; set; }
        public AnalyzeRequest AnalyzeRequest { get; set; }

        public int PortfolioId { get; set; }
        public Portfolio Portfolio { get; set; }
    }
}