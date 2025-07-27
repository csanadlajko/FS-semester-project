from flask import Flask, jsonify
from predict import PredictIncome
import pandas as pd

app = Flask(__name__)

@app.route('/api/predict', methods=['GET'])
def predict():
    df: pd.DataFrame = PredictIncome.parse_income()
    print(df.head())
    return jsonify({'status': 'under development...'})

app.run(debug=True)