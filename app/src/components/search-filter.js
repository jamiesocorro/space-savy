import React, { Component } from 'react';

class SearchFilter extends Component {

    constructor(props) {
        super(props);

        this.state = { 
            criteria: '' ,
            launchPad: '',
            maxYear:'',
            minYear: ''
        }

        this.criteriaRef = React.createRef();
        this.launchPadRef = React.createRef();
        this.maxYearRef = React.createRef();
        this.minYearRef = React.createRef();

        this.searchMissions = this.searchMissions.bind(this);
    
    }
    
    searchMissions(e) {
        const { missions } = this.props;

        const searchFilter = {
            criteria: this.criteriaRef.current.value,
            launchPad: this.launchPadRef.current.selectedOptions[0].value,
            maxYear: this.maxYearRef.current.selectedOptions[0].value,
            minYear: this.minYearRef.current.selectedOptions[0].value,
        }
       
        this.props.onSearch(searchFilter);
      
    }
    
    render() {
        return (
            <div className="search-filter-container">
                <div className="control-main">
                    <div>
                        <label htmlFor="">Keywords</label>
                    </div>
                    <div>
                        <input type="text" placeholder="eg. Falcon" ref={ this.criteriaRef } />
                    </div>
                </div>
                <div className="control-main">
                    <div>
                        <label htmlFor="">Launch Pad</label>
                    </div>
                    <div>
                      
                         <select ref={ this.launchPadRef } >{this.props.launchPad.map((pad) => <option value={pad.full_name}>{pad.full_name}</option>)}</select>
                    </div>
                </div>
                <div className="control-minor">
                    <div>
                        <label htmlFor="">Min Year</label>
                    </div>
                    <div>
                        <select ref={ this.maxYearRef }>
                            <option value="" disabled selected>Any</option>
                            <option value="Max">Any</option>
                            <option value="Max1">Max 1</option>
                        </select>
                    </div>
                </div>
                <div className="control-minor">
                    <div>
                        <label htmlFor="">Max Year</label>
                    </div>
                    <div>
                        <select ref={ this.minYearRef }>
                            <option value="" disabled selected>Any</option>
                            <option value="Min">Any</option>
                            <option value="Min1">Min1</option>
                        </select>
                    </div>
                </div>
                <div className="control-minor">
                    <div className="search-btn" onClick={ this.searchMissions }>Apply</div>
                </div>
            </div>
        );
    }
}

export default SearchFilter;
