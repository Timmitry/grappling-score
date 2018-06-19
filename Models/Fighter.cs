using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Runtime.Serialization;

namespace WebApi.Models
{
  [DataContract]
  public class Fighter
  {
    [DataMember]
    public long Id { get; set; }

    [DataMember]
    public string FirstName { get; set; }

    [DataMember]
    public string LastName { get; set; }

    [DataMember]
    public double Score { get; set; }

    [DataMember]
    public int? Rank { get; set; }

    public string FullName => $"{this.FirstName} {this.LastName}";

    public Fighter(string firstName, string lastName, double score)
    {
      this.FirstName = firstName;
      this.LastName = lastName;
      this.Score = score;
    }
  }
}