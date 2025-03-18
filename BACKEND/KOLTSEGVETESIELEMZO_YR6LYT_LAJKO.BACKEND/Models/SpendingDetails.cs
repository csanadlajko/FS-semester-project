namespace KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Models
{
    public enum SpendingType
    {
        Essentials,
        Emergency,
        Entertainment,
        Other
    }
    
    public class SpendingDetails
    {
        public float spendingAmount { get; set; }
        public string spendingType { get; set; }

        public SpendingDetails()
        {
            
        }

        public SpendingDetails(float spendingAmount, string spendingType)
        {
            this.spendingAmount = spendingAmount;
            this.spendingType = spendingType;
        }
    }
}
