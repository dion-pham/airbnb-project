import { csrfFetch } from './csrf';

// type constants
const LOAD = 'spots/LOAD'
const LOAD_SPOT = 'spots/LOAD_SPOT'
const ADD_SPOT = 'spots/ADD_SPOT'
const UPDATE_SPOT = 'spots/UPDATE_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'

// action creators (need CRUD)
const actionLoad = load => ({
    type: LOAD,
    load
});

const actionLoadSpot = singleLoad => ({
    type: LOAD_SPOT,
    singleLoad
});


const actionAddSpot = singleLoad => ({
    type: ADD_SPOT,
    singleLoad
});

const actionUpdateSpot = singleLoad => ({
    type: UPDATE_SPOT,
    singleLoad
});

const actionDeleteSpot = (singleSpotId) => ({
    type: DELETE_SPOT,
    singleSpotId
});

// thunk action creators
// MUST CSRF FETCH

// C(r)UD - get all spots
export const thunkGetAllSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')

    if (response.ok) {
        const allSpots = await response.json()
        dispatch(actionLoad(allSpots))
    }
}

// C(r)UD - get spot by Id
export const thunkGetSpotById = (id) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${id}`)

    if (response.ok) {
        const singleSpot = await response.json()
        dispatch(actionLoadSpot(singleSpot))
    }
}

// (c)RUD - create a spot
export const thunkCreateSpot = (payload) => async (dispatch) => {
    const response = await csrfFetch('/api/spots', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const createdSpot = await response.json()
        dispatch(actionAddSpot(createdSpot))
        return createdSpot
    }
}

// CR(u)D - update a spot by id
export const thunkUpdateSpot = (spotId, payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const updatedSpot = await response.json()
        dispatch(actionAddSpot(updatedSpot))
        return updatedSpot
    }
}

// NEEDS WORDS!!! CRU(d) - delete a spot by id
export const thunkDeleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        const deletedSpot = await response.json()
        // needs work. because the response we get back is a message of 200?
        dispatch(actionDeleteSpot(deletedSpot))
        return deletedSpot
    }
}

// reducers
const initialState = {
    allSpots: {},
    singleSpot: {}
}

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newState = { ...state }
            action.load.Spots.forEach((spot) => { newState.allSpots[spot.id] = spot })
            return newState
        case LOAD_SPOT:
            const _newState = { ...state }
            _newState.singleSpot = action.singleLoad
            return _newState
        case ADD_SPOT:
            if (!state[action.singleLoad.id]) {
                const __newState = { ...state }
                __newState.allSpots[action.singleLoad.id] = action.singleLoad
                return __newState
            } else {
                return state
            }
        default:
            return state;
    }
}
export default spotsReducer;
