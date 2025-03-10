using KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Models;

namespace KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Data
{
    public class MoneyStatsRepository : IMoneyStatsRepository
    {
        public float CalculateSavings(MoneyStats stats)
        {
            return stats.incomeAmount - stats.spentAmount;
        }
    }
}
