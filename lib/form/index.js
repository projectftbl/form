import React, { Component } from 'react';

export default class Form extends Component {

  getChildContext() {
    const { authorized = true } = this.props;
    
    return { authorized };
  }

  render() {
    const { onSubmit, authorized = true, children, name, style } = this.props;

    if (!authorized) return <div data-test={name + '-form'} style={style}>{children}</div>;

    return <form data-test={name + '-form'} onSubmit={onSubmit} style={style}>{children}</form>;
  }
};

Form.childContextTypes = { authorized: React.PropTypes.bool };
