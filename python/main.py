import requests


requisicao = requests.get('http://localhost:3333/player')

print(requisicao)
print(requisicao.json())




