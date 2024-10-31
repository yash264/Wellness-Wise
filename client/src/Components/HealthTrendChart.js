import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import axios from 'axios';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend); 
function HealthTrendChart({ userID,fetch }) {
    const [chartData, setChartData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`http://localhost:5000/api/health/${userID}`);
            const data = response.data.data;
            const Log_data = {
                labels: data.map(d => d._id),  // Assuming data has a 'date' field
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
    }, [userID,fetch]);
    
    const options = {
        responsive: true,
        scales: {
            x: {
                type: "category", // Ensure the x-axis is set to use 'category' scale
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
            <h2>User Health Trends</h2>
            {chartData.labels && <Line data={chartData} options={options} /> }
        </div>
    );
}

export default HealthTrendChart;
