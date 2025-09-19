namespace Api.Models
{
    public class Article
    {
        public int Id { get; set; }
        public Source source { get; set; }
        public string author { get; set; }
        public string title { get; set; }
        public string description { get; set; }
        public string url { get; set; }
        public string urlToImage { get; set; }
        public string publishedAt { get; set; }
        public string content { get; set; }
    }

    public class Source
    {
        public string id { get; set; }
        public string name { get; set; }
    }
}