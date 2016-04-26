import React from 'react';
import Radium from 'radium';

const DEFAULT_COLOUR = '#4183c4';

const Field = Radium(props => {

  const { 
    value
  , name
  , error
  , touch
  , readOnly = false
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
      readOnly={readOnly}
      onChange={onChange} 
      onBlur={onBlur}
      onFocus={onFocus}
      data-error={error && touch} />
  );
});

const Mark = Radium(({ value, colour = DEFAULT_COLOUR, readOnly = false, error, touch }) => {
  const styles = {
    base: {
      opacity: 0
    , position: 'absolute'
    , width: 12
    , height: 7
    , background: 'transparent'
    , top: 4
    , left: 3
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
  , readOnly: {
      ':hover': {
        opacity: 0
      }
    }
  };

  return <span style={[ styles.base
                      , value === true && styles.checked
                      , error && touch && !readOnly && styles.error 
                      , readOnly && styles.readOnly
                      ]}/>;
});

const Check = Radium(({ name, value, readOnly = false, error, touch }) => {
  const styles = {
    base: {
      cursor: 'pointer'
    , position: 'absolute'
    , width: 18
    , height: 18
    , top: 3
    , left: 14
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
  , readOnly: {
      background: '#eee'
    }
  };

  return (
    <label htmlFor={!readOnly && name} style={[ styles.base, error && touch && !readOnly && styles.error, readOnly && styles.readOnly ]}>
      <Mark value={value} readOnly={readOnly} error={error} touch={touch} />
    </label>
  );
});

const Error = Radium(({ error, touch, name, readOnly = false }) => {
  const styles = {
    base: {
      fontSize: '0.7em'
    , color: '#db2828'
    , paddingLeft: 10
    , opacity: 0
    , transition: 'all 250ms ease-in'
    }
  , error: {
      opacity: 0.95
    }
  };

  return (
    <span data-test={name + '-error'} style={[ styles.base, error && touch && !readOnly && styles.error ]}>
      {error}
    </span>
  );
});

const Label = Radium(({ name, readOnly = false, label, error, touch }) => {
  const styles = {
    base: {
      paddingLeft: 20
    , color: '#666'
    , fontSize: '0.85em'
    , letterSpacing: '0.5px'
    , cursor: 'pointer'
    }
  , error: {
      color: '#db2828'
    }
  };

  return (
    <label htmlFor={name} style={[ styles.base, error && touch && !readOnly && styles.error ]}>
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
      <Error {...props} name={name} />
    </div>
  );
};
