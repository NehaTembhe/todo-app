#To-Do App
A simple To-Do app built with React that allows users to add, manage, and track their tasks. The app includes task categories, the ability to mark tasks as completed, and visual stats with a pie chart to track pending and completed tasks.

Features
Add Tasks: Add new tasks with the option to mark them as "Important" or "Planned."
Task Status: Toggle tasks between completed and pending.
Categories: Filter tasks by views such as All Tasks, Today, Important, Planned, and Assigned to Me.
Pie Chart: A dynamic pie chart to visualize the proportion of pending and completed tasks for today.
Progress Stats: Display the count of pending and completed tasks.
Tech Stack
Frontend: React, React Hooks
Charting: Chart.js, React Chart.js 2
Icons: FontAwesome
CSS: Custom styles with flexbox and responsive design
Installation
Prerequisites
Node.js (version 14 or above)
npm (Node Package Manager)
Steps to Run the App Locally
Clone the repository:

bash
Copy
Edit
git clone https://github.com/yourusername/todo-app.git
Navigate to the project directory:

bash
Copy
Edit
cd todo-app
Install dependencies:

bash
Copy
Edit
npm install
Start the development server:

bash
Copy
Edit
npm start
Open the app in your browser at http://localhost:3000.

Usage
Add a Task: Type in the task description and click "ADD TASK" to add it to the list.
Toggle Task Completion: Click the checkbox next to a task to mark it as completed or pending.
Filter Tasks: Use the sidebar to filter tasks by categories (All Tasks, Today, Important, etc.).
View Stats: Check the pie chart and the stats section to see the breakdown of pending and completed tasks.
Structure
src/: Contains all the app's components, including:
App.js: Main application component, managing state and task logic.
TodayTasks.js: Displays the pie chart and task status for today.
App.css: Custom CSS styling for the app.
Screenshots

Contributing
Feel free to fork the repository and submit pull requests if you have improvements or bug fixes.

License
This project is licensed under the MIT License.
