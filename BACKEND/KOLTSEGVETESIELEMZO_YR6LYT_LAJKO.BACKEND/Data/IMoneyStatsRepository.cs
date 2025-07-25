using KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Models;

namespace KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Data
{
    public interface IMoneyStatsRepository
    {
        float CalculateTotalSavings();
        void AddNewIncome(IncomeDetails incomeDetails);
        void AddNewSpending(SpendingDetails spendingDetails);

        List<IncomeDetails> GetAllIncome();
        List<SpendingDetails> GetAllSpending();

        List<IncomeDetails> GetFilteredIncome();
        List<SpendingDetails> GetFilteredSpending();

        void AddCurrencyType(CurrencyDetails newCurrency);
        CurrencyDetails GetCurrencyType();
        string GetPredictionData();
    }
}
