import { useState } from 'react';
import { v1 } from 'uuid';
import { Todolist } from './components/Todolist';
import './App.css';
import { AddItemForm } from './components/AddItemForm';

type TodolistType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};
type TasksStateType = {
  [key: string]: Array<TaskType>;
};
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type FilterValuesType = 'all' | 'active' | 'completed';

function App() {
  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'active' },
  ]);

  const [tasksObj, setTasksObj] = useState<TasksStateType>({
    [todolistId1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
      { id: v1(), title: 'Rest API', isDone: false },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
    [todolistId2]: [
      { id: v1(), title: 'Book', isDone: false },
      { id: v1(), title: 'Milk', isDone: true },
      { id: v1(), title: 'Bread', isDone: false },
      { id: v1(), title: 'Water', isDone: true },
      { id: v1(), title: 'Fruits', isDone: true },
      { id: v1(), title: 'Meat', isDone: true },
      { id: v1(), title: 'Sugar', isDone: false },
    ],
  });

  const removeTask = (id: string, todolistId: string) => {
    setTasksObj({
      ...tasksObj,
      [todolistId]: tasksObj[todolistId].filter(t => t.id !== id),
    });
  };

  const changeFilter = (value: FilterValuesType, todolistId: string) => {
    setTodolists(
      todolists.map(tl =>
        tl.id === todolistId ? { ...tl, filter: value } : tl
      )
    );
  };

  const addTask = (title: string, todolistId: string) => {
    const newTask: TaskType = {
      id: v1(),
      title,
      isDone: false,
    };
    setTasksObj({
      ...tasksObj,
      [todolistId]: [newTask, ...tasksObj[todolistId]],
    });
  };

  const changeStatus = (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => {
    setTasksObj({
      ...tasksObj,
      [todolistId]: tasksObj[todolistId].map(task =>
        task.id === taskId ? { ...task, isDone } : task
      ),
    });
  };

  const deleteTodo = (todolistId: string) => {
    setTodolists(todolists.filter(tl => tl.id !== todolistId));
    delete tasksObj[todolistId];
  };

  const createNewTodolist = (title: string) => {
    const newTodo: TodolistType = {
      id: v1(),
      title,
      filter: 'all',
    };
    setTodolists([newTodo, ...todolists]);
    setTasksObj({ ...tasksObj, [newTodo.id]: [] });
  };

  const changeTodoTitle = (id: string, newTitle: string) => {
    setTodolists(
      todolists.map(tl => (tl.id === id ? { ...tl, title: newTitle } : tl))
    );
  };

  const changeTaskTitle = (
    id: string,
    newTitle: string,
    todolistId: string
  ) => {
    setTasksObj({
      ...tasksObj,
      [todolistId]: tasksObj[todolistId].map(task =>
        task.id === id ? { ...task, title: newTitle } : task
      ),
    });
  };

  return (
    <div className='App'>
      <AddItemForm addItem={createNewTodolist} />
      {todolists.map(tl => {
        let tasksForTodolist = tasksObj[tl.id];
        if (tl.filter === 'active') {
          tasksForTodolist = tasksObj[tl.id].filter(t => !t.isDone);
        } else if (tl.filter === 'completed') {
          tasksForTodolist = tasksObj[tl.id].filter(t => t.isDone);
        }
        return (
          <Todolist
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            deleteTodo={deleteTodo}
            changeTodoTitle={changeTodoTitle}
            changeTaskTitle={changeTaskTitle}
          />
        );
      })}
    </div>
  );
}

export default App;
