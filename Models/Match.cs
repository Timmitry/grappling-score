using System;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace WebApi.Models
{
  [DataContract]
  public class Match
  {
    [DataMember]
    public long Id { get; set; }

    [DataMember]
    public string Result { get; set; }

    public long Fighter1Id { get; set; }

    [DataMember]
    public Fighter Fighter1 { get; set; }

    public long Fighter2Id { get; set; }

    [DataMember]
    public Fighter Fighter2 { get; set; }

    public Match()
    {
    }

    public Match(Fighter fighter1, Fighter fighter2, string result)
    {
      this.Fighter1 = fighter1;
      this.Fighter2 = fighter2;
      this.Result = result;
    }
  }
}