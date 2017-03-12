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
    const { focus, readOnly } = this.props;

    if (focus && !readOnly) {
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
    , type = 'text'
    , size = 30
    , width = '100%'
    , error
    , touch
    , hasIcon
    , onBlur
    , onChange
    , onFocus
    , onKeyDown
    , active
    , readOnly = false
    , style
    } = this.props;

    const styles = {
      base: {
        fontFamily: 'inherit'
      , fontSize: '0.8em'
      , letterSpacing: 1.2
      , borderRadius: 0
      , border: '1px solid #d9d9d9'
      , background: 'transparent'
      , display: 'block'
      , width
      , paddingTop: '1.2em'
      , paddingBottom: '1.2em'
      , paddingLeft: '1em'
      , paddingRight: '1em'
      , WebkitAppearance: 'none'
      , MozAppearance: 'none'
      , appearance: 'none'
      , transition: 'all 0.2s ease-out'
      , ':focus': {
          outline: 'none'
        , border: '1px solid #d9d9d9'
        , boxShadow: '0 0 5px #d9d9d9'
        }
      }
    , active: {
        paddingTop: label ? '1.6em' : '1.2em'
      , paddingBottom: label ? '0.8em' : '1.2em'
      }
    , error: {
        border: '1px solid #db2828'
      , color: '#db2828'
      , ':focus': {
          border: '1px solid #db2828'
        , boxShadow: '0 0 5px #db2828'
        } 
      }
    , hasIcon: {
        paddingLeft: '3.5em'
      }
    , readOnly: {
        background: '#eee'
      , ':focus': {
          boxShadow: 'none'
        }
      }
    };

    return (
      <input style={[ styles.base
                    , active && styles.active
                    , error && touch && !readOnly && styles.error
                    , hasIcon && styles.hasIcon
                    , readOnly && styles.readOnly
                    , style ]}
        id={this.name()}
        ref={this.name()}
        data-test={this.name()}
        placeholder={label}
        type={type}
        value={value} 
        onChange={onChange} 
        onBlur={onBlur}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        autoCapitalize='off' 
        autoComplete={false}
        spellCheck={false}
        size={size}
        readOnly={readOnly}
        data-error={error && touch} />
    );
  }
};

export default props => {
  const { value, icon, Icon } = props;

  return (
    <Wrapper {...props}>
      <Field {...props} active={value} hasIcon={icon || Icon} />
    </Wrapper>
  );
};
