import { useState } from 'react';
import { v1 } from 'uuid';
import { Todolist } from './components/Todolist';
import './App.css';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
    { id: v1(), title: 'Rest API', isDone: false },
    { id: v1(), title: 'GraphQL', isDone: false },
  ]);
  const [filter, setFilter] = useState<FilterValuesType>('all');

  const removeTask = (id: string) => setTasks(tasks.filter(t => t.id !== id));

  let tasksForTodolist = tasks;
  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => !t.isDone);
  } else if (filter === 'completed') {
    tasksForTodolist = tasks.filter(t => t.isDone);
  }

  const changeFilter = (value: FilterValuesType) => setFilter(value);

  const addTask = (title: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    setTasks([newTask, ...tasks]);
  };

  function changeStatus(taskId: string, isDone: boolean) {
    setTasks(tasks.map(t => (t.id === taskId ? { ...t, isDone } : t)));
  }

  return (
    <div className='App'>
      <Todolist
        title='What to learn'
        tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeStatus}
        filter={filter}
      />
    </div>
  );
}

export default App;
