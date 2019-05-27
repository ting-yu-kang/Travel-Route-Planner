import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import Maps from "./components/Maps";
import Error from "./components/Error";
import "./App.css"

class App extends Component {
  render() {
    return (
      <BrowserRouter>
       {/* <section style={ sectionStyle }> */}
      <div className="container" >
        <div>
          <div className="jumbotron" >
            <div className="container" >
              <h1 className="display-4" >Travel Assistant</h1>
              <p className="lead" >Welcome to Travel Assistant. Hope we could help you start your adventure without spending lots of time doing homework in advance! </p>
            </div>
          </div>
          <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/about" component={About} />
            <Route path="/Maps" component={Maps} />
            <Route path="/Error" component={Error} />
          </Switch>
        </div>
        </div>
        {/* </section> */}
      </BrowserRouter>
    );
  }
};

export default App; 