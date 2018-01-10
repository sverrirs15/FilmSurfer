import json
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return json.dumps({'Name': 'Interstellar', 'Director': 'Christopher Nolan'})

if __name__ == "__main__":
    app.run()