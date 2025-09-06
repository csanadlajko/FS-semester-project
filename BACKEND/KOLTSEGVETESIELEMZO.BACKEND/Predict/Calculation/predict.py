import pandas as pd
from Constants.CommonConstants import CommonConstants
from sklearn.linear_model import LinearRegression
from Functions.CommonAPIFunctions import CommonAPIFunctions

class PredictFunctions:
    
    def __init__(self, data: pd.DataFrame, budget_type: str | None = None) -> None:
        """
        ``budget_type`` value must be 'income' or 'spending'
        """
        self.data = data
        self.dtype = f"{budget_type}Type"
        self.amount = f"{budget_type}Amount"
        
    def _avgFilteredStat(self) -> pd.DataFrame:
        avg_filtered_data: pd.DataFrame = self.data.groupby(self.dtype, as_index=False)[self.amount].mean()
        return avg_filtered_data
        
    def _verifyData(self, treshold: float) -> bool:
        avg_data: pd.DataFrame = self._avgFilteredStat()
        avg_amount: float = avg_data.loc[avg_data[self.dtype] == avg_data[self.dtype], self.amount].item()
        upper_treshold: float = (avg_amount * treshold) + avg_amount
        lower_treshold: float = avg_amount - (avg_amount * treshold)
        if (avg_amount > lower_treshold and avg_amount < upper_treshold):
            return True
        return False

class PredictIncome(PredictFunctions):
    ALL_INCOME_API: str = f"{CommonConstants.LOCAL_BASE_URL}{CommonConstants.ALL_INCOME_ENDPOINT}"
    
    def __init__(self) -> None:
        self.income_data: pd.DataFrame = CommonAPIFunctions.parse_money_stats(endpoint=PredictIncome.ALL_INCOME_API, income=True)
        self.treshold = 0.1
        super().__init__(self.income_data, "income")
    
    def average_income_by_type(self) -> pd.DataFrame:
        return super()._avgFilteredStat()
    
    def check_income(self) -> bool:
        return super()._verifyData(self.treshold)

class PredictSpending(PredictFunctions):
    ALL_SPENDING_API: str = f"{CommonConstants.LOCAL_BASE_URL}{CommonConstants.ALL_SPENDING_ENDPOINT}"
    
    def __init__(self) -> None:
        self.spending_data: pd.DataFrame = CommonAPIFunctions.parse_money_stats(endpoint=PredictSpending.ALL_SPENDING_API, income=False)
        self.treshold = 0.1
        super().__init__(self.spending_data, "spending")

    def average_spending_by_type(self) -> pd.DataFrame:
        return super()._avgFilteredStat()
    
    def check_income(self) -> bool:
        return super()._verifyData(self.treshold)