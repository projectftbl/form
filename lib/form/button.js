import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import color from 'color';

@Radium
export default class Button extends Component {
  onClick(e) {
    const { disabled, onClick } = this.props;
    if (!disabled) onClick(e);
  }

  render() {
    const { label, kind = 'primary', disabled = false, colour, onClick, name, Icon } = this.props;

    const styles = {
      base: {
        fontFamily: 'inherit'
      , fontSize: '1.1rem'
      , fontWeight: 300
      , letterSpacing: 1.5
      , cursor: 'pointer'
      , display: 'inline-block'
      , outline: 0
      , border: 'none'
      , backgroundColor: '#e0e1e2'
      , color: color('#000').lighten(0.6).hexString()
      , margin: '0.45em .25em 0 0'
      , padding: '.8em 1.5em'
      , borderRadius: 3
      , userSelect: 'none'
      , transition: 'all 250ms ease-in'
      , ':hover': {
          backgroundColor: color('#e0e1e2').darken(0.1).hexString()
        , color: color('#000').lighten(0.8).hexString()
        }
      }
    , primary: {
        backgroundColor: '#2185d0'
      , color: '#fafafa'
      , ':hover': {
          backgroundColor: color('#2185d0').darken(0.1).hexString()
        , color: '#fff'
        }
      }
    , link: {
        backgroundColor: 'transparent'
      , color: '#2185d0'
      , ':hover': {
          backgroundColor: 'transparent'
        , color: color('#2185d0').darken(0.5).hexString()
        }
      }
    , disabled: {
        cursor: 'default'
      , backgroundColor: '#e0e1e2'
      , color: '#aaa'
      , ':hover': {
          backgroundColor: '#e0e1e2'
        , color: '#aaa'
        }
      }
    , icon: {
        margin: '3px 0 0 10px'
      , verticalAlign: 'top'
      , float: 'left'
      }
    , coloured: {
        backgroundColor: colour
      , ':hover': {
          backgroundColor: color(colour).darken(0.1).hexString()
        }
      }
    };

    return (
      <button style={[ styles.base, styles[kind], disabled && styles.disabled, colour && styles.coloured ]} 
              onClick={this.onClick.bind(this)} data-test={name + '-button'}>
        <div style={{float:'left'}}>{Icon && <Icon allowHover={false} colour={disabled ? '#777' : '#fff'}/>}</div>
        <div style={[ Icon && styles.icon]}>{label}</div>
      </button>
    );
  }
};


        
