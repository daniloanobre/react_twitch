import React, { Component } from "react";
import { connect } from "react-redux";
import { deleteStream, fetchStream } from "../../actions";
import Modal from "../Modal";
import history from "../../history";

class StreamDelete extends Component {
  componentDidMount() {
    this.props.fetchStream(this.props.match.params.streamId);
  }

  renderActions = () => {
    return (
      <React.Fragment>
        <button
          className="ui button negative"
          onClick={() =>
            this.props.deleteStream(this.props.match.params.streamId)
          }
        >
          Delete
        </button>
        <button className="ui button" onClick={() => history.goBack()}>
          Cancel
        </button>
      </React.Fragment>
    );
  };

  renderContent = () => {
    if (!this.props.stream) {
      return "Are you sure you want to delete this stream?";
    }

    return `Are you sure you want to delete this stream whose title is: ${
      this.props.stream.title
    }?`;
  };

  render() {
    return (
      <Modal
        title="Delete Stream"
        content={this.renderContent()}
        actions={this.renderActions()}
        onDismiss={() => history.push("/")}
      />
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    stream: state.streams[ownProps.match.params.streamId]
  };
};

export default connect(
  mapStateToProps,
  { fetchStream, deleteStream }
)(StreamDelete);
