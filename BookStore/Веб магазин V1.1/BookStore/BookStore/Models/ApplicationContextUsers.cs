using Microsoft.EntityFrameworkCore;

namespace BookStore.Models
{
    public class ApplicationContextUsers : DbContext
    {
        public DbSet<Users> Users { get; set; } = null!;
        public ApplicationContextUsers(DbContextOptions<ApplicationContextUsers> options)
           : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
