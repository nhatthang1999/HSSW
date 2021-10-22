import React, {Component} from 'react';

export default class SectionTitle extends Component {
    render() {
      return (
        <div className="bg-white px-0 d-flex justify-content-center my-5">
            <div className="border-bottom border-primary border-5 justify-content-center">
            <h2 className="text-primary mx-3">{this.props.value}</h2>
            </div>
        </div>
    )
    }
  }