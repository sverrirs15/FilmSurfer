from bs4 import BeautifulSoup
import requests
import os
import re
import PTN
import json
import subprocess

url_root = 'http://afghanpirate.com/'
url_login = 'http://afghanpirate.com/takelogin.php'
url_top_movies = 'http://afghanpirate.com/browse.php?cat=6&sort=seeders&type=desc'
apikey = 'a345b6e2'

payload_login = {'username': 'jobs', 'password': 'coolguys2083'}

playing_movie = "No movie playing"


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
                film["imdb"] = "9.0"
                film["rotten"] = "8.3"
                film["metacritic"] = "8.7"
                film["plot"] = "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice."
                film["poster"] = "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg"
                '''
                res = requests.get('http://www.omdbapi.com/?t=' + movie +
                                   '&apikey=a345b6e2').text

                res = json.loads(res)
                try:
                    film["poster"] = res['Poster']
                    film["plot"] = res['Plot']
                    film["imdb"] = res['Ratings'][0]['Value']
                    film["rotten"] = res['Ratings'][1]['Value']
                    film["metacritic"] = res['Ratings'][2]['Value']
                except KeyError:
                    continue
                except IndexError:
                    film["imdb"] = '-'
                    film["rotten"] = '-'
                    film["metacritic"] = '-'
                    '''
                
                
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

                with open('./torrents/' + id + '.torrent', 'wb') as f:
                    f.write(r.content)
                print(id)
                #os.system(
                 #   "transmission-cli -w ./torrents_ready/" + " " + "./torrents/" + id + ".torrent")
                subprocess.Popen(["transmission-cli", "-w", "./torrents_ready/", "./torrents/" + id + ".torrent"],stdout=subprocess.PIPE,stderr=subprocess.PIPE)

    return "Finished downloading"


def get_my_movies():
    movies = []
    try:
        files = os.listdir(
            './torrents_ready')
    except FileNotFoundError:
        files = ['No movies found']

    for title in files:
        movie = PTN.parse(title)["title"]

        film = dict()
        film["year"] = 1933
        film["title"] = title
        film["movie"] = movie
        film["imdb"] = "9.0"
        film["rotten"] = "8.3"
        film["metacritic"] = "8.7"
        film["plot"] = "When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham, the Dark Knight must accept one of the greatest psychological and physical tests of his ability to fight injustice."
        film["poster"] = "https://images-na.ssl-images-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_SX300.jpg"
        
        res = requests.get('http://www.omdbapi.com/?t=' + movie +
                            '&apikey=a345b6e2').text

        res = json.loads(res)
        try:
            film["poster"] = res['Poster']
            film["plot"] = res['Plot']
            film["imdb"] = res['Ratings'][0]['Value']
            film["rotten"] = res['Ratings'][1]['Value']
            film["metacritic"] = res['Ratings'][2]['Value']
        except KeyError:
            continue
        except IndexError:
            film["imdb"] = '-'
            film["rotten"] = '-'
            film["metacritic"] = '-'
            
        

        movies.append(film)

    return {"movies": movies}


def play_movie(movie):
    playing_movie = movie
    os.system("transmission-cli")
    path = "./torrents_ready/"
    subprocess.Popen(["cvlc", "--fullscreen", path + movie],stdout=subprocess.PIPE,stderr=subprocess.PIPE)
    
    return movie


def get_currently_playing():
    return playing_movie


def stop_playing():
    os.system("killall vlc")

    return "Success"