using Microsoft.EntityFrameworkCore;

namespace BookStore.Models
{
    public class ApplicationContextCart : DbContext
    {
        public DbSet<Cart> Cart { get; set; } = null!;
        public ApplicationContextCart(DbContextOptions<ApplicationContextCart> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
