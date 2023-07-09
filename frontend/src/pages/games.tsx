import React, { useEffect, useState } from 'react'
import '../app/globals.css'
import { api } from '@/service/api'
import { ToastContainer, toast } from 'react-toastify';
import Layout from '@/components/Layout';



function Games() {

  const [games,setGames] = useState([] as any);
  const [players,setPlayers] = useState([] as any)
  const [whitePlayer,setWhitePlayer] = useState({});
  const [blackPlayer,setBlackPlayer] = useState({});
  const [result,setResult] = useState('');
  const[render,setRender] = useState(false);
  
  const loadGames = async () => {
    const {data} = await api.get('/games')
    setGames(data);
  }

  const loadPlayers = async () => {
    const {data} = await api.get('/player')
    setPlayers(data);
    
  }
  


  const createGame = async () => {
    try {
      console.log(result);
      await api.post('/games',{
        white_player:whitePlayer,
        black_player:blackPlayer,
        result:result

      })

      toast.success("teste");
      setRender(!render)
    } catch (error:any) {
      console.log(error)
      toast.error(error.response.data.message)
    }
  }
  
  const handleResult = (result:string) => {
    // usar switch
    console.log()
    if(result === 'Brancas'){
      setResult('w')
    } else if(result === 'Negras') {
      setResult('b');
    } else {
      setResult('d');
    }
    
    
  }


  useEffect(()=>{
    loadGames();
    loadPlayers();
    },[])
  
  useEffect(() => {
    loadGames();
  },[render]);

  return (
    <>
    <Layout/>
      <div>
      <h1>Criar novo jogo</h1>
      <h2>Jogador de brancas</h2>
      <select onChange={(e) => 
        setWhitePlayer(players.find((player:any) => player.name === e.target.value).username)
      }>
        <option>Selecione o jogador de brancas</option>
        {
          players.map((player:any) => (
            <option key={player.id}>{player.name}</option>
          ))
        }
      </select>
      <h2>Jogador de negras</h2>
      <select onChange={(e) => setBlackPlayer(players.find((player:any) => player.name === e.target.value).username)}>
      <option>Selecione o jogador de negras</option>
        {
          players.map((player:any) => (
            <option key={player.id}>{player.name}</option>
          ))
        }
      </select>
      <button onClick={createGame} className='bg-black text-white p-2 rounded'>
        Criar novo jogo
      </button>
    </div>
    <div>
      <h1>Result:</h1>
      <select onChange={(e) => handleResult(e.target.value)}>
        <option>Digite um resultado</option>
        <option>Brancas</option>
        <option>Empate</option>
        <option>Negras</option>
      </select>
    </div>

    <div>
      <h1>Games</h1>
      <ul>
        <li className='flex gap-6'>
          
          <h1>
            Jogador Brancas
          </h1>
          <h1>
            Jogador  Negras
          </h1>
          <h1>
            Resultado
          </h1>
          <h1>
            Data
          </h1>
        </li>
        {games.map((game:any) => (
          <li className='flex gap-6' key={game.id}>
            <h1>
              {game.white_player.name}
            </h1> 
            <h1>
              {game.black_player.name}
            </h1>
            <h1>
              {game.result == 'w' ? "Vitória Brancas" : game.result == 'b' ? "Vitória Negras" : "Empate"}
            </h1>
            <h1>
              {new Date(game.date_game).toString()}
            </h1>
            
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default Games