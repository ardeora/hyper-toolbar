import React, { Component } from 'react';
import { HyperToolbar } from '../components/HyperToolbar';
import { HOCProps } from '../types/toolbar';

export default function (Hyper) {
  return class HyperContainer extends Component<HOCProps> {
    constructor(props) {
      console.log('PROPS', props);
      super(props);
    }

    render() {
      return (
        <>
          <Hyper {...this.props} />
          <HyperToolbar config={this.props.toolbar} />
        </>
      );
    }
  };
}
