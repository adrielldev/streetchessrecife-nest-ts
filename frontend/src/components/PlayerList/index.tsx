import React,{useState,useEffect, ReactNode} from 'react'
import { api } from '@/service/api';
import '../../app/globals.css'
import Layout from '../Layout';

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
    <>
     <Layout/>
     <ul>
      <li className='flex gap-6'>
        <h1>
          Nome
        </h1>
        <h1>
          Username
        </h1>
        <h1>
          Rating
        </h1>
        <h1>
          Vitórias
        </h1>
        <h1>
          Empates
        </h1>
        <h1>
          Derrotas
        </h1>

      </li>
      {players?.map((player:any) => (
        <li key={player.id} className='flex gap-6'>
          <h1>{player.name}</h1>
          <h1>{player.username}</h1>
          <h1>{player.rating_rapid}</h1>
          <h1>{player.victories}</h1>
          <h1>{player.draws}</h1>
          <h1>{player.loses}</h1>
        </li>
      ))}
     </ul>
    </>
   
  )
}

export default PlayerList