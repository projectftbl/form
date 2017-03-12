import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import Wrapper from '../wrapper';

const Option = Radium(({ value, children, style, item: { disabled, hidden }}) => {
  return (
    <option 
      style={style} 
      value={value} 
      disabled={disabled} 
      hidden={hidden}>
      {children}
    </option>
  );
});

@Radium
export class Field extends Component {
  name() {
    const { label = '', name } = this.props;

    return name ? name : label.toLowerCase().replace(' ', '')
  }

  shouldFocus() {
    const { focus, readOnly } = this.props;

    if (focus && !readOnly ) {
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

    if (empty) items.unshift({ [valueProperty]: '', [displayProperty]: label, disabled: true, hidden: true });

    return items.map(item => {
      return (<Option key={name + item[valueProperty]} value={item[valueProperty]} item={item}>{item[displayProperty]}</Option>)
    });
  }

  render() {
    const { 
      value = ''
    , label
    , error
    , touch
    , width = '100%'
    , hasIcon
    , onBlur
    , onChange
    , onFocus
    , readOnly = false
    , active
    , style
    } = this.props;

    const styles = {
      base: {
        fontFamily: 'inherit'
      , fontSize: '0.8em'
      , letterSpacing: 1.2
      , borderRadius: 0
      , border: '1px solid #d9d9d9'
      , background: 'url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDMwNiAzMDYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMwNiAzMDY7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0iZXhwYW5kLW1vcmUiPgoJCTxwb2x5Z29uIHBvaW50cz0iMjcwLjMsNTguNjUgMTUzLDE3NS45NSAzNS43LDU4LjY1IDAsOTQuMzUgMTUzLDI0Ny4zNSAzMDYsOTQuMzUgICAiIGZpbGw9IiM0MTgzYzQiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K) no-repeat right 10px center transparent'
      , display: 'block'
      , width
      , paddingTop: '1.2em'
      , paddingBottom: '1.2em'
      , paddingLeft: '1em'
      , paddingRight: '1em'
      , color: '#999'
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
      , background: 'transparent'
      , ':focus': {
          border: '1px solid #db2828'
        , boxShadow: '0 0 5px #db2828'
        }
      }
    , hasIcon: {
        paddingLeft: '3.5em'
      }
    , hasValue: {
        color: '#000'
      }
    , readOnly: {
        background: '#eee'
      }
    };

    return (
      <select style={[ styles.base
                     , active && styles.active
                     , error && touch && !readOnly && styles.error
                     , hasIcon && styles.hasIcon
                     , value && styles.hasValue
                     , readOnly && styles.readOnly
                     , style ]}
        id={this.name()}
        ref={this.name()}
        data-test={this.name()}
        value={value} 
        onChange={onChange} 
        onBlur={onBlur}
        onFocus={onFocus}
        disabled={readOnly}
        data-error={error && touch}>
        {this.renderOptions()}
      </select>
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
