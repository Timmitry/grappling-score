using Microsoft.EntityFrameworkCore;

namespace WebApi.Models
{
  public class FighterContext : DbContext
  {
    public FighterContext(DbContextOptions<FighterContext> options)
      : base(options)
    {
    }

    public DbSet<Fighter> Fighters { get; set; }
  }
}
