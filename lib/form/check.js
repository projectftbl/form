import React from 'react';
import Check from '../check';

export default ({ label, field, name }) => {
  return (
    <Check label={label} 
           name={name}
           error={field.error} 
           touch={field.touched} 
           {...field} />
  );
};