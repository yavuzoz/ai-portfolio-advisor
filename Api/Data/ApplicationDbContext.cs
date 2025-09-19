using Microsoft.EntityFrameworkCore;
using Api.Models;

namespace Api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
        public DbSet<Portfolio> Portfolios { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<AnalyzeRequest> AnalyzeRequests { get; set; }
        public DbSet<AnalyzeRequestPortfolio> AnalyzeRequestPortfolios { get; set; }
        public DbSet<AnalyzeRequestNews> AnalyzeRequestNews { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<AnalyzeRequestPortfolio>()
                .HasKey(ap => new { ap.AnalyzeId, ap.PortfolioId });

            modelBuilder.Entity<AnalyzeRequestPortfolio>()
                .HasOne(ap => ap.AnalyzeRequest)
                .WithMany(a => a.AnalyzeRequestPortfolios)
                .HasForeignKey(ap => ap.AnalyzeId);

            modelBuilder.Entity<AnalyzeRequestPortfolio>()
                .HasOne(ap => ap.Portfolio)
                .WithMany(p => p.AnalyzeRequestPortfolios)
                .HasForeignKey(ap => ap.PortfolioId);

            modelBuilder.Entity<AnalyzeRequestNews>()
                .HasKey(an => new { an.AnalyzeId, an.NewsId });

            modelBuilder.Entity<AnalyzeRequestNews>()
                .HasOne(an => an.AnalyzeRequest)
                .WithMany(a => a.AnalyzeRequestNews)
                .HasForeignKey(an => an.AnalyzeId);

            modelBuilder.Entity<AnalyzeRequestNews>()
                .HasOne(an => an.News)
                .WithMany(n => n.AnalyzeRequestNews)
                .HasForeignKey(an => an.NewsId);
        }
    }
}