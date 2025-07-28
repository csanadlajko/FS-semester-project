using KOLTSEGVETESIELEMZO.BACKEND.Models;

namespace KOLTSEGVETESIELEMZO.BACKEND.Data
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
        List<IncomeDetails> GetAverageIncome();
        List<SpendingDetails> GetAverageSpending();
    }
}
