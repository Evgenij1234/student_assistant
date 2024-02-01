using Microsoft.EntityFrameworkCore;

namespace BookStore.Models
{
    public class ApplicationContextFavorites : DbContext
    {
        public DbSet<Favorites> Favorites { get; set; } = null!;
        public ApplicationContextFavorites(DbContextOptions<ApplicationContextFavorites> options)
           : base(options)
        {
            Database.EnsureCreated();
        }
    }
}