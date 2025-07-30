using Newtonsoft.Json;

namespace KOLTSEGVETESIELEMZO.BACKEND.Models
{
    public class IncomeDetails
    {
        public float incomeAmount {  get; set; }
        public string? incomeType { get; set; }

        [JsonProperty("status")]
        public bool Status { get; set; }

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
