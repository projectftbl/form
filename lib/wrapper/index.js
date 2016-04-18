import React from 'react';
import Radium from 'radium';
import Label from './label';
import Error from './error';

export default Radium(({ label, value, error, touch, name, Icon, icon, children }) => {
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
        {icon && React.cloneElement(icon, { style: styles.icon, colour })}
        {Icon && <Icon style={styles.icon} colour={colour} />}
        <Label text={label} error={error} touch={touch} active={value} hasIcon={icon || Icon} name={name} />
        {children}
      </div>
      <Error error={error} touch={touch} name={name} label={label} />
    </div>
  );
});