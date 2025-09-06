import os
from dotenv import load_dotenv

load_dotenv()

class CommonConstants:
    DOTNET_BASE_URL: str = os.getenv("DOTNET_API_URL", "http://localhost:5284")
    LOCAL_BASE_URL: str = f"{DOTNET_BASE_URL}/MoneyStats"
    ALL_INCOME_ENDPOINT: str = "/getAllIncome"
    ALL_SPENDING_ENDPOINT: str = "/getAllSpending"