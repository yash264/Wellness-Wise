import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import axios from 'axios';

import AnalyzeHealthData from './AnalyzeHealthData';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend); 
function HealthTrendChart({ userID }) {
    const [chartData, setChartData] = useState({});
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:5000/api/health/${userID}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('authToken')}`
                }
            });
            const data = response.data.data;
            setData(response.data.data);
            const Log_data = {
                labels: data.map(d => d._id),  
                datasets: [
                    {
                        label: "Activity Level",
                        data: data.map(d => d.avgActivity),
                        borderColor: "rgb(75, 192, 192)",
                        backgroundColor: "rgba(75, 192, 192, 0.2)",
                        fill: true,
                    },
                    {
                        label: "Nutrition Level",
                        data: data.map(d => d.avgNutrition),
                        borderColor: "rgb(255, 159, 64)",
                        backgroundColor: "rgba(255, 159, 64, 0.2)",
                        fill: true,
                    },
                    {
                        label: "Sleep Level",
                        data: data.map(d => d.avgSleep),
                        borderColor: "rgb(125, 159, 64)",
                        backgroundColor: "rgba(125, 159, 64, 0.2)",
                        fill: true,
                    },
                    {
                        label: "Stress Level",
                        data: data.map(d => d.avgStressLevel),
                        borderColor: "rgb(100, 19, 64)",
                        backgroundColor: "rgba(100, 19, 64, 0.2)",
                        fill: true,
                    },
                   
                ],
            };
            
            setChartData(Log_data);
        };
        
        fetchData();
    }, [userID]);
    
    const options = {
        responsive: true,
        scales: {
            x: {
                type: "category", 
                title: {
                    display: true,
                    text: "Date",
                },
            },
            y: {
                type: "linear",
                title: {
                    display: true,
                    text: "Values",
                },
            },
        },
    };
    
    return (
        <div>
            {data && <AnalyzeHealthData data={data} /> }
            <h2>User Health Trends</h2>
            {chartData.labels && <Line data={chartData} options={options} width={"100%"} height={"100%"} className='chart' /> }
        </div>
    );
}

export default HealthTrendChart;
