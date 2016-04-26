import assign from 'lodash/object/assign';
import React from 'react';
import Radium from 'radium';
import Label from './label';
import Error from './error';

export default Radium(({ label, value, error, touch, name, Icon, icon, children, style, readOnly = false, allowFloat = true }) => {
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

  const colour = error && touch && !readOnly ? '#db2828' : (icon ? icon.props.colour : (readOnly ? '#999' : undefined));

  return (
    <div style={styles.base}>
      <div style={styles.wrapper}>
        {icon && React.cloneElement(icon, { style: assign({}, styles.icon, style && style.icon), colour })}
        {Icon && <Icon style={assign({}, styles.icon, style && style.icon)} colour={colour} />}
        <Label text={label} error={error} touch={touch} active={allowFloat && value} hasIcon={icon || Icon} name={name} />
        {children}
      </div>
      <Error error={error} touch={touch} name={name} label={label} />
    </div>
  );
});