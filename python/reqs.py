import requests

def getRapidRanking():
   requisicao = requests.get('http://localhost:3333/player/ranking')

   return requisicao.json()
   