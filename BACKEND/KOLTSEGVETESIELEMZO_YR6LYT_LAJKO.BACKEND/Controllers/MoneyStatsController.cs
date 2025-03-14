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

        [HttpPost]
        public void AddTransaction([FromBody] MoneyStats stats)
        {
            Console.WriteLine("belep a helys vegpontba");
            MoneyStats addedStat = new MoneyStats(stats.spentAmount, stats.incomeAmount, stats.spentType, stats.incomeType);
            this.repo.AddNewStat(addedStat);
        }

        [HttpGet("getSavings")]
        public float CalculateSavings([FromBody] MoneyStats stat)
        {
            return this.repo.CalculateSavings(stat);
        }

    }
}
