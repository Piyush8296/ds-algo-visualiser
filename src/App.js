import React, {Component} from 'react'
import {Route, Router, Switch, Redirect} from 'react-router-dom'
import LinearSearch from "./components/linear-search/index";
import {createBrowserHistory} from 'history';

let history = createBrowserHistory();

class App extends Component {

   render() {
      return (
         <>
            <div>
               <Router history={history}>
                  <Switch>
                     <Route exact path="/" component={LinearSearch}/>
                     <Redirect to='/' />
                  </Switch>
               </Router>
            </div>
         </>
      )
   }
}

export default App
