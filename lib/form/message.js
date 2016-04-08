import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

const colors = {
  info: '#4d8796'
, warning: '#fbbd08'
, error: '#a95252'
};

@Radium
export default class FormInput extends Component {
  render() {
    const { children, name, kind = 'error' } = this.props;

    const styles = {
      base: {
        paddingLeft: 20
      , opacity: 0
      , transition: 'all 250ms ease-in'
      , color: colors[kind]
      }
    , active: {
        opacity: 1
      }
    };

    return (
      <span style={[ styles.base, children && styles.active ]} data-test={name}>{children}</span>
    );
  }
};