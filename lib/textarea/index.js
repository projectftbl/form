import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import Radium from 'radium';
import Wrapper from '../wrapper';
import calculateHeight from './height';

@Radium
export class Field extends Component {
  constructor(props) {
    super(props);

    this.state = {
      height: null
    , minHeight: -Infinity
    , maxHeight: Infinity
    };

    this.onChange = this.onChange.bind(this);
  }

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

  onChange(e) {
    const node = ReactDOM.findDOMNode(this.refs[this.name()]);

    this.setState(calculateHeight(node, false, this.props.rows || this.props.minRows, this.props.maxRows));
    this.props.onChange(e);
  }

  render() {
    const { 
      value
    , label
    , rows = 6
    , error
    , touch
    , hasIcon
    , onBlur
    , onChange
    , onFocus
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
      , resize: 'none'
      , border: '1px solid #d9d9d9'
      , background: 'transparent'
      , display: 'block'
      , overflow: 'auto'
      , width: '100%'
      , height: this.state.height
      , paddingTop: '1.2em'
      , paddingBottom: '1.2em'
      , paddingLeft: '1em'
      , paddingRight: '1em'
      , WebkitAppearance: 'none'
      , MozAppearance: 'none'
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
      }
    };

    return (
      <textarea style={[ styles.base
                       , active && styles.active
                       , error && touch && !readOnly && styles.error
                       , hasIcon && styles.hasIcon
                       , readOnly && styles.readOnly
                       , style ]}
        id={this.name()}
        ref={this.name()}
        data-test={this.name()}
        placeholder={label}
        onChange={this.onChange} 
        onBlur={onBlur}
        onFocus={onFocus}
        autoCapitalize='off' 
        autoComplete={false}
        spellCheck={false}
        readOnly={readOnly}
        rows={rows}
        data-error={error && touch}
        value={value}/>
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
