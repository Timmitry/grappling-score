using System.Linq;
using WebApi.Data.Importers;
using WebApi.Models;

namespace WebApi.Data
{
  public static class DbInitializer
  {
    public static void Initialize(GrapplingContext context)
    {
      context.Database.EnsureCreated();

      if (context.Fighters.Any())
        return;

      var (fighters, matches) = BjjHeroesImporter.Import();
      context.Fighters.AddRange(fighters);
      context.Matches.AddRange(matches);
      context.SaveChanges();

      CalculateRankings(context);
    }

    private static void CalculateRankings(GrapplingContext context)
    {
      var index = 1;
      context.Fighters
        .OrderByDescending(fighter => fighter.Score)
        .ToList()
        .ForEach(fighter => fighter.Rank = index++);

      context.SaveChanges();
    }
  }
}
