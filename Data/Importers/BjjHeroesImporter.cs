using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using WebApi.Models;

namespace WebApi.Data.Importers
{
  public static class BjjHeroesImporter
  {
    public static (HashSet<Fighter> fighters, HashSet<Match> matches) Import()
    {
      var fighters = new HashSet<Fighter>();
      var matches = new HashSet<Match>();

      var filepath = "../ScrapedData/BjjHeroes.com/";
      var bjjHeroesFiles = Directory.GetFiles(filepath, "*.csv", SearchOption.TopDirectoryOnly);

      foreach (var file in bjjHeroesFiles)
      {
        LoadSingleCsvFile(fighters, matches, file);
      }

      return (fighters, matches);
    }

    private static void LoadSingleCsvFile(HashSet<Fighter> fighters, HashSet<Match> matches, string file)
    {
      var index = file.LastIndexOf('/');
      var fighterName = file.Substring(index + 1);
      fighterName = fighterName.Replace(".csv", string.Empty);

      index = fighterName.IndexOf("_");
      var firstName = fighterName.Substring(0, index);
      var lastName = fighterName.Substring(index + 1);

      var rawMatchInfos = BjjHeroesBio.LoadFile(file, firstName + " " + lastName);

      ProcessMatchInformations(rawMatchInfos, fighters, matches);
    }

    private static void ProcessMatchInformations(IList<MatchInformation> matchInformations, HashSet<Fighter> fighters, HashSet<Match> matches)
    {
      foreach (var matchInfo in matchInformations)
      {
        var fighter1 = GetOrCreateFighter(matchInfo.Fighter1, fighters);
        var fighter2 = GetOrCreateFighter(matchInfo.Fighter2, fighters);

        if (fighter1 == null || fighter2 == null)
          continue;

        var result = ResultHelper.FromString(matchInfo.Result);
        var year = Int32.Parse(matchInfo.Year);

        var match = new Match(fighter1, fighter2, result, year);

        if (matches.Any(m => m.Equals(match)))
          continue;

        matches.Add(match);
      }
    }

    private static Fighter GetOrCreateFighter(string fullName, HashSet<Fighter> fighters)
    {
      if (fullName.Equals("Unknown") || fullName.Equals("Uknown"))
        return null;

      var index = fullName.LastIndexOf(' ');

      if (index < 0)
        return null;

      var firstname = fullName.Substring(0, index);
      var lastname = fullName.Substring(index + 1);

      var fighter
          = fighters
          .FirstOrDefault(f => f.LastName.Equals(lastname) && (f.FirstName.Contains(firstname) || firstname.Contains(f.FirstName)));

      if (fighter == null)
      {
        fighter = new Fighter(firstname, lastname, 2000);
        fighters.Add(fighter);
      }

      return fighter;
    }

    private class MatchInformation
    {
      public string Fighter1 { get; set; } = null;
      public string Fighter2 { get; set; } = null;
      public string Result { get; set; } = null;
      public string Year { get; set; } = null;
      public string Round { get; set; } = null;
      public string Competition { get; set; } = null;
      public string Method { get; set; } = null;
      public string WeightClass { get; set; } = null;
    }

    private class BjjHeroesBio
    {
      public static IList<MatchInformation> LoadFile(string filename, string nameFighter1)
      {
        var lines = File.ReadAllLines(filename);

        var matchInfos = new List<MatchInformation>();

        foreach (var line in lines.Skip(1))
        {
          var values = line.Split(';');

          if (values.Length < 7)
            continue;

          var matchInfo = new MatchInformation()
          {
            Fighter1 = nameFighter1,
            Fighter2 = values[0],
            Result = values[1],
            Method = values[2],
            Competition = values[3],
            WeightClass = values[4],
            Round = values[5],
            Year = values[6],
          };

          matchInfos.Add(matchInfo);
        }

        return matchInfos;
      }
    }
  }
}
