import { KeyboardEvent, ChangeEvent, useState } from 'react';
import { FilterValuesType, TaskType } from '../App';

type TodolistPropsType = {
  title: string;
  tasks: TaskType[];
  removeTask: (id: string) => void;
  changeFilter: (value: FilterValuesType) => void;
  addTask: (title: string) => void;
};

export const Todolist = (props: TodolistPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle.trim());
      setNewTaskTitle('');
    }
  };

  const onAllClickHandler = () => props.changeFilter('all');
  const onActiveClickHandler = () => props.changeFilter('active');
  const onCompletedClickHandler = () => props.changeFilter('completed');

  return (
    <div>
      <h3>{props.title}</h3>
      <div>
        <input
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyDown={onKeyPressHandler}
        />
        <button onClick={addTask}>+</button>
      </div>

      <ul>
        {props.tasks.map(t => {
          const onRemoveHandler = () => props.removeTask(t.id);
          return (
            <li key={t.id}>
              <button onClick={onRemoveHandler}>del</button>
              <input type='checkbox' checked={t.isDone} />
              <span>{t.title}</span>
            </li>
          );
        })}
      </ul>

      <div>
        <button onClick={onAllClickHandler}>All</button>
        <button onClick={onActiveClickHandler}>Active</button>
        <button onClick={onCompletedClickHandler}>Completed</button>
      </div>
    </div>
  );
};
