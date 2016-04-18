import React from 'react';
import Check from '../check';

export default ({ field, ...rest }) => {
  return (
    <Check error={field.error} 
           touch={field.touched} 
           {...rest} 
           {...field} />
  );
};