import React,{useState,useEffect, ReactNode} from 'react'
import { api } from '@/service/api';
import '../../styles/playerList.css'

function PlayerList() {
    const [players,setPlayers] = useState([] as any);

  const loadPlayers = async () => {
    const {data} = await api.get('/player/ranking')
    setPlayers(data);
  }
  useEffect(()=>{
    loadPlayers();
  },[])
  return (
    <div className='div-player-list'>
        <div className='div-player-list-header'>
            <h1>Player Ranking</h1>
        </div>
        <div className='div-player-list-players'>
        <div className='div-player-list-players-player' key={0}>
                <h1>Nome</h1>
                <h1>Username</h1>
                <h1>Rating </h1>
                <h1>Vitórias</h1>
                <h1>Empates</h1>
                <h1>Derrotas</h1>
            </div>
        {players ? players.map(player => (
            <div className='div-player-list-players-player' key={player.id}>
                <h1>{player.name}</h1>
                <h1>{player.username}</h1>
                <h1>{player.rating_rapid}</h1>
                <h1>{player.victories}</h1>
                <h1>{player.draws}</h1>
                <h1>{player.loses}</h1>
            </div>
        )) : <h1>Loading...</h1>}

        </div>
    </div>
  )
}

export default PlayerList