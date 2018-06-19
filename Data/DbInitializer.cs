using System;
using System.Linq;
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

      var fighters = new[]
      {
        new Fighter("Marcelo", "Garcia", 2100),
        new Fighter("Roger", "Gracie", 2200),
        new Fighter("Oli", "Geddes", 2000),
        new Fighter("Thiago", "Abreu", 1900),
        new Fighter("Marcus", "Almeida", 2150)
      };

      context.Fighters.AddRange(fighters);
      context.SaveChanges();

      var matches = new[]
      {
        new Match(fighters[0], fighters[2], Result.Win),
        new Match(fighters[1], fighters[0], Result.Loss),
        new Match(fighters[4], fighters[1], Result.Draw),
      };
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
