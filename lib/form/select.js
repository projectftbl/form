import React, { Component, PropTypes } from 'react';
import Select from '../select';

export default class FormSelect extends Component {
  render() {
    const { field, readOnly = false, ...rest } = this.props;

    return (
      <Select error={field.error} 
              touch={field.touched} 
              readOnly={!this.context.authorized || readOnly}
              {...rest}
              {...field} />
    );
  }
};

FormSelect.contextTypes = { authorized: React.PropTypes.bool };
