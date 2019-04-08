import React, { Component } from "react"
import NavBar from "./components/nav/NavBar"
import ApplicationViews from "./components/ApplicationViews"
import auth0Client from "../src/components/authentication/Auth"
import {withRouter} from 'react-router-dom';

import "./bitcoin.css"



class Bitcoin extends Component {
    async componentDidMount() {
        if (this.props.location.pathname === '/callback') return;
        try {
          await auth0Client.silentAuth();
          this.forceUpdate();
        } catch (err) {
          if (err.error !== 'login_required') console.log(err.error);
        }
      }
    render() {
        return (
            <React.Fragment>
                <NavBar />
                <ApplicationViews />
            </React.Fragment>
        )
    }
}

export default withRouter(Bitcoin);