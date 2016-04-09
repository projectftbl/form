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
    } = this.props;

    const styles = {
      base: {
        fontFamily: 'inherit'
      , fontSize: '0.8em'
      , fontWeight: 300
      , letterSpacing: 1.5
      , borderRadius: 0
      , border: 'none'
      , resize: 'none'
      , boxShadow: '0 0 0 1px #d9d9d9'
      , background: 'transparent'
      , display: 'block'
      , overflow: 'auto'
      , width: '100%'
      , height: this.state.height
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
        paddingLeft: '3.5em'
      }
    };

    return (
      <textarea style={[ styles.base, active && styles.active, error && touch && styles.error, hasIcon && styles.hasIcon ]}
        ref={this.name()}
        data-test={this.name()}
        placeholder={label}
        onChange={this.onChange} 
        onBlur={onBlur}
        onFocus={onFocus}
        autoCapitalize='off' 
        autoComplete={false}
        spellCheck={false}
        rows={rows}
        data-error={error && touch}
        value={value}/>
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
