using HunterAndFisherman.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace HunterAndFisherman.Server
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<SiedGrib> EdibleMushrooms { get; set; }
        public DbSet<Nesied> Nesied { get; set; }
        public DbSet<Iadov> Iadov { get; set; }
        
    }
}
