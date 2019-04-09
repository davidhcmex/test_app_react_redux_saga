import React, { Component } from 'react';
import './App.css';
import MyTable from "./components/MyTable"
import MyMap from "./components/MyMap"
import { Route, BrowserRouter, Switch } from "react-router-dom";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Switch>
                        <Route exact path={"/"} component={MyTable} />
                        <Route path={"/map/:userid"} component={MyMap} />
                    </Switch>
                </div>
            </BrowserRouter>

        );
    }
}
export default App;