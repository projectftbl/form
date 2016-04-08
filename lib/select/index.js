import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import Wrapper from '../wrapper';

const Option = Radium(({ value, children, style, disabled, hidden, selected }) => {
  return (
    <option style={style} value={value} disabled={disabled} hidden={hidden} selected={selected}>{children}</option>
  );
});

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

  renderOptions() {
    const { 
      name
    , data
    , valueProperty = 'id'
    , displayProperty = 'description'
    , empty = true
    , children
    , label 
    } = this.props;

    if (children) return children;

    if (data == null) return null;

    let items = _.clone(data);

    if (empty) items.unshift({ [valueProperty]: '', [displayProperty]: label, disabled: true, hidden: true, selected: true });

    return items.map(item => {
      return (<Option key={name + item[valueProperty]} value={item[valueProperty]}>{item[displayProperty]}</Option>)
    });
  }

  render() {
    const { 
      value
    , label
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
      , boxShadow: '0 0 0 1px #d9d9d9'
      , background: 'transparent'
      , display: 'block'
      , width: '100%'
      , paddingTop: '1.2em'
      , paddingBottom: '1.2em'
      , paddingLeft: '1em'
      , paddingRight: '1em'
      , WebkitAppearance: 'none'
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
      <select style={[ styles.base, active && styles.active, error && touch && styles.error, hasIcon && styles.hasIcon ]}
        ref={this.name()}
        data-test={this.name()}
        value={value} 
        onChange={onChange} 
        onBlur={onBlur}
        onFocus={onFocus}
        data-error={error && touch}>
        {this.renderOptions()}
      </select>
    );
  }
};

export default props => {
  const { value, error, Icon } = props;

  return (
    <Wrapper {...props}>
      <Field {...props} active={value} hasIcon={Icon} />
    </Wrapper>
  );
};
