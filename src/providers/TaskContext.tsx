import type { Task } from "../types/task";
import { useState, createContext, useContext, useEffect } from "react";

type TaskListContext = {
  taskList: Task[];
  addTask: (task: Task) => void;
  setTaskList: React.Dispatch<React.SetStateAction<Task[]>>;
};
const TaskContext = createContext<TaskListContext | undefined>(undefined);

export const useTaskList = (): TaskListContext => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw Error("Invalid use of TaskList context");
  }
  return context;
};

export const TaskListProvider = ({
  children,
}: { children: React.ReactNode }) => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  //* If you update state that uses the previous state values, make sure to do it like so:
  //* setTaskList((prevList) => [...prevList, task])
  //* using the previous state values will ensure it behaves properly
  const addTask = (task: Task) => {
    setTaskList([...taskList, task]);
  };

  return (
    <TaskContext.Provider value={{ taskList, addTask, setTaskList }}>
      {children}
    </TaskContext.Provider>
  );
};
