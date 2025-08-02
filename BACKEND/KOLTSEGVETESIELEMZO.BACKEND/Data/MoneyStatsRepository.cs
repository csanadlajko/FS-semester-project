using KOLTSEGVETESIELEMZO.BACKEND.Models;
using System.Net.Http.Json;
using Microsoft.AspNetCore.Http.HttpResults;
using System.Net.Http;
using System.Text;
using Newtonsoft.Json;

namespace KOLTSEGVETESIELEMZO.BACKEND.Data
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
            var response = client.GetFromJsonAsync<List<IncomeDetails>>("http://flask-api:5000/api/averageIncome");

            return response.Result;
        }

        public List<SpendingDetails> GetAverageSpending()
        {
            var client = new HttpClient();
            var response = client.GetFromJsonAsync<List<SpendingDetails>>("http://flask-api:5000/api/averageSpending");

            return response.Result;
        }

        public bool ValidateIncome(IncomeDetails income)
        {
            var client = new HttpClient();
            var payload = new
            {
                incomeType = income.incomeType,
                incomeAmount = income.incomeAmount
            };

            var json = JsonConvert.SerializeObject(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = client.PostAsync("http://flask-api:5000/api/checkIncome", content);
            var respString = response.Result.Content.ReadAsStringAsync().Result;

            var result = JsonConvert.DeserializeObject<IncomeDetails>(respString);
            return result.Status;
        }

        public bool ValidateSpending(SpendingDetails spending)
        {
            var client = new HttpClient();
            var payload = new
            {
                spendingType = spending.spendingType,
                spendingAmount = spending.spendingAmount
            };

            var json = JsonConvert.SerializeObject(payload);
            var content = new StringContent(json, Encoding.UTF8, "application/json");

            var response = client.PostAsync("http://flask-api:5000/api/checkSpending", content);
            var responseString = response.Result.Content.ReadAsStringAsync().Result;

            var result = JsonConvert.DeserializeObject<SpendingDetails>(responseString);
            return result.Status;
        }
    }
}
