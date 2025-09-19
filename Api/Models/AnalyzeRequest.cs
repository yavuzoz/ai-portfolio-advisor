using System;
using System.Collections.Generic;

namespace Api.Models
{
    public class AnalyzeRequest
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public DateTime CreateTime { get; set; }

        public User User { get; set; }
        public ICollection<AnalyzeRequestPortfolio> AnalyzeRequestPortfolios { get; set; }
        public ICollection<AnalyzeRequestNews> AnalyzeRequestNews { get; set; }
    }
}