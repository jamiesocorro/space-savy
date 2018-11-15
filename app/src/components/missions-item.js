import React, { Component } from 'react';
import Moment from 'react-moment';
import moment from 'moment';

class MissionsItem extends Component {

    constructor(props) {
        super(props);
    }

    getFullName() {
        let fullName = '';

        if (this.props.launchPad && this.props.launchPad.length > 0) {
            for(const launchPad of this.props.launchPad) {
                 if (this.props.launch.launch_site.site_id === launchPad.id) {
                    fullName = launchPad.full_name;
                }
            }            
        }

        return fullName;
    }

    redirectTo(url) {
        window.location.href = url;
    }

    render() {
        return (
            <div className="mission-container">

                <div className="mission-img" style={{ backgroundImage: `url(${this.props.launch.links.mission_patch})` }}>

                </div>
                <div className="mission-detail">
                    <div className="mission-detail-title">
                        <div>{this.props.launch.rocket.rocket_name}</div>
                        {
                            (this.props.launch.payloads && this.props.launch.payloads.length > 0) &&
                            <span> - {this.props.launch.payloads[0].payload_id} </span>
                        }
                        {
                            (!this.props.launch.launch_success || !this.props.launch.land_success) &&
                            <div className="mission-status">
                                <span>- <span className="failed">Failed Mission</span> </span>
                            </div>
                        }

                    </div>
                    <div className="mission-detail-time">
                        <span>Lauched <b>{moment(this.props.launch.launch_date_local).format("Do MMM YY")}</b> at <b>{moment(this.props.launch.launch_date_local).format("h:mm a")}</b> from <b> {this.getFullName()}</b></span>
                    </div>
                    <div className="mission-buttons">
                        {
                            this.props.launch.links.reddit_campaign &&
                            <div>
                                <button onClick={this.redirectTo.bind(this, this.props.launch.links.reddit_campaign)}>Reddit Campaign</button>
                            </div>
                        }
                        {
                            this.props.launch.links.reddit_launch &&
                            <div>
                                <button onClick={this.redirectTo.bind(this, this.props.launch.links.reddit_launch)}>Reddit Launch</button>
                            </div>
                        }
                        {
                            this.props.launch.links.reddit_recovery &&
                            <div>
                                <button onClick={this.redirectTo.bind(this, this.props.launch.links.reddit_recovery)}>Reddit Recovery</button>
                            </div>
                        }
                        {
                            this.props.launch.links.reddit_media &&
                            <div>
                                <button onClick={this.redirectTo.bind(this, this.props.launch.links.reddit_media)}>Reddit Media</button>
                            </div>
                        }
                        {
                            this.props.launch.links.presskit &&
                            <div>
                                <button onClick={this.redirectTo.bind(this, this.props.launch.links.presskit)}>Press Kit</button>
                            </div>
                        }
                        {
                            this.props.launch.links.article_link &&
                            <div>
                                <button onClick={this.redirectTo.bind(this, this.props.launch.links.article_link)}>Article Link</button>
                            </div>
                        }
                        {
                            this.props.launch.links.video_link &&
                            <div>
                                <button onClick={this.redirectTo.bind(this, this.props.launch.links.video_link)}>Watch Video</button>
                            </div>
                        }

                    </div>

                </div>
                <div className="mission-number">
                    <div className="flight-number"># {this.props.launch.flight_number}</div>
                    <div>Flight Number</div>

                </div>

            </div>
        );
    }
}

export default MissionsItem;
