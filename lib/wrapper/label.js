import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class Label extends Component {
  name() {
    const { text = '', name } = this.props;

    return (name ? name : text.toLowerCase().replace(' ', ''));
  }

  render() {
    const { text, active, hasIcon, name, hasError } = this.props;

    const styles = {
      base: {
        fontSize: '0.8em'
      , color: '#999'
      , position: 'absolute'
      , top: 0
      , letterSpacing: 1.2
      , width: 'auto'
      , whiteSpace: 'nowrap'
      , opacity: 0
      , paddingTop: '1.2em'
      , paddingBottom: 0
      , paddingLeft: '1em'
      , paddingRight: '1em'
      , transition: 'all 0.2s ease-out'
      , pointerEvents: 'none'
      }
    , active: {
        display: 'block'
      , opacity: 1
      , paddingTop: '0.5em'
      }
    , icon: {
        paddingLeft: '3.5em'
      }
    };

    return (
      <label 
        onClick={_ => alert(arguments)}
        htmlFor={this.name()} 
        data-test={this.name() + '-label'} 
        style={[ styles.base, active && styles.active, hasIcon && styles.icon ]}>
        {text}
      </label>
    );
  }
};