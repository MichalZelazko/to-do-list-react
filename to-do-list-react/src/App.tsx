import { ChangeEvent, FC, useState } from "react";
import "./App.css";

interface IToDoItem {
  name: string;
  isCompleted: boolean;
  isEditMode?: boolean;
}

const ToDoItem: FC<IToDoItem> = ({ name, isCompleted, isEditMode }) => {
  return (
    <li className={isEditMode ? "editMode" : ""}>
      <input
        type="checkbox"
        checked={isCompleted}
        onClick={() => console.log("clicked")}
      />
      <label>{name}</label>
      <input type="text" />
      <button className="edit" onClick={() => console.log("clicked")}>
        Edit
      </button>
      <button className="delete" onClick={() => console.log("clicked")}>
        Delete
      </button>
    </li>
  );
};

function App() {
  const [newTaskName, setNewTaskName] = useState("");

  const handleNewTaskName = (event: KeyboardEvent<HTMLInputElement>) => {
    setNewTaskName(event.target.value);
  };

  const [toDoItems, setToDoItems] = useState([
    { name: "Go shopping", isCompleted: false, isEditMode: false },
    { name: "Learn React", isCompleted: false, isEditMode: false },
  ]);

  const addNewTask = (newTaskName: string) => {
    setToDoItems([
      ...toDoItems,
      { name: newTaskName, isCompleted: false, isEditMode: false },
    ]);
  };

  return (
    <div className="App">
      <div className="container">
        <p>
          <label htmlFor="new-task">Add Item</label>
          <input id="new-task" type="text" onChange={handleNewTaskName} />
          <button id="add-button" onClick={() => addNewTask(newTaskName)}>
            Add
          </button>
        </p>

        <h3>Todo</h3>
        <ul id="incomplete-tasks">
          {toDoItems.map(({ name, isCompleted, isEditMode }) => (
            <ToDoItem
              key={name}
              name={name}
              isCompleted={isCompleted}
              isEditMode={isEditMode}
            />
          ))}
        </ul>

        <h3>Completed</h3>
        <ul id="completed-tasks"></ul>
      </div>
    </div>
  );
}

export default App;
