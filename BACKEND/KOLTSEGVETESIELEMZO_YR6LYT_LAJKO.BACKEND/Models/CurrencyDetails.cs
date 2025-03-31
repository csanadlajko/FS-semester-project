namespace KOLTSEGVETESIELEMZO_YR6LYT_LAJKO.BACKEND.Models
{
    public class CurrencyDetails
    {
        public string? currencyType { get; set; }

        public CurrencyDetails()
        {
            
        }

        public CurrencyDetails(string? currencyType)
        {
            this.currencyType = currencyType;
        }
    }
}
