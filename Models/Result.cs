using System;

namespace WebApi.Models
{
  public enum Result
  {
    Win,
    Loss,
    Draw
  }

  public static class ResultHelper
  {
    public static Result FromString(string str)
    {
      switch (str.ToLower())
      {
        case ("w"):
          return Result.Win;
        case ("l"):
          return Result.Loss;
        case ("d"):
          return Result.Draw;
        default:
          throw new ArgumentException("Result could not be analyzed!");
      }
    }

    /// <summary>
    /// Returns 1.0 for a win, 0.5 for a draw, and 0.0 for a loss.
    /// </summary>
    public static double ToDouble(this Result result)
    {
      switch (result)
      {
        case (Result.Win):
          return 1.0;
        case (Result.Draw):
          return 0.5;
        case (Result.Loss):
          return 0;
        default:
          throw new ArgumentException("Invalid match result detected!");
      }
    }
  }
}
