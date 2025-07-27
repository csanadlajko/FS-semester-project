from flask import Flask, jsonify
from predict import PredictIncome
import pandas as pd

app = Flask(__name__)

@app.route('/api/predict', methods=['GET'])
def predict():
    df: pd.DataFrame = PredictIncome.parse_income()
    return jsonify({'status': 'under development...'})

@app.route("/api/averageIncome", methods=['GET'])
def average_income():
    pi_obj: PredictIncome = PredictIncome()
    avg_df: pd.DataFrame = PredictIncome.average_income_by_type(pi_obj)
    return jsonify(avg_df.to_dict(orient='records'))

app.run(debug=True)