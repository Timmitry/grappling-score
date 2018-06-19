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

    [HttpGet]
    public ActionResult<IEnumerable<Fighter>> GetAll()
    {
      return this.context.Fighters.OrderBy(fighter => fighter.Rank).ToList();
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