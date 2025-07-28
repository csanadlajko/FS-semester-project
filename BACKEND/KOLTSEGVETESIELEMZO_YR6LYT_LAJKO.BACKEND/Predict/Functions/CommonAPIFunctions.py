import requests
import pandas as pd
from typing import Any

class CommonAPIFunctions:
    
    def parse_money_stats(endpoint: str, income: bool = True) -> pd.DataFrame:
        amount_key: str = "incomeAmount"
        type_key: str = "incomeType"
        if not income:
            amount_key = "spendingAmount"
            type_key = "spendingType"
        response: requests.Response = requests.get(url=endpoint)
        response_data: Any = response.json()
        df: pd.DataFrame = CommonAPIFunctions.get_df_by_dict(response_dict=response_data, amount_key=amount_key, type_key=type_key)
        return df
    
    def get_df_by_dict(response_dict: list[dict[str, Any]], amount_key: str, type_key: str) -> pd.DataFrame:
        income_data_dict: dict[str, list[Any]] = {amount_key: [], type_key: []}
        amount_list: list[int] = []
        type_list: list[str] = []
        for item in response_dict:
            amount_list.append(item[amount_key])
            type_list.append(item[type_key])
        income_data_dict.update({amount_key: amount_list})
        income_data_dict.update({type_key: type_list})
        return pd.DataFrame(income_data_dict)