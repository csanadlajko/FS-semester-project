using KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Data;
using KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Models;
using Microsoft.AspNetCore.Mvc;

namespace KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MoneyStatsController : Controller
    {
        IMoneyStatsRepository repo;

        public MoneyStatsController(IMoneyStatsRepository repo)
        {
            this.repo = repo;
        }

        [HttpPost("addStat")]
        public IActionResult AddTransaction([FromBody] MoneyStats stats)
        {
            MoneyStats addedStat = new MoneyStats(stats.spentAmount, stats.incomeAmount, stats.spentType, stats.incomeType);
            this.repo.AddNewStat(addedStat);
            return Ok(new { success = "New stat added successfully" });
        }

        [HttpGet("getSavings")]
        public IActionResult CalculateSavings()
        {
            return Ok(new { totalSavings = this.repo.CalculateTotalSavings() });
        }

    }
}
