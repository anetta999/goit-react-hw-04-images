import {
  BtnLabel,
  Form,
  Input,
  StyledSearchbar,
  SubmitBtn,
} from './Searchbar.style';
import toast from 'react-hot-toast';
import React, { useState } from 'react';

export const Searchbar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  // Записуємо значення інпута в стейт форми
  const handleInputChange = evt => {
    setValue(evt.currentTarget.value);
  };

  // Сабмітимо форму: переносимо значення інпута в стейт App
  const handleSubmit = evt => {
    evt.preventDefault();

    if (!value.trim()) {
      toast.error('Searchfield cannot be empty, please enter some text', {
        duration: 3000,
      });

      return;
    }

    onSubmit(value);
    setValue('');
  };

  return (
    <StyledSearchbar>
      <Form onSubmit={handleSubmit}>
        <SubmitBtn type="submit">
          <BtnLabel>Search</BtnLabel>
        </SubmitBtn>

        <Input
          className="input"
          type="text"
          value={value}
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleInputChange}
        />
      </Form>
    </StyledSearchbar>
  );
};
