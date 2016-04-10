import React from 'react';
import Radium from 'radium';

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
      display: 'none'
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

const Check = Radium(({ name }) => {
  const styles = {
    base: {
      cursor: 'pointer'
    , position: 'absolute'
    , width: 25
    , height: 25
    , top: 0
    , left: 0
    , background: '#eee'
    , border: '1px solid #ddd'
    }
  };

  return <label htmlFor={name} style={styles.base} />;
});

const Label = Radium(({ name, label }) => {
  const styles = {
    base: {

    }
  };

  return <label htmlFor={name} style={styles.base}>{label}</label>;
});

export default props => {
  const { label = '' } = props;

  const name = props.name ? props.name : label.toLowerCase().replace(' ', '')

  return (
    <div style={{position:'relative'}}>
      <Field {...props} name={name} />
      <Check {...props} name={name} />
      <Label {...props} name={name} />
    </div>
  );
};
