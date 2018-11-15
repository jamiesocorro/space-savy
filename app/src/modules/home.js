import React, { Component } from 'react';
import Header from '../components/header';
import SearchFilter from '../components/search-filter'
import MissionsItem from '../components/missions-item'
import { fetchLaunches, fetchLaunchPad } from '../actions/missionsAction';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';
import moment from 'moment';

class Home extends Component {

    constructor(props) {
        super(props);

        this.state = {
            launches: [],
            launchPad: []
        }

        this.missionSectionRef = React.createRef();
        this.topSectionRef = React.createRef();
        this.scrollToMissionSection = this.scrollToMissionSection.bind(this);
        this.scrollToTopSection = this.scrollToTopSection.bind(this);
    }

    componentDidMount() {
        const { fetchLaunches, fetchLaunchPad } = this.props;
        fetchLaunches();
        fetchLaunchPad();
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.launches && nextProps.launches.length > 0) {
            this.setState({ launches: nextProps.launches });
        }

        if (nextProps.launchPad && nextProps.launchPad.length > 0) {
            this.setState({ launchPad: nextProps.launchPad });
        }
    }

    onSearch(searchFilters) {

        let filteredMissions = [];

        if (searchFilters.criteria) {
            filteredMissions = this.props.launches.filter(m => {
                return m.rocket.rocket_name.toLowerCase().includes(searchFilters.criteria.toLowerCase()) ||
                    m.flight_number.toString().includes(searchFilters.criteria.toString()) ||
                    m.payloads[0].payload_id.toString().toLowerCase().includes(searchFilters.criteria.toString().toLowerCase())
            });
        }

        // if (searchFilters.launchPad) {
        //     filteredMissions = this.props.launches.filter(m => {
        //         return m.fullName.toLowerCase().includes(searchFilters.launchPad.toLowerCase())
        //     });
        // }

        // if (searchFilters.maxYear) {
        //     filteredMissions = this.props.launches.filter(m => {
        //         return m.launch_date_local.toLowerCase().includes(searchFilters.criteria.toLowerCase())
        //     });
        // }

        // if (searchFilters.minYear) {
        //     filteredMissions = this.props.launches.filter(m => {
        //         return m.launch_date_local.toLowerCase().includes(searchFilters.criteria.toLowerCase())
        //     });
        // }

        this.setState({ launches: filteredMissions });

    }

    renderLauches() {
        return this.state.launches.map((launch, key) => {
            return (<MissionsItem key={key} launch={launch} launchPad={this.state.launchPad}></MissionsItem>);
        });
    }

    scrollToMissionSection(e) {
        const missionSectionNode = ReactDOM.findDOMNode(this.missionSectionRef.current);
        missionSectionNode.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    scrollToTopSection(e) {
        const topSectionNode = ReactDOM.findDOMNode(this.topSectionRef.current);
        topSectionNode.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }


    render() {
        return (
            <div className="App">
                <Header ref={this.topSectionRef} scrollTo={this.scrollToMissionSection}></Header>
                <div className="mission-item-list-container" ref={this.missionSectionRef} >
                    <SearchFilter onSearch={this.onSearch.bind(this)} launchPad={this.state.launchPad}></SearchFilter>
                    {this.renderLauches()}
                </div>
                <div className="footer">
                    <div>Copyright © Space Savy</div>
                    <div className="footer-btn" onClick={this.scrollToTopSection}>Back to Top</div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { launches, launchPad } = state.missions;
    return { launches, launchPad };
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        { fetchLaunches, fetchLaunchPad },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);

