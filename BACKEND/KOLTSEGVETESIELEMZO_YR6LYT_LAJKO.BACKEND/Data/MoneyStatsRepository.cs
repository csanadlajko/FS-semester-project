using KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Models;

namespace KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Data
{
    public class MoneyStatsRepository : IMoneyStatsRepository
    {
        private List<MoneyStats> moneyStats = new List<MoneyStats>();

        public float CalculateTotalSavings()
        {
            float totalSavings = 0;
            foreach (var item in moneyStats)
            {
                totalSavings += item.incomeAmount - item.spentAmount;
            }
            return totalSavings;
        }

        public void AddNewStat(MoneyStats stat)
        {
            moneyStats.Add(stat);
        }
    }
}
