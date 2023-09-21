import { ChangeEvent } from 'react';
import { FilterValuesType, TaskType } from '../App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Button, Checkbox, IconButton, List, ListItem } from '@mui/material';
import { Delete } from '@mui/icons-material';

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
        <IconButton onClick={deleteTodoHandler} color='error'>
          <Delete />
        </IconButton>
      </div>

      <br />

      <AddItemForm addItem={addNewTask} />

      <br />

      <div>
        <Button
          onClick={onAllClickHandler}
          variant={props.filter === 'all' ? 'contained' : 'outlined'}
          color='primary'
        >
          All
        </Button>
        <Button
          className={props.filter === 'active' ? 'active-filter' : ''}
          onClick={onActiveClickHandler}
          variant={props.filter === 'active' ? 'contained' : 'outlined'}
          color='primary'
        >
          Active
        </Button>
        <Button
          className={props.filter === 'completed' ? 'active-filter' : ''}
          onClick={onCompletedClickHandler}
          variant={props.filter === 'completed' ? 'contained' : 'outlined'}
          color='primary'
        >
          Completed
        </Button>
      </div>

      <List>
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
            <ListItem
              disablePadding
              key={t.id}
              className={t.isDone ? 'is-done' : ''}
            >
              <IconButton onClick={onRemoveHandler} color='error'>
                <Delete />
              </IconButton>
              <Checkbox checked={t.isDone} onChange={onChangeStatusHandler} />
              <EditableSpan
                title={t.title}
                onChange={onChangeTaskTitleHandler}
              />
            </ListItem>
          );
        })}
      </List>
    </div>
  );
};
