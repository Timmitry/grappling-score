using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class FightersController :ControllerBase
  {
    private readonly FighterContext fighterContext;

    public FightersController(FighterContext fighterContext)
    {
      this.fighterContext = fighterContext;

      if (this.fighterContext.Fighters.Count() == 0)
      {
        this.fighterContext.Fighters.AddRange(
          new Fighter("Marcelo", "Garcia", 2100),
          new Fighter("Roger", "Gracie", 2200),
          new Fighter("Oli", "Geddes", 2000),
          new Fighter("Thiago", "Abreu", 1900)
        );
        this.fighterContext.SaveChanges();
      }
    }

    [HttpGet]
    public ActionResult<IEnumerable<Fighter>> GetAll()
    {
      return this.fighterContext.Fighters.OrderBy(fighter => fighter.Rank).ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<Fighter> GetById(long id)
    {
      this.CalculateRankings();

      var record = this.fighterContext.Fighters.Find(id);

      if (record == null) return NotFound();
      return record;
    }

    private void CalculateRankings()
    {
      var index = 1;
      this.fighterContext.Fighters
        .OrderByDescending(fighter => fighter.Score)
        .ToList()
        .ForEach(fighter => fighter.Rank = index++);

      this.fighterContext.SaveChanges();
    }
  }
}