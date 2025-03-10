using KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Data;
using KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Models;
using Microsoft.AspNetCore.Mvc;

namespace KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Controllers
{
    [ApiController]
    [Route("controller")]
    public class MoneyStatsController : Controller
    {
        IMoneyStatsRepository repo;
        List<MoneyStats> moneyStats;

        public MoneyStatsController(IMoneyStatsRepository repo)
        {
            this.repo = repo;
        }

        [HttpPost("add")]
        public IActionResult AddTransaction([FromBody] MoneyStats stats)
        {
            moneyStats.Add(stats);
            return Ok(new { message = "Sikeres tranzakció hozzáadás"});
        }

        [HttpGet]
        public float CalculateSavings([FromBody] MoneyStats stat)
        {
            return this.repo.CalculateSavings(stat);
        }
    }
}
