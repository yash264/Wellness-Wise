import React from 'react'
import HealthTrendChart from './HealthTrendChart'
import MoodWordCloud from './MoodWordCloud'
import { useParams } from 'react-router-dom';

export default function UserAnalysis() {
    const id=useParams().id;
  return (
    <div className='m-5'>
          <HealthTrendChart userID={id}/>
          <MoodWordCloud userID={id} />
    </div>
  )
}
