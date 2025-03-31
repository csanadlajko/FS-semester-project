namespace KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Models
{
    public enum IncomeTypes 
    {
        Salary,
        Birthday,
        Gambling,
        Other
    }
    
    public class IncomeDetails
    {
        public float incomeAmount {  get; set; }
        public string? incomeType { get; set; }

        public IncomeDetails()
        {
            
        }

        public IncomeDetails(string? incomeType, float incomeAmount = 0)
        {
            this.incomeAmount = incomeAmount;
            this.incomeType = incomeType;
        }
    }
}
