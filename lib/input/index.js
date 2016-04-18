import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import Wrapper from '../wrapper';

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
    , type
    , size = 30
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
      , letterSpacing: 1.2
      , borderRadius: 0
      , border: 'none'
      , boxShadow: '0 0 0 1px #d9d9d9'
      , background: 'transparent'
      , display: 'block'
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
        paddingLeft: '3.5em'
      }
    };

    return (
      <input style={[ styles.base, active && styles.active, error && touch && styles.error, hasIcon && styles.hasIcon ]}
        id={this.name()}
        ref={this.name()}
        data-test={this.name()}
        placeholder={label}
        type={type}
        value={value} 
        onChange={onChange} 
        onBlur={onBlur}
        onFocus={onFocus}
        autoCapitalize='off' 
        autoComplete={false}
        spellCheck={false}
        size={size}
        data-error={error && touch} />
    );
  }
};

export default props => {
  const { value, error, icon, Icon } = props;

  return (
    <Wrapper {...props}>
      <Field {...props} active={value} hasIcon={icon || Icon} />
    </Wrapper>
  );
};
