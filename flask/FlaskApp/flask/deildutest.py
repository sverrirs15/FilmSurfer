from bs4 import BeautifulSoup
import requests

url = raw_input('http://www.mbl.is/frettir/')

r = requests.get(url)

data = r.text

soup = BeautifulSoup(data)

print(soup.prettify())