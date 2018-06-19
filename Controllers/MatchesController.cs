
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi.Models;

namespace WebApi.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class MatchesController : ControllerBase
  {
    private readonly GrapplingContext context;

    public MatchesController(GrapplingContext context)
    {
      this.context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Match>> GetAll()
    {
      return this.context.Matches
        .Include(match => match.Fighter1)
        .Include(match => match.Fighter2)
        .ToList();
    }
  }
}
