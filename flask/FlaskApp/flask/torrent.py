import json
import deildu_connection
from flask import Flask
from flask import request
app = Flask(__name__)


@app.route("/")
def hello():
    return json.dumps({
        "movies": [{
            "movieID": "14273549",
            "title": "Interstellar",
            "year": "1994"
        }, {
            "movieID": "14273543",
            "title": "Star Wars",
            "year": "1994"
        }]
    })


@app.route("/get_movies")
def get_movies():
    return json.dumps(deildu_connection.get_movies())


@app.route("/download_movie")
def download_movie():
    movieID = request.args.get('movieID')
    print(movieID)
    return deildu_connection.download_movie(movieID)


@app.route("/get_my_movies")
def get_my_movies():
    return json.dumps(deildu_connection.get_my_movies())


@app.route("/play_movie")
def play_movie():
    movie = request.args.get('movie')
    return deildu_connection.play_movie(movie)

@app.route("/get_currently_playing")
def get_currently_playing():
    return deildu_connection.get_currently_playing()


@app.route("/stop_playing")
def stop_playing():
    return deildu_connection.stop_playing()

if __name__ == "__main__":
    app.run(host='192.168.1.110', debug=True)
