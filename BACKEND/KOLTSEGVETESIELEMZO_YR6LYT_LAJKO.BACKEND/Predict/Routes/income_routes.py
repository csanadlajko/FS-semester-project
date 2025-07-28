from flask import Blueprint, jsonify
from Calculation.predict import PredictIncome
import pandas as pd

income_stats: Blueprint = Blueprint("income_stats", __name__)

@income_stats.route("/api/averageIncome", methods=['GET'])
def average_income():
    pi_obj: PredictIncome = PredictIncome()
    avg_df: pd.DataFrame = PredictIncome.average_income_by_type(pi_obj)
    return jsonify(avg_df.to_dict(orient='records'))