using KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Models;

namespace KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Data
{
    public interface IMoneyStatsRepository
    {
        float CalculateTotalSavings();
        void AddNewIncome(IncomeDetails incomeDetails);
        void AddNewSpending(SpendingDetails spendingDetails);
        float GetTotalIncome();
        float GetTotalSpending();
        List<IncomeDetails> GetAllIncome();
        List<SpendingDetails> GetAllSpending();
        IncomeDetails GetMostPopularIncome();
        SpendingDetails GetMostPopularSpending();

        List<IncomeDetails> GetFilteredIncome();
        List<SpendingDetails> GetFilteredSpending();
    }
}
