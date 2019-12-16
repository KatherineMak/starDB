import React, { Component } from 'react';

import './person-details.css';

export default class PersonDetails extends Component {
    render() {
        return (
            <div className="person-details card">
                <img className="person-image"
                     src="https://starwars-visualguide.com/assets/img/characters/3.jpg" />
                <div className="card-body">
                    <h4>Name</h4>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                            <span className="term">Gender</span>
                            <span>Gender</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Birth Year</span>
                            <span>Birth Year</span>
                        </li>
                        <li className="list-group-item">
                            <span className="term">Eye color</span>
                            <span>red</span>
                        </li>
                    </ul>
                </div>
            </div>

        );
    }
}