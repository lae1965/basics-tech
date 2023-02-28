/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { schema } from '../store/schema';

export const useInput = (name, mayBeEmpty = false) => {
  const value = useSelector(schema[name].selector);
  const dispatch = useDispatch();

  const [error, setError] = useState(!mayBeEmpty);

  const onChange = (event) => {
    const newValue = event.target.value;
    dispatch(schema[name].dispatcher(newValue));

    if (mayBeEmpty && !newValue) setError(false);
    else setError(!schema[name].regularExp.test(newValue));
  };

  return {
    bind: { name, value, onChange },
    error,
  };
};
