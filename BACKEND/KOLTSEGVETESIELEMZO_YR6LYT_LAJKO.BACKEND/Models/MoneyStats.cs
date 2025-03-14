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
        public string spentType { get; set; }
        public string incomeType { get; set; }

        public MoneyStats(float spentAmount, float incomeAmount, string spentType, string incomeType)
        {
            this.spentAmount = spentAmount;
            this.incomeAmount = incomeAmount;
            this.spentType = spentType;
            this.incomeType = incomeType;
        }
    }
}
