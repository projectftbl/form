import React, { Component } from 'react';
import Check from '../check';

export default class FormCheck extends Component {
  render() {
    const { field, readOnly = false, ...rest } = this.props;

    return (
      <Check error={field.error} 
             touch={field.touched} 
             readOnly={!this.context.authorized || readOnly}
             {...rest} 
             {...field} />
    );
  }
};

FormCheck.contextTypes = { authorized: React.PropTypes.bool };
