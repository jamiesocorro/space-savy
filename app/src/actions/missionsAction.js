import _ from 'lodash';
import axios from 'axios';
import { FETCH_LAUNCHES, FETCH_LAUNCHPAD } from "../constants";

export function fetchMissionsOnSuccess(payload) {
    return {
        type: FETCH_LAUNCHES,
        payload
    };
}

export function fetchLaunchPadOnSuccess(payload) {
    return {
        type: FETCH_LAUNCHPAD,
        payload
    };
}

export function fetchLaunches() {
    return (dispatch) => {
        return axios.get(`http://localhost:8001/launches`)
            .then((result) => {
                const { data } = result;
                dispatch(fetchMissionsOnSuccess(data))
            })
            .catch((error) => {
                console.log(error);
            });
    }
}

export function fetchLaunchPad() {
    return (dispatch) => {
        return axios.get(`http://localhost:8001/launchpads`)
            .then((result) => {
                const { data } = result;
                dispatch(fetchLaunchPadOnSuccess(data))
            })
            .catch((error) => {
                console.log(error);
            });
    }

}




