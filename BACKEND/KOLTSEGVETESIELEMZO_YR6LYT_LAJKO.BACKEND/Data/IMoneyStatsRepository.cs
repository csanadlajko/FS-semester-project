using KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Models;

namespace KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Data
{
    public interface IMoneyStatsRepository
    {
        float CalculateSavings(MoneyStats stats);

    }
}
