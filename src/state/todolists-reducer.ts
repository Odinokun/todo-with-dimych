import { v1 } from 'uuid';
import { FilterValuesType, TodolistType } from '../typings/types';
import {
  ActionsType,
  AddTodolistActionType,
  ChangeTodolistFilterActionType,
  ChangeTodolistTitleActionType,
  RemoveTodolistActionType,
} from '../typings/actions-types';


export const todolistsReducer = (state: TodolistType[] = [], action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST':
      return state.filter(tl => tl.id !== action.id);
    case 'ADD-TODOLIST':
      return [{ id: action.todolistId, title: action.title, filter: 'all' }, ...state];
    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.id ? { ...tl, title: action.title } : tl);
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.id ? { ...tl, filter: action.filter } : tl);
    default:
      return state;
  }
};

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => ({
  type: 'REMOVE-TODOLIST',
  id: todolistId,
});

export const addTodolistAC = (title: string): AddTodolistActionType => ({
  type: 'ADD-TODOLIST',
  title,
  todolistId: v1(),
});

export const changeTodolistTitleAC = (todolistId: string, title: string): ChangeTodolistTitleActionType => ({
  type: 'CHANGE-TODOLIST-TITLE',
  id: todolistId,
  title,
});

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType): ChangeTodolistFilterActionType => ({
  type: 'CHANGE-TODOLIST-FILTER',
  id: todolistId,
  filter,
});
