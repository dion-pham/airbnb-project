import { csrfFetch } from './csrf';

// ***TYPE CONSTANTS***
const LOAD_BY_SPOTID = 'reviews/LOAD_BY_SPOTID'
const LOAD_BY_CURRENT = 'reviews/LOAD_BY_CURRENT'
const ADD_REVIEW = 'reviews/ADD_REVIEW'
const DELETE_REVIEW = 'reviews/DELETE_REVIEW'
const DELETE_USER_REVIEW = 'reviews/DELETE_USER_REVIEW'

// ***ACTION CREATORS*** (need CRD)
const actionLoadAllReviewsBySpotId = allReviews => ({
    type: LOAD_BY_SPOTID,
    allReviews
});

const actionLoadAllReviewsByCurrentUser = allReviews => ({
    type: LOAD_BY_CURRENT,
    allReviews
});

const actionAddReview = singleReview => ({
    type: ADD_REVIEW,
    singleReview
});

const actionDeleteReview = (reviewId) => ({
    type: DELETE_REVIEW,
    reviewId
});

const actionDeleteUserReview = (reviewId) => ({
    type: DELETE_USER_REVIEW,
    reviewId
});

// ***THUNK ACTION CREATORS***

// C(r)UD - get all reviews from a spot by spotId
export const thunkGetAllReviewsBySpotId = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const allReviews = await response.json()
        dispatch(actionLoadAllReviewsBySpotId(allReviews))
    }
}

// // C(r)UD - get all reviews by current user. add to the account page??
export const thunkGetAllReviewsCurrentUser = () => async dispatch => {
    const response = await csrfFetch(`/api/reviews/current`)

    if (response.ok) {
        const allReviews = await response.json()
        dispatch(actionLoadAllReviewsByCurrentUser(allReviews))
    }
}

// (c)RUD - create a review based on the spot's id
export const thunkCreateReview = (spotId, payload) => async (dispatch) => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        console.log(response, 'this is response')
        const createdReview = await response.json()
        console.log(createdReview, 'this is created review')
        dispatch(actionAddReview(createdReview))
        return createdReview
    }
}

// CRU(d) - delete a review by id. ON THE SPOT PAGE
export const thunkDeleteReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(actionDeleteReview(reviewId))
        return true
    }
}

// CRU(d) - delete a review by id. ON THE USER PAGE
export const thunkDeleteUserReview = (reviewId) => async (dispatch) => {
    const response = await csrfFetch(`/api/reviews/${reviewId}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        dispatch(actionDeleteUserReview(reviewId))
        return true
    }
}

// ***initialState***
const initialState = {
    spot: {},
    user: {}
}

// ***REDUCERS***
const reviewsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BY_SPOTID:
            // const loadStateSpotId = { ...state, spot: {}, user: {} }
            const loadStateSpotId = { ...state }
            loadStateSpotId.spot = {}
            loadStateSpotId.user = {}
            action.allReviews.Reviews.forEach((review) => {
                loadStateSpotId.spot[review.id] = review
            })
            return loadStateSpotId
        case LOAD_BY_CURRENT:
            // const loadCurrentState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
            const loadCurrentState = { ...state }
            loadCurrentState.spot = {}
            loadCurrentState.user = {}
            action.allReviews.Reviews.forEach((review) => {
                loadCurrentState.user[review.id] = review
            })
            return loadCurrentState
        case ADD_REVIEW:
            const addState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
            addState.spot[action.singleReview.id] = action.singleReview
            return addState
        case DELETE_REVIEW:
            const deleteReviewState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
            delete deleteReviewState.spot[action.reviewId]
            return deleteReviewState
        case DELETE_USER_REVIEW:
            const deleteUserReviewState = { ...state, spot: { ...state.spot }, user: { ...state.user } }
            delete deleteUserReviewState.user[action.reviewId]
            return deleteUserReviewState
        default:
            return state;
    }
}

export default reviewsReducer
