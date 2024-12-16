import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Button,
    Box,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Typography,
    Grid, Card, CardContent,
} from '@mui/material';
import TaskIcon from '@mui/icons-material/Task'; // Example icon for tasks
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'; // Example for date

const App = () => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showItems, setShowItems] = useState(false); 
    const [newDate, setNewDate] = useState('');
    const [newTask, setNewTask] = useState('');

    // State to track which date's tasks are shown
    const [visibleTasks, setVisibleTasks] = useState({});

    // Function to toggle the visibility of tasks for a specific date
    const toggleTasksVisibility = (date) => {
    setVisibleTasks((prevState) => ({
        ...prevState,
        [date]: !prevState[date], // Toggle visibility for the specific date
    }));
    };

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('http://localhost:5001/data');
                setTasks(response.data.message);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setLoading(false);
            }
        };
        fetchTasks();
    }, []);

    if (loading) {
        return <Typography variant="h5" align="center" sx={{ mt: 4 }}>Loading tasks...</Typography>;
    }

    // Function to handle the creation of a new task list
    const handleCreateTaskList = async () => {
        const newTaskData = {
        date: newDate,
        task: newTask.split(',').map((task) => task.trim()), // Split by commas and trim
        };

        try {
        // Send the new task list to the backend
        const response = await fetch('/data', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(newTaskData),
        });

        if (response.ok) {
            // If the request was successful, add the new task list to the state
            const newTaskList = await response.json();
            tasks.push(newTaskList); // Add the new task list to the local state
            alert('New task list created successfully!');
        } else {
            alert('Failed to create task list.');
        }
        } catch (error) {
        console.error('Error:', error);
        alert('Error creating task list.');
        }
    };

    return (
        
<Box sx={{ p: 3 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Task List
      </Typography>
      {/* Use Grid to display two lists per row */}
      <Grid container spacing={2} justifyContent="center">
        {/* Loop through the tasks and render each date's information */}
        {tasks.map((taskItem, index) => (
          <Grid item xs={12} sm={6} key={taskItem._id}>
            <Box sx={{ mb: 2 }}>
              {/* Date section */}
              <ListItem sx={{ bgcolor: '#f5f5f5', borderRadius: 1 }}>
                <ListItemIcon>
                  <CalendarTodayIcon color="primary" />
                </ListItemIcon>
                <ListItemText
                  primary={`Date: ${taskItem.date}`}
                  primaryTypographyProps={{ fontWeight: 'bold' }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => toggleTasksVisibility(taskItem.date)}
                >
                  {visibleTasks[taskItem.date] ? 'Hide Tasks' : 'Show Tasks'}
                </Button>
              </ListItem>
              <Divider />

              {/* Conditional rendering of the tasks based on visibility */}
              {visibleTasks[taskItem.date] &&
                taskItem.task.map((task, index) => (
                  <ListItem key={index} sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <TaskIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText primary={task} />
                  </ListItem>
                ))}
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
    );
};

export default App;