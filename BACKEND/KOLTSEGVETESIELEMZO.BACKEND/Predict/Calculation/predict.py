import pandas as pd
from Constants.CommonConstants import CommonConstants
from sklearn.linear_model import LinearRegression
from Functions.CommonAPIFunctions import CommonAPIFunctions

class PredictIncome:
    ALL_INCOME_API: str = f"{CommonConstants.LOCAL_BASE_URL}{CommonConstants.ALL_INCOME_ENDPOINT}"
    
    def __init__(self) -> None:
        self.income_data: pd.DataFrame = CommonAPIFunctions.parse_money_stats(endpoint=PredictIncome.ALL_INCOME_API, income=True)
        self.treshold = 0.1
    
    def average_income_by_type(self) -> pd.DataFrame:
        average_price: pd.DataFrame = self.income_data.groupby("incomeType", as_index=False)["incomeAmount"].mean()
        return average_price
    
    def check_income(self, income_data: dict[str, float]) -> bool:
        all_avg_data: pd.DataFrame = self.average_income_by_type()
        avg_amount: float = all_avg_data.loc[all_avg_data["incomeType"] == income_data["incomeType"], "incomeAmount"].item()
        upper_treshold: float = (avg_amount * self.treshold) + avg_amount
        lower_treshold: float = avg_amount - (avg_amount * self.treshold)
        if (income_data["incomeAmount"] > lower_treshold and income_data["incomeAmount"] < upper_treshold):
            return True
        return False

class PredictSpending:
    ALL_SPENDING_API: str = f"{CommonConstants.LOCAL_BASE_URL}{CommonConstants.ALL_SPENDING_ENDPOINT}"
    
    def __init__(self) -> None:
        self.spending_data: pd.DataFrame = CommonAPIFunctions.parse_money_stats(endpoint=PredictSpending.ALL_SPENDING_API, income=False)
        self.treshold = 0.1
    
    def average_spending_by_type(self) -> pd.DataFrame:
        avg_price: pd.DataFrame = self.spending_data.groupby("spendingType", as_index=False)["spendingAmount"].mean()
        return avg_price