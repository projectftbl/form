import React, { Component, PropTypes } from 'react';
import Radium from 'radium';
import color from 'color';

@Radium
export default class Button extends Component {
  render() {
    const { label, kind = 'primary', size = 'normal', disabled = false, colour, onClick, name, Icon, style } = this.props;

    const styles = {
      base: {
        fontFamily: 'inherit'
      , fontWeight: 300
      , letterSpacing: 1
      , cursor: 'pointer'
      , display: 'inline-block'
      , outline: 0
      , border: 'none'
      , backgroundColor: '#e0e1e2'
      , color: color('#000').lighten(0.6).hexString()
      , margin: '0.45em .4em 0 0'
      , borderRadius: 2
      , textShadow: '0 1px 1px rgba(0, 0, 0, 0.2)'
      , userSelect: 'none'
      , clear: 'both'
      , transition: 'all 250ms ease-in'
      , zIndex: 1
      , ':hover': {
          backgroundColor: color('#e0e1e2').darken(0.2).hexString()
        , color: color('#000').lighten(0.8).hexString()
        }
      }
    , primary: {
        backgroundColor: '#2185d0'
      , color: '#fafafa'
      , ':hover': {
          backgroundColor: color('#2185d0').darken(0.2).hexString()
        , color: '#fff'
        }
      }
    , link: {
        backgroundColor: 'transparent'
      , color: '#2185d0'
      , textShadow: 'none'
      , ':hover': {
          backgroundColor: 'transparent'
        , color: color('#2185d0').darken(0.5).hexString()
        }
      }
    , disabled: {
        cursor: 'not-allowed'
      , backgroundColor: '#e0e1e2'
      , color: '#aaa'
      , textShadow: 'none'
      , ':hover': {
          backgroundColor: '#e0e1e2'
        , color: '#aaa'
        }
      }
    , small: {
        fontSize: '1rem'
      , padding: '.5em .7em'
      }
    , normal: {
        fontSize: '1.1rem'
      , padding: '.8em 1.5em'
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

    const disable = disabled || this.context.authorized === false;

    return (
      <div style={{clear: 'both'}}>
        <button style={[ styles.base, styles[kind], styles[size]
                       , disable && styles.disabled, colour && styles.coloured, style ]} 
                onClick={!disable && onClick} data-test={name + '-button'}>
          <div style={{float:'left'}}>{Icon && <Icon allowHover={false} colour={disable ? '#777' : '#fff'}/>}</div>
          <div style={[ Icon && styles.icon]}>{label}</div>
        </button>
      </div>
    );
  }
};

Button.contextTypes = { authorized: React.PropTypes.bool };

