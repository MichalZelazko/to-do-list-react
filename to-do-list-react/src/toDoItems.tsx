import { FC } from "react";

const BIN_ID = "63a345d415ab31599e220246" as const;
const X_ACCESS_KEY =
  "$2b$10$NCZOay8d2osjOwm1YCOPuORo2h/gSRzM.KhsRRpYlcArnA4/yPUaK" as const;

export interface IToDoItem {
  name: string;
  isCompleted: boolean;
  isEditMode?: boolean;
}

export const toDoItem: FC<IToDoItem> = ({ name }) => {
  return (
    <li>
      <input type="checkbox" />
      <label>{name}</label>
      <input type="text" />
      <button className="edit">Edit</button>
      <button className="delete">Delete</button>
    </li>
  );
};

export const fetchTasks = async () => {
  const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    headers: {
      "X-Access-Key": X_ACCESS_KEY,
    },
  }).then(async (res) => await res.json());
  console.log(response.record);
  return response.record as IToDoItem[];
};

export const updateTasks = async (toDoItems: IToDoItem[]) => {
  const response = await fetch(`https://api.jsonbin.io/v3/b/${BIN_ID}`, {
    method: "PUT",
    headers: {
      "X-Access-Key": X_ACCESS_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(toDoItems),
  }).then(async (res) => await res.json());
  console.log(response.record);
};
