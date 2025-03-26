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

            return filteredTypes;
        }
    }
}
