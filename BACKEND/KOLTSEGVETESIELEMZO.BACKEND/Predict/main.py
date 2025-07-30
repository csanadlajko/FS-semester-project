from flask import Flask, render_template
from Routes.income_routes import income_stats
from Routes.spending_routes import spending_stats
from Constants.CommonFileConstants import CommonFileConstants

app = Flask(__name__, template_folder=CommonFileConstants.TEMPLATE_PATH, static_folder=CommonFileConstants.STATIC_PATH)
app.register_blueprint(income_stats)
app.register_blueprint(spending_stats)

@app.route("/")
def main_page():
    return render_template("index.html")

app.run(debug=True, port=5002, host="0.0.0.0")