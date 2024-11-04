import React from 'react'
import HealthTrendChart from './HealthTrendChart'
import MoodWordCloud from './MoodWordCloud'
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';

export default function UserAnalysis() {
    const id=useParams().id;
  return (
    <>
    <Navbar /> 
       <div className='m-2'>
          <HealthTrendChart userID={id}/>
          <MoodWordCloud userID={id} />
    </div>

  </>
  )
}
