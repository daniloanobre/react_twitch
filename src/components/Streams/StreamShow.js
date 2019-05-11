import React, { Component, Fragment } from "react";
import { fetchStream } from "../../actions";
import { connect } from "react-redux";

class StreamShow extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.streamId);
  }

  renderStream = () => {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.stream;
    return (
      <Fragment>
        <h1>{title}</h1>
        <h5>{description}</h5>
      </Fragment>
    );
  };

  render() {
    return <div>{this.renderStream()}</div>;
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.streamId]
  };
};

export default connect(
  mapStateToProps,
  { fetchStream }
)(StreamShow);
