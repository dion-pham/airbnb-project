import { csrfFetch } from './csrf';

// ***TYPE CONSTANTS***
const LOAD = 'spots/LOAD'
const LOAD_SPOT = 'spots/LOAD_SPOT'
const ADD_SPOT = 'spots/ADD_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'
const ADD_IMAGE = 'spots/ADD_IMAGE'

// ***ACTION CREATORS*** (need CRUD)
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

const actionAddImage = (spotId, singleImage) => ({
    type: ADD_IMAGE,
    spotId,
    singleImage
});


const actionDeleteSpot = (spotId) => ({
    type: DELETE_SPOT,
    spotId
});

// ***THUNK ACTION CREATORS***

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

// (c)RUD - add image to a spot
export const thunkCreateSpotImage = (spotId, payload) => async (dispatch) => {
    const formData = new FormData()
    if (payload) {
        const image = payload
        formData.append('image', image)
    }

    const response = await csrfFetch(`/api/spots/${spotId}/images`, {
        method: 'POST',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        body: formData
    })

    if (response.ok) {
        const createdImage = await response.json()
        dispatch(actionAddImage(spotId, createdImage))
        return createdImage
    }
}

// CR(u)D - update a spot by id
export const thunkUpdateSpot = (spotId, payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'PUT',
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

// CRU(d) - delete a spot by id
export const thunkDeleteSpot = (spotId) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(actionDeleteSpot(spotId))
    }
}

// ***initialState***
const initialState = {
    allSpots: {},
    singleSpot: {}
}

// ***REDUCERS***
const spotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD:
            const loadState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            action.load.Spots.forEach((spot) => { loadState.allSpots[spot.id] = spot })
            return loadState
        case LOAD_SPOT:
            const loadSpotState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            loadSpotState.singleSpot = action.singleLoad
            return loadSpotState
        case ADD_SPOT:
            const addState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            addState.allSpots[action.singleLoad.id] = action.singleLoad
            return addState
        case ADD_IMAGE:
            const addImageState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            addImageState.allSpots[action.spotId].previewImage = action.singleImage.spotImageUrl
            addImageState.singleSpot.SpotImages.push(action.singleImage)
            return addImageState
        case DELETE_SPOT:
            const deleteState = { ...state, allSpots: { ...state.allSpots }, singleSpot: { ...state.singleSpot } }
            delete deleteState.allSpots[action.spotId]
            return deleteState
        default:
            return state;
    }
}
export default spotsReducer;
