import React, { Component, PropTypes } from 'react';
import Select from '../select';

export default class FormSelect extends Component {
  render() {
    const { field, ...rest } = this.props;

    return (
      <Select error={field.error} 
              touch={field.touched} 
              {...rest}
              {...field} />
    );
  }
};