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
            launchPad: [],
            yearList: []
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

     parseData() {
 
         if (this.props.launches && this.props.launches.length > 0) {
             for (const launch of this.props.launches) {
                 if (!this.state.yearList.includes(new Date(launch.launch_date_local).getFullYear()))
                     this.state.yearList.push(new Date(launch.launch_date_local).getFullYear());
                 launch.fullYear = new Date(launch.launch_date_local).getFullYear();
                 if (this.props.launchPad && this.props.launchPad.length > 0) {
                     for (const launchPad of this.props.launchPad) {
                         if (launch.launch_site.site_id === launchPad.id) {
                             launch.fullName = launchPad.full_name;
                         }
                     }
                 }
             }

         }
    }

    onSearch(searchFilters) {

        let filteredMissions = [];

        if (searchFilters.criteria && searchFilters.criteria !== '') {
            filteredMissions = this.props.launches.filter(m => {
                return m.rocket.rocket_name.toLowerCase().includes(searchFilters.criteria.toLowerCase()) ||
                    m.flight_number.toString().includes(searchFilters.criteria.toString()) ||
                    m.payloads[0].payload_id.toString().toLowerCase().includes(searchFilters.criteria.toString().toLowerCase())
            });
        }

        if (searchFilters.launchPad && searchFilters.launchPad !== '') {
            filteredMissions = this.props.launches.filter(m => {
                return m.fullName.toLowerCase().includes(searchFilters.launchPad.toLowerCase())
            });
        }

         if (searchFilters.maxYear && searchFilters.maxYear !== '' && searchFilters.minYear && searchFilters.minYear !== '') {
            for(const launch of this.props.launches) {
                if(launch.fullYear <= searchFilters.minYear && launch.fullYear <= searchFilters.maxYear) {
                    filteredMissions.push(launch);
                }
            }
           
        } else if (searchFilters.maxYear && searchFilters.maxYear !== '') {
            for(const launch of this.props.launches) {
                if(launch.fullYear <= searchFilters.maxYear) {
                    filteredMissions.push(launch);
                }
            }
          
        } else if (searchFilters.minYear && searchFilters.minYear !== '') {
            for(const launch of this.props.launches) {
                if(launch.fullYear <= searchFilters.minYear) {
                    filteredMissions.push(launch);
                }
            }
           
        }

        if (searchFilters.criteria !== '' || searchFilters.launchPad !== '' || searchFilters.maxYear !== '' || searchFilters.minYear !== '') {
            this.setState({ launches: filteredMissions });
        }
            

    }

    renderLauches() {
        this.parseData();
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
                    <SearchFilter onSearch={this.onSearch.bind(this)} launches= {this.state.launches} yearList={this.state.yearList} launchPad={this.state.launchPad}></SearchFilter>
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

