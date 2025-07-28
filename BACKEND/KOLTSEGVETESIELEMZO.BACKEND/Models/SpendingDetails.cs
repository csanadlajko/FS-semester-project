namespace KOLTSEGVETESIELEMZO.BACKEND.Models
{
    public class SpendingDetails
    {
        public float spendingAmount { get; set; }
        public string? spendingType { get; set; }

        public SpendingDetails()
        {
            
        }

        public SpendingDetails(string? spendingType, float spendingAmount = 0)
        {
            this.spendingAmount = spendingAmount;
            this.spendingType = spendingType;
        }
    }
}
