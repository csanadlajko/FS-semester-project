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

        [HttpGet("getSavings")]
        public IActionResult CalculateSavings()
        {
            Console.WriteLine("Entering calculating endpoint");
            return Ok(new { totalSavings = this.repo.CalculateTotalSavings() });
        }

        [HttpPost("addIncome")]
        public IActionResult AddNewIncome([FromBody] IncomeDetails income)
        {
            IncomeDetails newIncome = new IncomeDetails(income.incomeAmount, income.incomeType);
            this.repo.AddNewIncome(newIncome);
            return Ok(new { success = "New income added successfully" });
        }

        public IActionResult AddNewSpending([FromBody] SpendingDetails spending)
        {
            SpendingDetails newSpending = new SpendingDetails(spending.spendingAmount, spending.spendingType);
            this.repo.AddNewSpending(newSpending);
            return Ok(new { success = "New spending added successfully" });
        }
    }
}
