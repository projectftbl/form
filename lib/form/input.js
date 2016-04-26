import React, { Component, PropTypes } from 'react';
import Input from '../input';

export default class FormInput extends Component {
  render() {
    const { field, readOnly = false, ...rest } = this.props;

    return (
      <Input {...field}
             {...rest}
             readOnly={!this.context.authorized || readOnly}
             error={field.error} 
             touch={field.touched} />
    );
  }
};

FormInput.contextTypes = { authorized: React.PropTypes.bool };
