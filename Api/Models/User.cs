using System;
using System.Collections.Generic;

namespace Api.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Username { get; set; }
        public string PasswordHash { get; set; }
        public DateTime CreatedAt { get; set; }

        public ICollection<Portfolio> Portfolios { get; set; }
        public ICollection<AnalyzeRequest> AnalyzeRequests { get; set; }
    }
}