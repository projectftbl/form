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
      hidden={hidden} 
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

    if (empty) items.unshift({ [valueProperty]: '', [displayProperty]: label, disabled: true, hidden: true });

    return items.map(item => {
      return (<Option key={name + item[valueProperty]} value={item[valueProperty]} item={item}>{item[displayProperty]}</Option>)
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
      , background: 'url(data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDI1NSAyNTUiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDI1NSAyNTU7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0iYXJyb3ctZHJvcC1kb3duIj4KCQk8cG9seWdvbiBwb2ludHM9IjAsNjMuNzUgMTI3LjUsMTkxLjI1IDI1NSw2My43NSAgICIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=) no-repeat right 10px center transparent';
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
