from bs4 import BeautifulSoup
import requests
import os
import re
import PTN
import json

url_root = 'http://afghanpirate.com/'
url_login = 'http://afghanpirate.com/takelogin.php'
url_top_movies = 'http://afghanpirate.com/browse.php?cat=6&sort=seeders&type=desc'
apikey = 'a345b6e2'

payload_login = {'username': 'jobs', 'password': 'coolguys2083'}


def get_page(url, s):
    r = s.get(url)
    data = r.text
    return BeautifulSoup(data, 'html.parser')


def get_movies():
    with requests.Session() as s:
        r = s.post(url_login, data=payload_login)
        r = s.get(url_top_movies)
        data = r.text
        soup = BeautifulSoup(data, 'html.parser')

        body_element = soup.find('table', {'class': 'torrentlist'})
        movies = body_element.find_all('td', {'align': 'left'})

        films = []

        for movie in movies:
            if movie.a is not None and movie.a.b is not None:
                title = movie.a.b.text
                link = movie.a['href']
                id = link.split('=')[1]
                movie = PTN.parse(title)["title"]

                film = dict()
                film["year"] = 1933
                film["movieID"] = id
                film["title"] = title
                film["movie"] = movie
                film["rating"] = "8.3"

                res = requests.get('http://www.omdbapi.com/?t=' + movie +
                                   '&apikey=a345b6e2').text

                res = json.loads(res)
                try:
                    film["poster"] = res['Poster']
                except KeyError:
                    film[
                        "poster"] = 'https://images-na.ssl-images-amazon.com/images/I/11382C6KyhL._SX425_.jpg'

                #film[
                #"poster"] = 'https://images-na.ssl-images-amazon.com/images/M/MV5BNzA1Njg4NzYxOV5BMl5BanBnXkFtZTgwODk5NjU3MzI@._V1_SX300.jpg'
                films.append(film)

        return {"movies": films}


def download_movie(movie_id):
    print("Gonna download %s" % movie_id)
    with requests.Session() as s:
        r = s.post(url_login, data=payload_login)
        r = s.get(url_top_movies)
        data = r.text
        soup = BeautifulSoup(data, 'html.parser')

        body_element = soup.find('table', {'class': 'torrentlist'})
        movies = body_element.find_all('td', {'align': 'left'})

        for movie in movies:
            if movie.a is not None and movie.a.b is not None:
                name = movie.a.b.text
                link = movie.a['href']
                id = link.split('=')[1]
                if movie_id != id:
                    continue

                print("Name: %s" % name)
                print("Link: %s" % link)
                print(url_root + link)
                torrent_page = get_page(url_root + link, s)

                download_link = torrent_page.find('a', {
                    'class': 'index'
                })['href']
                full_link = url_root + download_link

                print(full_link)
                r = s.get(full_link)

                with open(
                        '/home/sverrir/Dropbox/FilmSurfer/FilmSurfer/torrents/'
                        + id + '.torrent', 'wb') as f:
                    f.write(r.content)

                os.system(
                    "transmission-cli -w /home/sverrir/Dropbox/FilmSurfer/FilmSurfer/torrents_ready/"
                    + " " +
                    '/home/sverrir/Dropbox/FilmSurfer/FilmSurfer/torrents/' +
                    id + '.torrent')

    return "Finished downloading"


def get_my_movies():
    try:
        movies = os.listdir(
            '/home/sverrir/Dropbox/FilmSurfer/FilmSurfer/torrents_ready')
    except FileNotFoundError:
        movies = ['No movies found']

    return {"movies": movies}


def play_movie(movie):
    # Todo: Find nice film to play
    path = "/home/sverrir/Dropbox/FilmSurfer/FilmSurfer/torrents_ready/"
    os.system("vlc --fullscreen " + path + movie)
    return movie
