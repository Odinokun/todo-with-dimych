import { ChangeEvent } from 'react';
import { FilterValuesType, TaskType } from '../App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

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
  changeTodoTitle: (id: string, newTitle: string) => void;
  changeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
};

export const Todolist = (props: TodolistPropsType) => {
  const onAllClickHandler = () => props.changeFilter('all', props.todolistId);
  const onActiveClickHandler = () =>
    props.changeFilter('active', props.todolistId);
  const onCompletedClickHandler = () =>
    props.changeFilter('completed', props.todolistId);

  const deleteTodoHandler = () => {
    props.deleteTodo(props.todolistId);
  };

  const addNewTask = (title: string) => {
    props.addTask(title, props.todolistId);
  };

  const changeTodoTitle = (newTitle: string) => {
    props.changeTodoTitle(props.todolistId, newTitle);
  };

  return (
    <div>
      <div>
        <strong>
          <EditableSpan title={props.title} onChange={changeTodoTitle} />
        </strong>
        <button onClick={deleteTodoHandler}>del</button>
      </div>

      <br />

      <AddItemForm addItem={addNewTask} />

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

          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeTaskStatus(
              t.id,
              e.currentTarget.checked,
              props.todolistId
            );
          };

          const onChangeTaskTitleHandler = (newTitle: string) => {
            props.changeTaskTitle(t.id, newTitle, props.todolistId);
          };

          return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
              <button onClick={onRemoveHandler}>del</button>
              <input
                type='checkbox'
                checked={t.isDone}
                onChange={onChangeStatusHandler}
              />
              <EditableSpan
                title={t.title}
                onChange={onChangeTaskTitleHandler}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
