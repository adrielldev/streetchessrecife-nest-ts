import React,{useState,useEffect, ReactNode} from 'react'
import { api } from '@/service/api';
import PlayerList from '@/components/PlayerList';



export default function Admin():ReactNode {
  

  return (
    <div>
      <PlayerList/>
    </div>
  )
}


