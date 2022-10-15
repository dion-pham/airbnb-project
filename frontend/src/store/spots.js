import { csrfFetch } from './csrf';

// type constants
const LOAD = 'spots/LOAD'
const ADD_SPOT = 'spots/ADD_SPOT'
const UPDATE_SPOT = 'spots/UPDATE_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'

// action creators (need CRUD)
const actionLoad = allSpots => ({
    type: LOAD,
    allSpots
});

const actionAddSpot = singleSpot => ({
    type: ADD_SPOT,
    singleSpot
});

const actionUpdateSpot = singleSpot => ({
    type: UPDATE_SPOT,
    singleSpot
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
        dispatch(actionAddSpot(singleSpot))
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
// export const thunkDeleteSpot = (spotId) => async (dispatch) => {
//     const response = await csrfFetch(`/api/spots/${spotId}`, {
//         method: 'DELETE'
//     });

//     if (response.ok) {
//         const deletedSpot = await response.json()
//         // needs work. because the response we get back is a message of 200?
//         dispatch(actionDeleteSpot(deletedSpot))
//         return deletedSpot
//     }
// }

// reducers
const initialState = {
    allSpots: {},
    singleSpot: {}
}

const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const newState = { ...state }
            action.allSpots.Spots.forEach((spot) => { newState[spot.id] = spot })

            return newState
        default:
            return state;
    }
}



// normalize array function?


export default spotsReducer;
