import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../App.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function TodayTasks({ pendingTasks, totalTasks }) {
  const chartData = {
    labels: ['Pending', 'Done'],
    datasets: [
      {
        data: [pendingTasks, totalTasks - pendingTasks],
        backgroundColor: ['#4CAF50', '#333'], // Green and Dark Gray
        borderColor: ['#4CAF50', '#333'],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="today-tasks-card">
      <h3>Today's Tasks</h3>
      <p className="task-count">{totalTasks} Tasks</p>
      <div className="chart-container">
        <Pie data={chartData} options={{ maintainAspectRatio: false }} />
      </div>
      <div className="legend">
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#4CAF50' }} />
          
        </div>
        <div className="legend-item">
          <span className="legend-color" style={{ backgroundColor: '#333' }} />
         
        </div>
      </div>
    </div>
  );
}

export default TodayTasks;
