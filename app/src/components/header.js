import React, { Component, Fragment } from 'react';
import logo from '../static/space-photo.jpeg';
import icon from '../static/down-chevron.svg';

class Header extends Component {     

    render() {
        return (
            <Fragment>
                <div className="hero-overlay">
                    <div className="hero-logo">Space Savy</div>
                    <div className="hero-title">Discover Space Missions</div>
                    <div className="hero-icon" onClick={this.props.scrollTo}>
                         <div className="icon-img" style={{ backgroundImage: `url(${icon})` }} ></div>
                    </div>
                </div>
                <div className="hero">
                    <div className="hero-img" style={{ backgroundImage: `url(${logo})` }} ></div>
                </div>
            </Fragment>
        );
    }
}

export default Header;
