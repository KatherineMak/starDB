import React, {Component} from 'react';

import Header from '../header';
import RandomPlanet from '../random-planet';
import ErrorButton from '../error-button';
import ErrorIndicator from '../error-indicator';
import PeoplePage from '../people-page';

import './app.css';

export default class App extends Component {

    state = {
        hasError: false
    };

    componentDidCatch() {
        console.log('componentDidCatch()');
        this.setState({hasError: true});
    }

    render() {

        if(this.state.hasError) {
            return <ErrorIndicator />
        }

        return(
            <div>
                <Header />
                <RandomPlanet />
                <ErrorButton />

                <PeoplePage />
                <PeoplePage />

            </div>
        )
    };

};