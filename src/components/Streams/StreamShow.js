import React, { Component, Fragment } from "react";
import { fetchStream } from "../../actions";
import { connect } from "react-redux";
import flv from "flv.js";

class StreamShow extends Component {
  constructor(props) {
    super(props);

    this.videoRef = React.createRef();
  }

  componentDidMount() {
    const { streamId } = this.props.match.params;

    this.props.fetchStream(streamId);
    this.buildPlayer();
  }

  componentDidUpdate() {
    this.buildPlayer();
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  buildPlayer() {
    const { streamId } = this.props.match.params;
    if (this.player || !this.props.stream) {
      return;
    }

    if (flv.isSupported()) {
      this.player = flv.createPlayer({
        type: "flv",
        url: `http://localhost:8000/live/${streamId}.flv`
      });

      this.player.attachMediaElement(this.videoRef.current);
      this.player.load();
    }
  }

  renderStream = () => {
    if (!this.props.stream) {
      return <div>Loading...</div>;
    }

    const { title, description } = this.props.stream;
    return (
      <Fragment>
        <video ref={this.videoRef} style={{ width: "100%" }} controls />
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
