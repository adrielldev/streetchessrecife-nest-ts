import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages


def create_file(players): 
    col_names = ['Nome','Username','Rating','Vitórias','Empates','Derrotas']
    dict_players = {
        'Nome':[],
        'Username':[],
        'Rating':[],
        'Vitórias':[],
        'Empates':[],
        'Derrotas':[],
       
    }

    for player in players:
        dict_players['Username'].append(player['username'])
        dict_players['Nome'].append(player['name'])
        dict_players['Rating'].append(player['rating_rapid'])
        dict_players['Vitórias'].append(player['victories'])
        dict_players['Derrotas'].append(player['loses'])
        dict_players['Empates'].append(player['draws'])
    df = pd.DataFrame(dict_players)
    fig, ax =plt.subplots(figsize=(12,4))
    ax.axis('tight')
    ax.axis('off')
    the_table = ax.table(cellText=df.values,colLabels=col_names,loc='center')
    pp = PdfPages("streetchessranking260623.pdf")
    pp.savefig(fig, bbox_inches='tight')
    pp.close()
    
 
    
        

    

    