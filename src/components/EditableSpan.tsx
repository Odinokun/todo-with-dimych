import { TextField } from '@mui/material';
import { KeyboardEvent, ChangeEvent, FC, useState } from 'react';

interface IProps {
  title: string;
  onChange: (newTitle: string) => void;
}

export const EditableSpan: FC<IProps> = ({ title, onChange }) => {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [titleValue, setTitleValue] = useState<string>('');

  const activateEditMode = () => {
    setTitleValue(title);
    setEditMode(true);
  };

  const activateViewMode = () => {
    setEditMode(false);
    onChange(titleValue.trim());
  };

  const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setTitleValue(e.currentTarget.value);
  };

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      activateViewMode();
    }
  };

  return (
    <>
      {editMode ? (
        <TextField
          value={titleValue}
          onChange={onChangeTitleHandler}
          onBlur={activateViewMode}
          onKeyDown={onKeyPressHandler}
          autoFocus
        />
      ) : (
        <span onDoubleClick={activateEditMode}>{title}</span>
      )}
    </>
  );
};
