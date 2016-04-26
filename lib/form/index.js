import React, { Component } from 'react';

export default class Form extends Component {

  getChildContext() {
    const { authorized = true } = this.props;
    
    return { authorized };
  }

  render() {
    const { onSubmit, authorized = true, children, name } = this.props;

    if (!authorized) return <div data-test={name + '-form'}>{children}</div>;

    return <form data-test={name + '-form'} onSubmit={onSubmit}>{children}</form>;
  }
};

Form.childContextTypes = { authorized: React.PropTypes.bool };
