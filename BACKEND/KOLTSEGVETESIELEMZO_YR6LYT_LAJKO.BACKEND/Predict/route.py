from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/api/predict', methods=['GET'])
def predict():
    return jsonify({'status': 'under development...'})

app.run()