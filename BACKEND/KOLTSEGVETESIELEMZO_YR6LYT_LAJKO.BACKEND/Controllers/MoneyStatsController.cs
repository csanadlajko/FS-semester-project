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
            return Ok(new { totalSavings = this.repo.CalculateTotalSavings() });
        }

        [HttpPost("addIncome")]
        public IActionResult AddNewIncome([FromBody] IncomeDetails income)
        {
            IncomeDetails newIncome = new IncomeDetails(income.incomeAmount, income.incomeType);
            this.repo.AddNewIncome(newIncome);
            return Ok(new { success = "New income added successfully" });
        }

        [HttpPost("addSpending")]
        public IActionResult AddNewSpending([FromBody] SpendingDetails spending)
        {
            SpendingDetails newSpending = new SpendingDetails(spending.spendingAmount, spending.spendingType);
            this.repo.AddNewSpending(newSpending);
            return Ok(new { success = "New spending added successfully" });
        }

        [HttpGet("getTotalIncome")]
        public IActionResult GetTotalIncome()
        {
            return Ok(new { totalIncome = this.repo.GetTotalIncome() } );
        }

        [HttpGet("getTotalSpending")]
        public IActionResult GetTotalSpending()
        {
            return Ok(new { totalSpending = this.repo.GetTotalSpending() } );
        }

        [HttpGet("getAllIncome")]
        public IEnumerable<IncomeDetails> GetIncomes()
        {
            return this.repo.GetAllIncome();
        }

        [HttpGet("getAllSpending")]
        public IEnumerable<SpendingDetails> GetSpending()
        {
            return this.repo.GetAllSpending();
        }

        [HttpGet("popularIncome")]
        public ActionResult<IncomeDetails> MostPopularIncome()
        {
            return Ok(this.repo.GetMostPopularIncome());
        }

        [HttpGet("popularSpending")]
        public ActionResult<SpendingDetails> MostPopularSpending()
        {
            return Ok(this.repo.GetMostPopularSpending());
        }
    }
}
