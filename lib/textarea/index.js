import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import TextArea from 'react-textarea-autosize';
import Label from '../input/label';
import Error from '../input/error';

@Radium
export class Field extends Component {
  name() {
    const { label = '', name } = this.props;

    return name ? name : label.toLowerCase().replace(' ', '')
  }

  shouldFocus() {
    const { focus } = this.props;

    if (focus) {
      ReactDOM.findDOMNode(this.refs[this.name()]).focus();
    }
  }

  componentDidMount() {
    this.shouldFocus();
  }

  render() {
    const { 
      value
    , label
    , rows = 6
    , cols
    , error
    , touch
    , hasIcon
    , onBlur
    , onChange
    , onFocus
    , active
    } = this.props;

    const styles = {
      base: {
        fontFamily: 'inherit'
      , fontSize: '0.8em'
      , fontWeight: 300
      , letterSpacing: 1.5
      , borderRadius: 0
      , border: 'none'
      , resize: 'none'
      , boxShadow: '0 0 0 1px #d9d9d9'
      , background: 'transparent'
      , display: 'block'
      , overflow: 'auto'
      , width: '100%'
      , paddingTop: '1.2em'
      , paddingBottom: '1.2em'
      , paddingLeft: '1em'
      , paddingRight: '1em'
      , transition: 'all 0.2s ease-out'
      , ':focus': {
          outline: 'none'
        , boxShadow: '0 0 0 2px #ccc'
        } 
      }
    , active: {
        paddingTop: '1.6em'
      , paddingBottom: '0.8em'
      }
    , error: {
        boxShadow: '0 0 0 1px #db2828'
      , color: '#db2828'
      , ':focus': {
          boxShadow: '0 0 0 2px #db2828'
        } 
      }
    , hasIcon: {
        paddingLeft: '3em'
      }
    };

    return (
      <TextArea style={[ styles.base, active && styles.active, error && touch && styles.error, hasIcon && styles.hasIcon ]}
        ref={this.name()}
        data-test={this.name()}
        placeholder={label}
        onChange={this.onChange} 
        onBlur={onBlur}
        onFocus={onFocus}
        autoCapitalize='off' 
        autoComplete={false}
        spellCheck={false}
        rows={rows}
        cols={cols}
        data-error={error && touch}>
        {value}
      </TextArea>
    );
  }
};

@Radium
export default class Input extends Component {
  render() {
    const { label, value, error, touch, name, Icon } = this.props;

    const styles = {
      base: {
        width: '100%'
      , float: 'left'
      , position: 'relative'
      , backgroundColor: '#fff'
      , marginBottom: '0.9em'
      }
    , wrapper: {
        position: 'relative'
      }
    , icon: {
        position: 'absolute'
      , float: 'left'
      , left: '0.7em'
      , top: '0.8em'
      }
    };

    const colour = error && touch ? '#db2828' : undefined;

    return (
      <div style={styles.base}>
        <div style={styles.wrapper}>
          {Icon && <Icon style={styles.icon} colour={colour} />}
          <Label text={label} error={error} touch={touch} active={value} hasIcon={Icon} name={name} />
          <Field {...this.props} active={value} hasIcon={Icon} name={name} label={label} />
        </div>
        <Error error={error} touch={touch} name={name} label={label} style={{top:'0.5em'}} />
      </div>
    );
  }
};