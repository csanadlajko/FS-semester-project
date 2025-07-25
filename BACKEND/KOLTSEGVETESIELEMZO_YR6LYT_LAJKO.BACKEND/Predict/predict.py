import pandas as pd
import requests
from constants import CommonConstants
from typing import Any
from sklearn.linear_model import LinearRegression

class PredictIncome:
    
    def parse_income() -> pd.DataFrame:
        response: requests.Response = requests.get(url=f"{CommonConstants.LOCAL_BASE_URL}/{CommonConstants.ALL_INCOME_ENDPOINT}")
        response_data: Any = response.json()
        income_amount: list[int] = []
        income_type: list[str] = []
        income_data_dict: dict[str, list[Any]] = {"incomeAmount": [], "incomeType": []}
        for item in response_data:
            income_amount.append(item["incomeAmount"])
            income_type.append(item["incomeType"])
        income_data_dict.update({"incomeAmount": income_amount})
        income_data_dict.update({"incomeType": income_type})
        return income_data_dict
        
    def predict_income():
        all_income: pd.DataFrame = PredictIncome.parse_income()
        ## TODO
        return