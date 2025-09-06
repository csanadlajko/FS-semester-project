from flask import Blueprint, jsonify, request
from Calculation.predict import PredictIncome
from typing import Any
import pandas as pd

income_stats: Blueprint = Blueprint("income_stats", __name__)

@income_stats.route("/api/averageIncome", methods=['GET'])
def average_income():
    pi_obj: PredictIncome = PredictIncome()
    avg_df: pd.DataFrame = PredictIncome.average_income_by_type(pi_obj)
    return jsonify(avg_df.to_dict(orient='records'))

@income_stats.route("/api/checkIncome", methods=["POST"])
def check_income():
    pi_obj: PredictIncome = PredictIncome()
    valid_income: bool = pi_obj.check_income()
    return jsonify({ 'Status': valid_income })