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
            Console.WriteLine("Entering calculating function");
            foreach (var item in income)
            {
                totalSavings += item.incomeAmount;
            }
            foreach (var item in spending)
            {
                totalSavings -= item.spendingAmount;
            }
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
    }
}
