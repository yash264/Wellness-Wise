import React, { useEffect, useState } from 'react';
import WordCloud from 'react-wordcloud';
import axios from 'axios';

function MoodWordCloud({ userID ,fetch}) {
    const [words, setWords] = useState([]);
    

    useEffect(() => {
        const fetchMoods = async () => {
            const response = await axios.get(`http://localhost:5000/api/health/${userID}`);
            
            
            const moods = response.data.data.flatMap(entry => entry.mood);
            const wordCounts = moods.reduce((acc, mood) => {
                const words = mood.split(' ');
                words.forEach(word => {
                    acc[word] = (acc[word] || 0) + 1;
                });
                return acc;
            }, {});

            setWords(Object.keys(wordCounts).map(word => ({ text: word, value: wordCounts[word] })));
        };

        fetchMoods();
    }, [userID,fetch]);

    return (
        <div>
            <h2>User Mood Word Cloud</h2>
            <WordCloud words={words} />
          
        </div>
    );
}

export default MoodWordCloud;
