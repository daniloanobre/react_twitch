import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import StreamCreate from "./Streams/StreamCreate";
import StreamEdit from "./Streams/StreamEdit";
import StreamDelete from "./Streams/StreamDelete";
import StreamList from "./Streams/StreamList";
import StreamShow from "./Streams/StreamShow";
import Header from "./Header";

import history from "../history";

class App extends React.Component {
  render() {
    return (
      <div className="ui container">
        <Router history={history}>
          <div>
            <Header />
            <Switch>
              <Route path="/" exact component={StreamList} />
              <Route path="/streams/new" exact component={StreamCreate} />
              <Route
                path="/streams/:streamId/edit"
                exact
                component={StreamEdit}
              />
              <Route
                path="/streams/:streamId/delete"
                exact
                component={StreamDelete}
              />
              <Route path="/streams/:streamId" exact component={StreamShow} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
export default App;
