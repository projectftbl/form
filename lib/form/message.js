import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

const colors = {
  info: '#666'
, warning: '#bf9003'
, error: '#db2828'
};

@Radium
export default class FormInput extends Component {
  render() {
    const { children, name, kind = 'error', Icon, style } = this.props;

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
      <span style={[ styles.base, children && styles.active, style ]} data-test={name}>
        {Icon && <Icon colour={colors[kind]} />}
        {children}
      </span>
    );
  }
};