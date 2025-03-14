using KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Models;

namespace KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Data
{
    public class MoneyStatsRepository : IMoneyStatsRepository
    {
        private List<MoneyStats> moneyStats = new List<MoneyStats>();

        public float CalculateSavings(MoneyStats stat)
        {
            float totalIncomeAmount = 0;
            float totalSpentAmount = 0;
            foreach (var item in moneyStats)
            {
                totalIncomeAmount += item.incomeAmount;
                totalSpentAmount += item.spentAmount;
                
            }

            return totalIncomeAmount - totalSpentAmount;
        }

        public void AddNewStat(MoneyStats stat)
        {
            moneyStats.Add(stat);
        }
    }
}
