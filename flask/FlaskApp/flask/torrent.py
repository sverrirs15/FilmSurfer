import json
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return json.dumps({"movies":[{"movieID": "14273549", "title": "Interstellar", "year": "1994"},
    							 {"movieID": "14273543", "title": "Star Wars", "year": "1994"}
    							]})

if __name__ == "__main__":
    app.run()