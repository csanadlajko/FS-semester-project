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
            IncomeDetails newIncome = new IncomeDetails(income.incomeType, income.incomeAmount);
            this.repo.AddNewIncome(newIncome);
            var testString = this.repo.GetPredictionData();
            return Ok(new { success = "New income added successfully!" });
        }

        [HttpPost("addSpending")]
        public IActionResult AddNewSpending([FromBody] SpendingDetails spending)
        {
            SpendingDetails newSpending = new SpendingDetails(spending.spendingType, spending.spendingAmount);
            this.repo.AddNewSpending(newSpending);
            return Ok(new { success = "New spending added successfully!" });
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

        [HttpGet("getFilteredIncome")]
        public IEnumerable<IncomeDetails> GetFilteredIncome()
        {
            return this.repo.GetFilteredIncome();
        }

        [HttpGet("getFilteredSpending")]
        public IEnumerable<SpendingDetails> GetFilteredSpending()
        {
            return this.repo.GetFilteredSpending();
        }

        [HttpPost("addCurrency")]
        public IActionResult AddCurrencyType([FromBody] CurrencyDetails newCurrency)
        {
            CurrencyDetails addedCurrency = new CurrencyDetails(newCurrency.currencyType);
            this.repo.AddCurrencyType(addedCurrency);
            return Ok(new { success = "New currency type added successfully!" });
        }

        [HttpGet("getCurrency")]
        public CurrencyDetails GetCurrency()
        {
            return this.repo.GetCurrencyType();
        }

        [HttpGet("getAverageFromPython")]
        public IEnumerable<IncomeDetails> GetAverageIncome()
        {
            return this.repo.GetAverageIncome();
        }
    }
}
