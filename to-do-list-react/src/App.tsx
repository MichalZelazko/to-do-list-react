import React, { ChangeEvent, ChangeEventHandler, FC, useState } from "react";
import "./App.css";
import styled from "@emotion/styled";

export const Header = styled.h3({
  color: "#333",
  fontWeight: "700",
  fontSize: "15px",
  borderBottom: "2px solid #333",
  padding: "30px 0 10px",
  margin: "0 0 10px 0",
  textTransform: "uppercase",
});

export const HiddenLabel = styled.label({
  display: "none",
});

interface ButtonProps {
  isDelete?: boolean;
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

  "&[isDelete]": {
    color: "#f00",
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
  handleDelete: () => void;
  updateName: (newTaskName: string) => void;
}

export const ToDoItem: FC<ToDoItemProps> = ({
  //  id,
  value,
  isEditMode,
  isCompleted,
  toggleEditMode,
  toggleCompleted,
  handleDelete,
  updateName,
}) => {
  return (
    <li className={isEditMode ? "editMode" : ""}>
      <input type="checkbox" checked={isCompleted} onClick={toggleCompleted} />
      {!isEditMode && <label>{value}</label>}
      {isEditMode && (
        <input
          type="text"
          value={value}
          onChange={(e) => updateName(e.target.value)}
        />
      )}
      <Button className="edit" onClick={toggleEditMode}>
        Edit
      </Button>
      <Button onClick={handleDelete} isDelete>
        Delete
      </Button>
    </li>
  );
};

function App() {
  const [newTaskName, setNewTaskName] = useState("");

  const [todos, setTodos] = useState<ToDoItem[]>([
    { id: 0, value: "Pay Bills", isEditMode: false, isCompleted: false },
    { id: 1, value: "Learn React", isEditMode: true, isCompleted: false },
  ]);

  const addToDo = (value: string) => {
    setTodos([...todos, { value, id: todos.length }]);
  };

  const toggleEditMode = (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) return { ...todo, isEditMode: !todo.isEditMode };
      return todo;
    });
    setTodos(newTodos);
  };

  const toggleCompleted = (id: number) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) return { ...todo, isCompleted: !todo.isCompleted };
      return todo;
    });
    setTodos(newTodos);
  };

  const handleDelete = (id: number) => {
    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  };

  const updateName = (id: number) => (newTaskName: string) => {
    const newTodos = todos.map((todo) => {
      if (todo.id === id) return { ...todo, value: newTaskName };
      return todo;
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
            if (!todo.isCompleted) {
              return (
                <ToDoItem
                  key={todo.id}
                  {...todo}
                  toggleEditMode={() => toggleEditMode(todo.id)}
                  toggleCompleted={() => toggleCompleted(todo.id)}
                  handleDelete={() => handleDelete(todo.id)}
                  updateName={updateName(todo.id)}
                />
              );
            }
          })}
        </ul>

        <Header>Completed</Header>
        <ul id="completed-tasks">
          {todos.map((todo) => {
            if (todo.isCompleted) {
              return (
                <ToDoItem
                  key={todo.id}
                  {...todo}
                  toggleEditMode={() => toggleEditMode(todo.id)}
                  toggleCompleted={() => toggleCompleted(todo.id)}
                  handleDelete={() => handleDelete(todo.id)}
                  updateName={updateName(todo.id)}
                />
              );
            }
          })}
        </ul>
      </div>
    </div>
  );
}

export default App;
