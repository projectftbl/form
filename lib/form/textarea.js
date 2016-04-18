import React, { Component, PropTypes } from 'react';
import TextArea from '../textarea';

export default class FormTextArea extends Component {
  render() {
    const { field, ...rest } = this.props;

    return (
      <TextArea {...rest}
                {...field}
                error={field.error} 
                touch={field.touched} />
    );
  }
};