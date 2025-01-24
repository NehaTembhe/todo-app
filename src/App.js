import React, { useState } from 'react';
import './App.css';
import {
  faSearch,
  faBell,
  faCalendarAlt,
  faHome,
  faCalendarDay,
  faStar,
  faList,
  faUser,
  faPlus,
  faSync, faStickyNote
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { Chart as ChartJS, ArcElement } from 'chart.js';
import DatePicker from 'react-datepicker'; // Importing react-datepicker
import "react-datepicker/dist/react-datepicker.css"; // Import the styles
import TodayTasks from './Components/TodayTasks'; // Assuming TodayTasks is in components/TodayTasks.js

ChartJS.register(ArcElement);
library.add(fas);

function App() {
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Buy groceries', completed: false },
    { id: 2, title: 'Finish project report', completed: false },
    { id: 3, title: 'Call the bank', completed: false },
    { id: 4, title: 'Schedule dentist appointment', completed: false, priority: 'high' },
    { id: 5, title: 'Plan weekend trip', completed: false, priority: 'medium' },
    { id: 6, title: 'Read a book', completed: true },
    { id: 7, title: 'Clean the house', completed: true },
    { id: 8, title: 'Prepare presentation', completed: true },
    { id: 9, title: 'Update blog', completed: true },
  ]);

  const [newTask, setNewTask] = useState('');
  const [selectedView, setSelectedView] = useState('All Tasks'); // Added state for selected view
  const [isBellDropdownOpen, setIsBellDropdownOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const [dueDate, setDueDate] = useState(null); // State to store due date

  const handleTaskChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleAddTask = () => {
    if (newTask.trim() === '') return;

    const newTaskObj = {
      id: Date.now(),
      title: newTask,
      completed: false,
      priority: '', 
      dueDate: dueDate, // Add the due date when the task is created
    };

    setTasks([...tasks, newTaskObj]);
    setNewTask('');
    setDueDate(null); // Reset the due date after task creation
  };

  const handleToggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const togglePriority = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              priority: task.priority === 'high' ? 'medium' : task.priority === 'medium' ? 'low' : 'high',
            }
          : task
      )
    );
  };

  const filteredTasks = () => {
    switch (selectedView) {
      case 'Today':
        return tasks; // Placeholder for today's tasks logic
      case 'Important':
        return tasks.filter((task) => task.priority === 'high');
      case 'Planned':
        return tasks; // Placeholder for planned tasks logic
      case 'Assigned to me':
        return tasks; // Placeholder for assigned tasks logic
      default:
        return tasks;
    }
  };

  // Calculate pending tasks and total tasks
  const pendingTasks = filteredTasks().filter((task) => !task.completed).length;
  const totalTasks = tasks.length;

  const handleToggleDropdown = () => {
    setIsBellDropdownOpen(!isBellDropdownOpen);
    setSelectedTaskId(null); 
  };
  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <button
      className="custom-date-picker-btn"
      onClick={onClick}
      ref={ref}
      style={{
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '18px',
      }}
    >
      <FontAwesomeIcon  />
    </button>
  ));


  return (
    <div className="app-container">
      <aside className="sidebar">
        <div className="sidebar-header">
          <img src="./logo192.png" alt="Doit Logo" />
          <h1>Do It</h1>
        </div>

        <div className="user-profile">
          <img src="image copy.png" alt="Profile" />
          <span>Hey, ABCD</span>
        </div>
        <nav>
          <ul>
            <li onClick={() => setSelectedView('All Tasks')}>
              <FontAwesomeIcon icon={faHome} />
              <span>All Tasks</span>
            </li>
            <li onClick={() => setSelectedView('Today')}>
              <FontAwesomeIcon icon={faCalendarDay} />
              <span>Today</span>
            </li>
            <li onClick={() => setSelectedView('Important')}>
              <FontAwesomeIcon icon={faStar} />
              <span>Important</span>
            </li>
            <li onClick={() => setSelectedView('Planned')}>
              <FontAwesomeIcon icon={faList} />
              <span>Planned</span>
            </li>
            <li onClick={() => setSelectedView('Assigned to me')}>
              <FontAwesomeIcon icon={faUser} />
              <span>Assigned to me</span>
            </li>
          </ul>
        </nav>
        <button className="add-list-btn">
          <FontAwesomeIcon icon={faPlus} />
          Add List
        </button>

        <TodayTasks pendingTasks={pendingTasks} totalTasks={totalTasks} />
      </aside>

      <main>
        <div className="header">
          <div className="to-do">To Do</div>
          <div className="actions">
            <FontAwesomeIcon icon={faSearch} />
            <FontAwesomeIcon
              icon={faBell}
              className="navbar-icon"
              onClick={handleToggleDropdown}
            />
            {isBellDropdownOpen && (
              <div className="bell-dropdown">
                <ul>
                  {selectedTaskId && (
                    <li className="selected-task"> 
                      <input 
                        type="checkbox" 
                        checked={tasks.find((task) => task.id === selectedTaskId)?.completed || false} 
                        onChange={() => handleToggleComplete(selectedTaskId)} 
                      /> 
                      <span>{tasks.find((task) => task.id === selectedTaskId)?.title}</span> 
                      <span 
                        className={`priority-icon ${
                          tasks.find((task) => task.id === selectedTaskId)?.priority === 'high' 
                            ? 'high-priority' 
                            : tasks.find((task) => task.id === selectedTaskId)?.priority === 'medium' 
                              ? 'medium-priority' 
                              : '' 
                        }`} 
                        onClick={() => togglePriority(selectedTaskId)} 
                      > 
                        {tasks.find((task) => task.id === selectedTaskId)?.priority === 'high' ? '★' : '☆'} 
                      </span> 
                    </li> 
                  )}
                  <li
                    onClick={() => {
                      if (selectedTaskId) {
                        // Logic to add a step to the selected task
                        console.log(`Adding step to task with ID: ${selectedTaskId}`);
                        // Clear selected task after adding step
                        setSelectedTaskId(null);
                      } else {
                        alert('Please select a task first.');
                      }
                    }}
                  ><li>
                  <FontAwesomeIcon icon={faPlus} /> Add Step
                </li>
                <li>
                  <FontAwesomeIcon icon={faBell} /> Set Reminder
                </li>
                <li>
                <FontAwesomeIcon icon={faCalendarAlt} /> Add Due Date
                    <DatePicker
                      selected={dueDate}
                      onChange={(date) => setDueDate(date)}
                      customInput={<CustomInput />}
                    />
                <li>
                  <FontAwesomeIcon icon={faSync} /> Repeat
                </li>
                <li>
                  <FontAwesomeIcon icon={faStickyNote} /> Add Notes
                </li>
                </li>
                </li>
                </ul>
              </div>
            )}
            <FontAwesomeIcon icon={faCalendarAlt} />
          </div>
        </div>

        <div className="task-input">
          <input
            type="text"
            placeholder="Add a Task"
            value={newTask}
            onChange={handleTaskChange}
          />
          <button onClick={handleAddTask} disabled={newTask.trim() === ''}>
            ADD TASK
          </button>
        </div>

        <div className="task-list-container">
          <div className="task-list">
            <h2>To Do</h2>
            <ul>
              {filteredTasks()
                .filter((task) => !task.completed)
                .map((task) => (
                  <li
                    key={task.id}
                    className={`task-item ${task.completed ? 'completed' : ''} ${
                      selectedTaskId === task.id ? 'selected' : ''
                    }`}
                    onClick={() => setSelectedTaskId(task.id)}
                  >
                    <div>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleComplete(task.id)}
                      />
                      <span>{task.title}</span>
                    </div>
                    <span
                      className={`priority-icon ${
                        task.priority === 'high'
                          ? 'high-priority'
                          : task.priority === 'medium'
                          ? 'medium-priority'
                          : ''
                      }`}
                      onClick={() => togglePriority(task.id)}
                    >
                      {task.priority === 'high' ? '★' : '☆'}
                    </span>
                  </li>
                ))}
            </ul>
          </div>

          <div className="task-list">
            <h2>Completed</h2>
            <ul>
  {tasks
    .filter((task) => task.completed)
    .map((task) => (
      <li
        key={task.id}
        className={`task-item ${task.completed ? 'completed' : ''}`}
      >
        <div>
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => handleToggleComplete(task.id)}
          />
          <span>{task.title}</span>
        </div>
        <span
          className={`priority-icon ${
            task.priority === 'high'
              ? 'high-priority'
              : task.priority === 'medium'
              ? 'medium-priority'
              : ''
          }`}
          onClick={() => togglePriority(task.id)}
        >
          {task.priority === 'high' ? '★' : '☆'}
        </span>
      </li>
    ))}
</ul>

          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
