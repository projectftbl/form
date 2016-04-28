import React, { Component, PropTypes } from 'react';
import TextArea from '../textarea';

export default class FormTextArea extends Component {
  render() {
    const { field, readOnly = false, ...rest } = this.props;

    return (
      <TextArea {...rest}
                {...field}
                readOnly={this.context.authorized === false || readOnly}
                error={field.error} 
                touch={field.touched} />
    );
  }
};

FormTextArea.contextTypes = { authorized: React.PropTypes.bool };
