using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;

namespace WebApi.Models
{
  [DataContract]
  public class Match
  {
    [DataMember]
    public long Id { get; set; }

    [DataMember]
    [JsonConverter(typeof(StringEnumConverter))]
    public Result Result { get; set; }

    [DataMember]
    public int Year { get; set; }

    public long Fighter1Id { get; set; }

    [DataMember]
    public Fighter Fighter1 { get; set; }

    public long Fighter2Id { get; set; }

    [DataMember]
    public Fighter Fighter2 { get; set; }

    public Match()
    {
    }

    public Match(Fighter fighter1, Fighter fighter2, Result result, int year)
    {
      this.Fighter1 = fighter1;
      this.Fighter2 = fighter2;
      this.Result = result;
      this.Year = year;
    }
  }
}