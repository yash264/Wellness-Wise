import React, { useState } from 'react'
const Sentiment = require('sentiment');

export default function AnalyzeHealthData({data}) {
    const sentiment = new Sentiment();
    const [alert, setAlert] = useState([]);
    console.log(alert);
    
    

    const analyzeSentiment = (moodArray) => {
        let totalScore = 0;

        moodArray.forEach(moodText => {
            const result = sentiment.analyze(moodText);
            totalScore += result.score;  // Sum the sentiment scores of each mood entry
        });

        const averageScore = totalScore / moodArray.length;  // Calculate average sentiment score
        return averageScore;
    };    
   

        // Stress & Burnout Detection
        const avgStress = data.reduce((acc, entry) => acc + entry.avgStressLevel, 0) / data.length;
        
        
        
        if (avgStress > 7) {
            setAlert([...alert, "You may be experiencing elevated stress. Consider relaxation techniques or mindfulness sessions."]);
        }
        
        // Activity Level Alert
        const avgActivity = data.reduce((acc, entry) => acc + entry.avgActivity, 0) / data.length;
        if (avgActivity < 3) {
            setAlert([...alert, "It seems like your activity level has been low recently. Adding some movement to your day could boost energy and mood!"]);
        }
        
        // Sleep Quality Alert
        const avgSleep = data.reduce((acc, entry) => acc + entry.avgSleep, 0) / data.length;
        if (avgSleep < 5 ) {
            setAlert([...alert, "It looks like your sleep quality has been low. Prioritizing rest could improve mood and focus."]);
        }
        
        // Mood Deterioration Alert
        const negativeMoods = data.filter(entry => analyzeSentiment(entry.mood) < -0.3);
        
        
        // const negativeMoods = data.filter(entry => analyzeSentiment(entry.mood) < -0.3);
        
        if (negativeMoods.length > data.length / 2) {
            setAlert([...alert, "It seems like you have a downward trend in your mood. Consider activities that lift your spirits, like connecting with friends or spending time outdoors."]);
        }
        
        // Screen Time Alert
        // const avgScreenTime = data.reduce((acc, entry) => acc + entry.Scrren_time_minutes, 0) / data.length;
        // if (avgScreenTime > 300 && avgStress > 5 && negativeMoods.length > data.length / 2) {
        //     setAlert([...alert, "Excessive screen time could be impacting your mood and stress. Consider a digital detox or scheduled breaks."]);
        // }


  return (
    <>
        {alert.length>0 ?
        <div className='d-flex flex-column alert alert-danger'>
        
         { alert.map((value, index) => <div key={index} className='fs-6'>{value}</div>)}
        </div> :<div  className='alert alert-success'>No Alert</div> }
    </>
  )
}

