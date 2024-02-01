using Microsoft.EntityFrameworkCore;

namespace BookStore.Models
{
    public class ApplicationContextBooks : DbContext
    {
        public DbSet<Books> Books { get; set; } = null!;
        public ApplicationContextBooks(DbContextOptions<ApplicationContextBooks> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
