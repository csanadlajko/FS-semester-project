using KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Models;

namespace KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Data
{
    public class MoneyStatsRepository : IMoneyStatsRepository
    {
        private List<IncomeDetails> income = new List<IncomeDetails>();
        private List<SpendingDetails> spending = new List<SpendingDetails>();

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

        public float GetTotalIncome()
        {
            return this.income.Sum(x => x.incomeAmount);
        }

        public float GetTotalSpending()
        {
            return this.spending.Sum(x => x.spendingAmount);
        }

        public List<IncomeDetails> GetAllIncome()
        {
            return this.income;
        }

        public List<SpendingDetails> GetAllSpending()
        {
            return this.spending;
        }

        public IncomeDetails GetMostPopularIncome()
        {
            var popular = this.income
                .GroupBy(t => t.incomeType)
                .Select(n => new
                {
                    incomeType = n.Key,
                    incomeAmont = n.Sum(g => g.incomeAmount)
                })
                .OrderByDescending(t => t.incomeAmont)
                .FirstOrDefault();

            IncomeDetails mostPopular = new IncomeDetails(popular.incomeAmont, popular.incomeType);
            return mostPopular;
        }

        public SpendingDetails GetMostPopularSpending()
        {
            var popular = this.spending
                .GroupBy(t => t.spendingType)
                .Select(g => new
                {
                    spendingType = g.Key,
                    spendingAmount = g.Sum(g => g.spendingAmount)
                })
                .OrderByDescending(t => t.spendingAmount)
                .FirstOrDefault();

            SpendingDetails mostPopular = new SpendingDetails(popular.spendingAmount, popular.spendingType);
            return mostPopular;
        }
    }
}
