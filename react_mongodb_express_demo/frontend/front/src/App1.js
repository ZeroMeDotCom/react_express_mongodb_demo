import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [tasks, setTasks] = useState([]); 
  const [loading, setLoading] = useState(true);

  // Fetch data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5001/data');
        setTasks(response.data.message);
        console.log(response.data.message)
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setLoading(true);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading tasks...</div>;
  }

  return (
    <div>
      <h1>Task List</h1>
      {tasks.length > 0 ? (
          tasks.map((taskItem) => (
              <div key={taskItem._id}>
                  <h3>Date: {taskItem.date}</h3>
                  <ul>
                      {taskItem.task.map((task, index) => (
                          <li key={index}>{task}</li>
                      ))}
                  </ul>
              </div>
          ))
      ) : (
          <p>No tasks available</p>
      )}
    </div>
  );
}

export default App;