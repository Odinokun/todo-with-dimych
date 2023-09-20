import { KeyboardEvent, ChangeEvent, FC, useState } from 'react';

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
      setError('Title is required');
    }
  };

  return (
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
  );
};
