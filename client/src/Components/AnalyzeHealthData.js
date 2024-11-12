import React, { useEffect, useState } from 'react'
const Sentiment = require('sentiment');

export default function AnalyzeHealthData({data}) {
    const sentiment = new Sentiment();
    const [alert, setAlert] = useState([]);
 
    const analysis = () => {
        // Stress & Burnout Detection
        const avgStress = data.reduce((acc, entry) => acc + entry.avgStressLevel, 0) / data.length;
        if (avgStress > 7 && !alert.includes("You may be experiencing elevated stress. Consider relaxation techniques or mindfulness sessions.")) {
            setAlert([...alert, "You may be experiencing elevated stress. Consider relaxation techniques or mindfulness sessions."]);
        }

        // Activity Level Alert
        const avgActivity = data.reduce((acc, entry) => acc + entry.avgActivity, 0) / data.length;
        if (avgActivity < 3 && !alert.includes("It seems like your activity level has been low recently. Adding some movement to your day could boost energy and mood!")) {
            setAlert([...alert, "It seems like your activity level has been low recently. Adding some movement to your day could boost energy and mood!"]);
        }

        // Sleep Quality Alert
        const avgSleep = data.reduce((acc, entry) => acc + entry.avgSleep, 0) / data.length;
        if (avgSleep < 5 && !alert.includes("It looks like your sleep quality has been low. Prioritizing rest could improve mood and focus.")) {
            setAlert([...alert, "It looks like your sleep quality has been low. Prioritizing rest could improve mood and focus."]);
        }

        // Mood Deterioration Alert
        const negativeMoods = data.filter(entry => analyzeSentiment(entry.mood) < -0.3);
        if (negativeMoods.length > data.length / 2 && !alert.includes("It seems like you have a downward trend in your mood. Consider activities that lift your spirits, like connecting with friends or spending time outdoors.")) {
            setAlert([...alert, "It seems like you have a downward trend in your mood. Consider activities that lift your spirits, like connecting with friends or spending time outdoors."]);
        }
    };

    useEffect(()=>{        
        analysis();
    },[data])
    
    

    const analyzeSentiment = (moodArray) => {
        let totalScore = 0;

        moodArray.forEach(moodText => {
            const result = sentiment.analyze(moodText);
            totalScore += result.score;  // Sum the sentiment scores of each mood entry
        });

        const averageScore = totalScore / moodArray.length;  // Calculate average sentiment score
        return averageScore;
    };    
   

        
    
     
     
  return (
    <>
        {alert.length>0 ?
        <div className='d-flex flex-column alert alert-danger'>
        
         { alert.map((value, index) => <div key={index} className='fs-6'>{value}</div>)}
        </div> :<div  className='alert alert-success' >No Alert</div> }
    </>
  )
}

