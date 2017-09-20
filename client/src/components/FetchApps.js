import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import Apps from './Apps';
import AppView from './AppView';
import { getApps } from '../actions/apps';
import { Loader, Segment, Dimmer } from 'semantic-ui-react';

class FetchApps extends Component {
  state = { loaded: false }

  componentDidMount() {
    this.props.dispatch(getApps(this.setLoaded))
  }

  setLoaded = () => {
    this.setState({ loaded: true })
  }

  render() {
    if(this.state.loaded) {
      return(
        <Segment>
          <Route exact path='/apps' component={Apps} />
          <Route exact path='/apps/:id' component={AppView} />
        </Segment>
      )
    } else {
      return(
      <Segment>
        <Dimmer active>
          <Loader />
        </Dimmer>
      </Segment>
      )
    }
  }
}

export default connect()(FetchApps);
