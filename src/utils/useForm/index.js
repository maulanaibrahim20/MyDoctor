import {useState} from 'react';

export const useForm = initialValue => {
  const [values, setValues] = useState(initialValue);
  return [
    values,
    (formType, formValue) => {
      if (formType === 'reset') {
        return initialValue;
      }
      return setValues({...values, [formType]: formValue});
    },
  ];
};
