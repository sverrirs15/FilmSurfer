import json
import deildu_connection
from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return json.dumps({"movies":[{"movieID": "14273549", "title": "Interstellar", "year": "1994"},
    							 {"movieID": "14273543", "title": "Star Wars", "year": "1994"}
    							]})

@app.route("/get_movies")
def get_movies():
	return json.dumps(deildu_connection.get_movies())

if __name__ == "__main__":
    app.run(host='192.168.1.110',debug=True)