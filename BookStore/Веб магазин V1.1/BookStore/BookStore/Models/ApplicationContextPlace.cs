using Microsoft.EntityFrameworkCore;

namespace BookStore.Models
{
    public class ApplicationContextPlace : DbContext
    {
        public DbSet<Place> Place { get; set; } = null!;
        public ApplicationContextPlace(DbContextOptions<ApplicationContextPlace> options)
           : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
