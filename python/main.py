
from reqs import getRapidRanking
from plots import create_file

def main():
    ranking_players = getRapidRanking()
    create_file(ranking_players)


if __name__ == '__main__':
    main()









