import React, { Component, PropTypes } from 'react';
import Select from '../select';

export default class FormSelect extends Component {
  render() {
    const { 
      label
    , field
    , focus
    , name
    , data
    , children
    , valueProperty
    , displayProperty
    , icon
    , Icon 
    } = this.props;

    return (
      <Select label={label} 
              name={name}
              data={data}
              children={children}
              valueProperty={valueProperty}
              displayProperty={displayProperty}
              focus={focus}
              error={field.error} 
              touch={field.touched} 
              icon={icon}
              Icon={Icon} 
              {...field} />
    );
  }
};