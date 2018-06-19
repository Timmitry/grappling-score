using Microsoft.EntityFrameworkCore;

namespace WebApi.Models
{
  public class GrapplingContext : DbContext
  {
    public DbSet<Fighter> Fighters { get; set; }
    public DbSet<Match> Matches { get; set; }

    public GrapplingContext(DbContextOptions<GrapplingContext> options)
      : base(options)
    {
    }
  }
}
