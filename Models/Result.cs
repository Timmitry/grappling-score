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
  }
}