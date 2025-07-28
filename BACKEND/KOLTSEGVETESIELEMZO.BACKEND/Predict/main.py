from flask import Flask
from Routes.income_routes import income_stats
from Routes.spending_routes import spending_stats

app = Flask(__name__)
app.register_blueprint(income_stats)
app.register_blueprint(spending_stats)

app.run(debug=True)