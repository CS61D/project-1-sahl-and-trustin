import type { Task } from "../types/task";
import { useState, createContext, useContext, useEffect } from "react";

type TaskListContext = {
  taskList: Task[];
  addTask: (task: Task) => void;
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
}: {
  children: React.ReactNode;
}) => {
  const [taskList, setTaskList] = useState<Task[]>([]);

  const addTask = (task: Task) => {
    setTaskList([...taskList, task]);
  };

  return (
    <TaskContext.Provider value={{ taskList, addTask }}>
      {children}
    </TaskContext.Provider>
  );
};
