import React, { Component, PropTypes } from 'react';
import Input from '../input';

export default class FormInput extends Component {
  render() {
    const { field, ...rest } = this.props;

    return (
      <Input {...field}
             {...rest}
             error={field.error} 
             touch={field.touched} />
    );
  }
};