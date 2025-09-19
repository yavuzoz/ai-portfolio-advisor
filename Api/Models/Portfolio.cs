using System;
using System.Collections.Generic;

namespace Api.Models
{
    public class Portfolio
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public DateTime CreatedAt { get; set; }

        public User User { get; set; }
        public ICollection<AnalyzeRequestPortfolio> AnalyzeRequestPortfolios { get; set; }
    }
}