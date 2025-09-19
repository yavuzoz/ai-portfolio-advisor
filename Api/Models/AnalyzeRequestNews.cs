namespace Api.Models
{
    public class AnalyzeRequestNews
    {
        public int AnalyzeId { get; set; }
        public AnalyzeRequest AnalyzeRequest { get; set; }

        public int NewsId { get; set; }
        public News News { get; set; }
    }
}