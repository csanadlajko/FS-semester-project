using KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Models;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;

namespace KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Data
{
    public class MoneyStatsRepository : IMoneyStatsRepository
    {
        private List<IncomeDetails> income = new List<IncomeDetails>();
        private List<SpendingDetails> spending = new List<SpendingDetails>();
        private CurrencyDetails currency = new CurrencyDetails();

        public float CalculateTotalSavings()
        {
            float totalSavings = 0;
            totalSavings += income.Sum(x => x.incomeAmount);
            totalSavings -= spending.Sum(x => x.spendingAmount);
            return totalSavings;
        }

        public void AddNewIncome(IncomeDetails incomeDetails)
        {
            this.income.Add(incomeDetails);
        }

        public void AddNewSpending(SpendingDetails spendingDetails)
        {
            this.spending.Add(spendingDetails);
        }

        public List<IncomeDetails> GetAllIncome()
        {
            return this.income;
        }

        public List<SpendingDetails> GetAllSpending()
        {
            return this.spending;
        }


        public List<IncomeDetails> GetFilteredIncome()
        {
            var filteredTypes = this.income
                .GroupBy(t => t.incomeType)
                .Select(g => new IncomeDetails
                {
                    incomeType = g.Key,
                    incomeAmount = g.Sum(o => o.incomeAmount)
                })
                .ToList();

            if (!filteredTypes.Any())
            {
                List<IncomeDetails> dummyList = new List<IncomeDetails>();
                dummyList.Add(new IncomeDetails("No income recorded yet!"));
                return dummyList;
            }
            return filteredTypes;
        }

        public List<SpendingDetails> GetFilteredSpending()
        {
            var filteredTypes = this.spending
                .GroupBy(t => t.spendingType)
                .Select(g => new SpendingDetails
                {
                    spendingType = g.Key,
                    spendingAmount = g.Sum(o => o.spendingAmount)
                })
                .ToList();

            if (!filteredTypes.Any())
            {
                List<SpendingDetails> dummyList = new List<SpendingDetails>();
                dummyList.Add(new SpendingDetails("No spending recorded yet!"));
                return dummyList;
            }

            return filteredTypes;
        }

        public void AddCurrencyType(CurrencyDetails newCurrency)
        {
            this.currency.currencyType = newCurrency.currencyType;
        }

        public CurrencyDetails GetCurrencyType()
        {
            if (this.currency.currencyType != null) return this.currency;
            return new CurrencyDetails(null);
        }

        public List<IncomeDetails> GetAverageIncome()
        {
            var client = new HttpClient();
            var response = client.GetFromJsonAsync<List<IncomeDetails>>("http://127.0.0.1:5000/api/averageIncome");

            return response.Result;
        }

        public List<SpendingDetails> GetAverageSpending()
        {
            var client = new HttpClient();
            var response = client.GetFromJsonAsync<List<SpendingDetails>>("http://127.0.0.1:5000/api/averageSpending");

            return response.Result;
        }
    }
}
