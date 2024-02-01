using Microsoft.EntityFrameworkCore;

namespace BookStore.Models
{
    public class ApplicationContextAutors : DbContext
    {
        public DbSet<Autors> Autors { get; set; } = null!;
        public ApplicationContextAutors(DbContextOptions<ApplicationContextAutors> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }

}
