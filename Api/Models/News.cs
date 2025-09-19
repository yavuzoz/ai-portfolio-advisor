using System;

namespace Api.Models
{
    public class News
    {
        public int Id { get; set; }
        public string SourceName { get; set; }
        public string Author { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Url { get; set; }
        public string UrlToImage { get; set; }
        public DateTime? PublishedAt { get; set; }
        public string Content { get; set; }

        public ICollection<AnalyzeRequestNews> AnalyzeRequestNews { get; set; }
    }
}