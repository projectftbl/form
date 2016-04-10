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

  render() {
    const { 
      value
    , error
    , touch
    , onBlur
    , onChange
    , onFocus
    } = this.props;

    const styles = {
      base: {
        fontFamily: 'inherit'
      , fontSize: '0.8em'
      , fontWeight: 300
      , letterSpacing: 1.5
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
    , error: {
        boxShadow: '0 0 0 1px #db2828'
      , color: '#db2828'
      , ':focus': {
          boxShadow: '0 0 0 2px #db2828'
        } 
      }
    };

    return (
      <input style={[ styles.base, error && touch && styles.error ]}
        ref={this.name()}
        data-test={this.name()}
        type='checkbox'
        value={value} 
        onChange={onChange} 
        onBlur={onBlur}
        onFocus={onFocus}
        data-error={error && touch} />
    );
  }
};

export default props => {
  const { label } = props;

  return (
    <label>
      <Field {...props} /> {label}
    </label>
  );
};
