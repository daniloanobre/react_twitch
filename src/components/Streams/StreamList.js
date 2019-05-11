import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStreams } from "../../actions";

class StreamList extends Component {
  componentDidMount() {
    this.props.fetchStreams();
  }

  renderList = () => {
    return this.props.streams.map(stream => {
      return (
        <Link className="item" key={stream.id} to={`/streams/${stream.id}`}>
          {this.renderAdmin(stream)}
          <i className="large middle aligned caret icon camera" />
          <div className="content">{stream.title}</div>
          <div className="description">{stream.description}</div>
        </Link>
      );
    });
  };

  renderAdmin = stream => {
    return stream.userId === this.props.currentUserId ? (
      <div className="right floated content">
        <Link className="ui button" to={`/streams/${stream.id}/edit`}>
          Edit
        </Link>
        <Link
          className="ui button negative"
          to={`/streams/${stream.id}/delete`}
        >
          Delete
        </Link>
      </div>
    ) : null;
  };

  renderCreateButton = () => {
    return this.props.isSignedIn ? (
      <div style={{ textAlign: "right" }}>
        <Link className="ui button primary" to="/streams/new">
          Create Stream
        </Link>
      </div>
    ) : null;
  };

  render() {
    return (
      <div>
        <h2>Streams</h2>
        <div className="ui celled list">{this.renderList()}</div>
        {this.renderCreateButton()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    streams: Object.values(state.streams),
    currentUserId: state.auth.userId,
    isSignedIn: state.auth.isSignedIn
  };
};

export default connect(
  mapStateToProps,
  { fetchStreams }
)(StreamList);
