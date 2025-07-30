using KOLTSEGVETESIELEMZO.BACKEND.Data;
using KOLTSEGVETESIELEMZO.BACKEND.Models;
using Microsoft.AspNetCore.Mvc;

namespace KOLTSEGVETESIELEMZO.BACKEND.Controllers
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
            bool valid = this.repo.ValidateIncome(newIncome);
            if (valid) return Ok(new { info = "New income added successfully!" });
            return Ok(new { info = $"New income added successfully! \nWarning! Value: {income.incomeAmount} above or below the 10% threshold of the average income for {income.incomeType}" });
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

        [HttpGet("getAverageIncomeFromPython")]
        public IEnumerable<IncomeDetails> GetAverageIncome()
        {
            return this.repo.GetAverageIncome();
        }

        [HttpGet("getAverageSpendingFromPython")]
        public IEnumerable<SpendingDetails> GetAverageSpending()
        {
            return this.repo.GetAverageSpending();
        }
    }
}
