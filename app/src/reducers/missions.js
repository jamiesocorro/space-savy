import { FETCH_LAUNCHES, FETCH_LAUNCHPAD } from '../constants';

const INITIAL_STATE = {
    launches: [],
    launchPad: []
};

export default function (state = INITIAL_STATE, action) {
    switch (action.type) {
        case FETCH_LAUNCHES:
            return Object.assign({}, state, {
                launches: action.payload
            });
        case FETCH_LAUNCHPAD:
            return Object.assign({}, state, {
                launchPad: action.payload
            });
        default:
            return state;
    };

    return state;
};
