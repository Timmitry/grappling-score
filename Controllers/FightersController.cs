using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebApi.Models;

namespace WebApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class FightersController : ControllerBase
  {
    private readonly GrapplingContext context;

    public FightersController(GrapplingContext grapplingContext)
    {
      this.context = grapplingContext;
    }

    private bool Searcher(Fighter fighter, string search)
    {
      return fighter.LastName.Contains(search) || fighter.FirstName.Contains(search);
    }

    [HttpGet]
    public ActionResult<IEnumerable<Fighter>> GetAll(string search)
    {
      var fighters = this.context.Fighters.AsQueryable();

      if (search != null)
      {
        Func<Fighter, bool> filter = (fighter) =>
          fighter.LastName.Contains(search, StringComparison.InvariantCultureIgnoreCase) ||
          fighter.FirstName.Contains(search, StringComparison.InvariantCultureIgnoreCase);

        fighters = fighters.Where(fighter => filter(fighter));
      }

      return fighters.OrderBy(fighter => fighter.Rank).ToList();
    }

    [HttpGet("{id}")]
    public ActionResult<Fighter> GetById(long id)
    {
      var record = this.context.Fighters.Find(id);

      if (record == null) return NotFound();
      return record;
    }
  }
}