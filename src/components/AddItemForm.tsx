import { KeyboardEvent, ChangeEvent, FC, useState } from 'react';
import { IconButton, TextField } from '@mui/material';
import { ControlPoint } from '@mui/icons-material';

interface IProps {
  addItem: (title: string) => void;
}

export const AddItemForm: FC<IProps> = ({ addItem }) => {
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
      addItem(newTaskTitle.trim());
      setNewTaskTitle('');
    } else {
      setError('Title is required!!!');
    }
  };

  return (
    <div>
      <TextField
        value={newTaskTitle}
        onChange={onChangeHandler}
        onKeyDown={onKeyPressHandler}
        className={error ? 'error' : ''}
        size='small'
        label='Type your text here'
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addTask} color='primary' size='medium'>
        <ControlPoint />
      </IconButton>
    </div>
  );
};
