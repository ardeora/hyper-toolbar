import React, { Component } from 'react';
import { HyperToolbar } from '../components/HyperToolbar';
// import { HOCState, HOCProps } from '../types/toolbar';

export default function (Hyper) {
  return class HyperContainer extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      return (
        <>
          <Hyper {...this.props} />
          <HyperToolbar />
        </>
      );
    }
  };
}
