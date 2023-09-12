import { KeyboardEvent, ChangeEvent, useState } from 'react';
import { FilterValuesType, TaskType } from '../App';

type TodolistPropsType = {
  todolistId: string;
  title: string;
  tasks: TaskType[];
  removeTask: (id: string, todolistId: string) => void;
  changeFilter: (value: FilterValuesType, todolistId: string) => void;
  addTask: (title: string, todolistId: string) => void;
  changeTaskStatus: (
    taskId: string,
    isDone: boolean,
    todolistId: string
  ) => void;
  filter: FilterValuesType;
  deleteTodo: (todolistId: string) => void;
};

export const Todolist = (props: TodolistPropsType) => {
  const [newTaskTitle, setNewTaskTitle] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    setError(null);
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const addTask = () => {
    if (newTaskTitle.trim() !== '') {
      props.addTask(newTaskTitle.trim(), props.todolistId);
      setNewTaskTitle('');
    } else {
      setError('Title is required');
    }
  };

  const onAllClickHandler = () => props.changeFilter('all', props.todolistId);
  const onActiveClickHandler = () =>
    props.changeFilter('active', props.todolistId);
  const onCompletedClickHandler = () =>
    props.changeFilter('completed', props.todolistId);

  const deleteTodoHandler = () => {
    props.deleteTodo(props.todolistId);
  };

  return (
    <div>
      <div>
        <span>
          <strong>{props.title}</strong>
        </span>
        <button onClick={deleteTodoHandler}>del</button>
      </div>
      <br />
      <div>
        <input
          value={newTaskTitle}
          onChange={onChangeHandler}
          onKeyDown={onKeyPressHandler}
          className={error ? 'error' : ''}
        />
        <button onClick={addTask}>+</button>
        {error && <div className='error-message'>{error}</div>}
      </div>

      <br />

      <div>
        <button
          className={props.filter === 'all' ? 'active-filter' : ''}
          onClick={onAllClickHandler}
        >
          All
        </button>
        <button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={onActiveClickHandler}
        >
          Active
        </button>
        <button
          className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={onCompletedClickHandler}
        >
          Completed
        </button>
      </div>

      <ul>
        {props.tasks.map(t => {
          const onRemoveHandler = () =>
            props.removeTask(t.id, props.todolistId);

          const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(
              t.id,
              e.currentTarget.checked,
              props.todolistId
            );
          };

          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <button onClick={onRemoveHandler}>del</button>
              <input
                type='checkbox'
                checked={t.isDone}
                onChange={onChangeHandler}
              />
              <span>{t.title}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
