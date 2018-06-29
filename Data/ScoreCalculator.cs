using System;
using WebApi.Models;

namespace WebApi.Data
{
  public static class ScoreCalculator
  {
    /// <summary>
    /// Calculates the points won or lost by the fighters in the match.
    /// The result has to be added to the elo rating of fighter 1, and subtracted from the elo rating of fighter 2.
    /// </summary>
    public static double CalculateEloPoints(Result result, double score1, double score2)
    {
      // The expected result of the match. Between 0 (certain loss) and 1 (certain win).
      var expectedNumericResult = 1 / (1 + Math.Pow(10, (score2 - score1) / Constants.EloDifference));
      var actualNumericResult = result.ToDouble();

      // The points won or lost by the fighters.
      return Constants.EloFactor * (actualNumericResult - expectedNumericResult);
    }
  }
}
