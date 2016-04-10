import React from 'react';
import Radium from 'radium';

const DEFAULT_COLOUR = '#4183c4';

const Field = Radium(props => {

  const { 
    value
  , name
  , error
  , touch
  , onBlur
  , onChange
  , onFocus
  } = props;

  const styles = {
    base: {
      visibility: 'hidden'
    }
  };

  return (
    <input style={[ styles.base ]}
      ref={name}
      id={name}
      data-test={name}
      type='checkbox'
      value={value} 
      onChange={onChange} 
      onBlur={onBlur}
      onFocus={onFocus}
      data-error={error && touch} />
  );
});

const Mark = Radium(({ value, colour = DEFAULT_COLOUR, error, touch }) => {
  const styles = {
    base: {
      opacity: 0
    , position: 'absolute'
    , width: 12
    , height: 7
    , background: 'transparent'
    , top: 7
    , left: 7
    , borderLeft: '3px solid ' + colour
    , borderBottom: '3px solid ' + colour
    , borderTop: 'none'
    , borderRight: 'none'
    , transform: 'rotate(-45deg)'
    , ':hover': {
        opacity: 0.5
      }
    }
  , error: {
      borderLeft: '3px solid #d9d9d9' 
    , borderBottom: '3px solid #d9d9d9' 
    }
  , checked: {
      opacity: 1
    }
  };

  return <span style={[ styles.base, value === true && styles.checked, error && touch && styles.error ]}/>;
});

const Check = Radium(({ name, value, error, touch }) => {
  const styles = {
    base: {
      cursor: 'pointer'
    , position: 'absolute'
    , width: 25
    , height: 25
    , top: 0
    , left: 10
    , background: 'transparent'
    , border: 'none'
    , boxShadow: '0 0 0 1px #d9d9d9'
    , ':focus': {
        outline: 'none'
      , boxShadow: '0 0 0 2px #ccc'
      }
    }
  , error: {
      boxShadow: '0 0 0 1px #db2828'
    }
  };

  return (
    <label htmlFor={name} style={[ styles.base, error && touch && styles.error ]}>
      <Mark value={value}/>
    </label>
  );
});

const Label = Radium(({ name, label, error, touch }) => {
  const styles = {
    base: {
      paddingLeft: 20
    , color: '#666'
    , fontSize: '0.85em'
    }
  , error: {
      color: '#db2828'
    }
  };

  return (
    <label htmlFor={name} style={[ styles.base, error && touch && styles.error ]}>
      {label}
    </label>
  );
});

export default props => {
  const { label = '' } = props;

  const name = props.name ? props.name : label.toLowerCase().replace(' ', '')

  const styles = {
    base: {
      position: 'relative'
    , clear: 'both'
    , paddingLeft: 10
    , marginBottom: 10
    }
  };

  return (
    <div style={styles.base}>
      <Field {...props} name={name} />
      <Check {...props} name={name} />
      <Label {...props} name={name} />
    </div>
  );
};
