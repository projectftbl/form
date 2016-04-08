import React, { Component, PropTypes } from 'react';
import Input from '../input';

export default class FormInput extends Component {
  render() {
    const { label, field, type = 'text', focus, name, Icon } = this.props;

    return (
      <Input label={label} 
             name={name}
             type={type}
             {...field}
             focus={focus}
             error={field.error} 
             touch={field.touched} 
             Icon={Icon} />
    );
  }
};