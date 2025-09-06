from flask import Blueprint, jsonify, request
import pandas as pd
from Calculation.predict import PredictSpending

spending_stats: Blueprint = Blueprint("spending_stats", __name__)

@spending_stats.route("/api/averageSpending", methods=["GET"])
def get_avg_spending():
    ps_obj: PredictSpending = PredictSpending()
    filtered_spending: pd.DataFrame = PredictSpending.average_spending_by_type(ps_obj)
    return jsonify(filtered_spending.to_dict(orient='records'))

@spending_stats.route("/api/checkSpending", methods=['POST'])
def check_income():
    ps_obj: PredictSpending = PredictSpending()
    valid_spending: bool = ps_obj.check_income()
    return jsonify({ 'Status': valid_spending })