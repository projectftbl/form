import React, { Component, PropTypes } from 'react';
import TextArea from '../textarea';

export default class FormTextArea extends Component {
  render() {
    const { label, field, focus, name, rows, minRows, Icon } = this.props;

    return (
      <TextArea label={label} 
                name={name}
                rows={rows}
                minRows={minRows}
                {...field}
                focus={focus}
                error={field.error} 
                touch={field.touched} 
                Icon={Icon} />
    );
  }
};