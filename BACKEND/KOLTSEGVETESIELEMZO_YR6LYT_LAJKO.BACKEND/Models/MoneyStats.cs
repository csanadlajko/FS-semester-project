namespace KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Models
{
    public enum SpentType
    {
        Essentials,
        Emergency,
        Entertainment,
        Investment
    }

    public enum IncomeType
    {
        Salary,
        Scholarship,
        Gambling,
        Other
    }
    
    public class MoneyStats
    {
        public float spentAmount {  get; set; }
        public float incomeAmount { get; set; }
        public SpentType spentType { get; set; }
        public IncomeType incomeType { get; set; }
    }
}
