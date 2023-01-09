import React, { ChangeEvent, FC, useState } from "react";
import "./App.css";
import styled from "@emotion/styled";

export const Header = styled.h3({
  color: "#333",
  fontWeight: "700",
  fontSize: "15px",
  borderBottom: "2px solid #333",
  padding: "30px 0 10px",
  margin: "0",
  textTransform: "uppercase",
});

export const HiddenLabel = styled.label({
  display: "none",
});

interface ButtonProps {
  isDelete?: false;
}

export const Button = styled.button<ButtonProps>(({ isDelete }) => ({
  outline: "none",
  background: "none",
  border: "0px",
  color: "#888",
  fontSize: "15px",
  width: "60px",
  margin: "10px 0 0",
  fontFamily: "Lato, sans-serif",
  cursor: "pointer",

  "&:hover": {
    color: "#333",
  },
}));

interface ToDoItem {
  id: number;
  value: string;
  isEditMode?: boolean;
  isCompleted?: boolean;
}

interface ToDoItemProps extends Omit<ToDoItem, "id"> {
  toggleEditMode: () => void;
  toggleCompleted: () => void;
}

export const ToDoItem: FC<ToDoItemProps> = ({
  id,
  value,
  isEditMode,
  isCompleted,
}) => {
  return (
    <li className={isEditMode ? "editMode" : ""}>
      <input
        type="checkbox"
        checked={isCompleted}
        onClick={() => console.log("clicked")}
      />
      {isEditMode && <label>{value}</label>}
      {!isEditMode && <input type="text" onChange={() => {}} />}
      <Button
        className="edit"
        onClick={() => {
          toggleEditMode(id);
        }}
      >
        Edit
      </Button>
      <Button onClick={() => {}}>Delete</Button>
    </li>
  );
};

function App() {
  const [newTaskName, setNewTaskName] = useState("");

  const [todos, setTodos] = useState<ToDoItemProps[]>([
    { id: 0, value: "Pay Bills", isEditMode: false, isCompleted: false },
    { id: 1, value: "Learn React", isEditMode: true, isCompleted: false },
  ]);

  const addToDo = (value: string) => {
    setTodos([...todos, { value, id: todos.length }]);
  };

  const toggleEditMode = (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) return { ...todo, isEditMode: !todo.isEditMode };
    });
    setTodos(newTodos);
    return todos;
  };

  return (
    <div className="App">
      <div className="container">
        <Header>Add Item</Header>
        <HiddenLabel htmlFor="new-task">Add Item</HiddenLabel>
        <input
          id="new-task"
          type="text"
          onChange={(e) => setNewTaskName(e.target.value)}
        />
        <Button id="add-button" onClick={() => addToDo(newTaskName)}>
          Add
        </Button>

        <Header>Todo</Header>
        <ul id="incomplete-tasks">
          {todos.map((todo) => {
            <ToDoItem
              {...todo}
              toggleEditMode={() => toggleEditMode(todo.id)}
            />;
          })}
        </ul>

        <Header>Completed</Header>
        <ul id="completed-tasks"></ul>
      </div>
    </div>
  );
}

export default App;
