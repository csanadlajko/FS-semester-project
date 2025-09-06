from flask import Flask, render_template
from flask_cors import CORS
from Routes.income_routes import income_stats
from Routes.spending_routes import spending_stats
from Constants.CommonFileConstants import CommonFileConstants
from dotenv import load_dotenv
import os

load_dotenv()

FLASK_PORT: int = int(os.getenv("FLASK_PORT", 5001))

app = Flask(__name__, template_folder=CommonFileConstants.TEMPLATE_PATH, static_folder=CommonFileConstants.STATIC_PATH)
app.register_blueprint(income_stats)
app.register_blueprint(spending_stats)

@app.route("/")
def main_page():
    return render_template("index.html")

@app.route("/description")
def description():
    return render_template("description.html")

@app.route("/details")
def details():
    return render_template("stat_details.html")

CORS(app)

app.run(debug=True, host="0.0.0.0", port=FLASK_PORT)