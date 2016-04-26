import React, { Component, PropTypes } from 'react';
import Radium from 'radium';

@Radium
export default class Error extends Component {
  name() {
    const { label = '', name } = this.props;

    return (name ? name : label.toLowerCase().replace(' ', '')) + '-error';
  }

  render() {
    const { error, touch, readOnly = false, style } = this.props;

    const styles = {
      base: {
        position: 'absolute'
      , right: '0.8em'
      , top: '1.4em'
      , fontSize: '0.7em'
      , color: '#db2828'
      , opacity: 0
      , transition: 'all 250ms ease-in'
      }
    , show: {
        opacity: 0.95
      }
    };

    return (
      <div data-test={this.name()} style={[ styles.base, error && touch && !readOnly && styles.show, style ]}>
        {!readOnly && error}
      </div>
    );
  }
};