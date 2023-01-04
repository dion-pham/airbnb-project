import { csrfFetch } from "./csrf"

// type constants
const LOAD_BOOKING_BY_CURRENT_USER = 'bookings/LOAD_BOOKING_BY_CURRENT_USER'
// const LOAD_BOOKING_BY_SPOTID = 'bookings/LOAD_BOOKING_BY_SPOTID'
const ADD_BOOKING = 'bookings/ADD_BOOKING'
const DELETE_BOOKING = 'bookings/DELETE_BOOKING'
// edit booking const will be the same as add?


// action creators (CRUD)
const actionLoadAllBookingsbyCurrentUser = allBookings => ({
    type: LOAD_BOOKING_BY_CURRENT_USER,
    allBookings
})

// const actionLoadBookingsBySpotId = allBookings => ({
//     type: LOAD_BOOKING_BY_SPOTID,
//     allBookings
// })

const actionAddBooking = singleBooking => ({
    type: ADD_BOOKING,
    singleBooking
})

const actionDeleteBooking = bookingId => ({
    type: DELETE_BOOKING,
    bookingId
})

// thunk action creators
export const thunkGetAllBookingsByCurrentUser = () => async dispatch => {
    const response = await csrfFetch(`/api/bookings/current`)

    if (response.ok) {
        const allBookings = await response.json()
        dispatch(actionLoadAllBookingsbyCurrentUser(allBookings))
    }
}

export const thunkAddBooking = (spotId, payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/bookings`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const createdBooking = await response.json()
        dispatch(actionAddBooking(createdBooking))
        return createdBooking
    }
}

export const thunkEditBooking = (bookingId, payload) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    if (response.ok) {
        const edittedBooking = await response.json()
        dispatch(actionAddBooking(edittedBooking))
        return edittedBooking
    }
}

export const thunkDeleteBooking = (bookingId) => async dispatch => {
    const response = await csrfFetch(`/api/bookings/${bookingId}`, {
        method: 'DELETE'
    });
    if (response.ok) {
        dispatch(actionDeleteBooking(bookingId))
    }
}


// initialState
const initialState = {
    allBookings: {},
    // all bookings belonging to current user
    currentBooking: {}
    // current booking based off booking Id
}

// reducers
const bookingsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_BOOKING_BY_CURRENT_USER:
            const loadState = { ...state }
            action.allBookings.Bookings.forEach((booking) => {
                loadState.allBookings[booking.id] = booking
            })
            return loadState
        // may need to add load single booking?
        case ADD_BOOKING:
            const addState = {...state, allBookings: {...state.allBookings}, currentBooking: {...state.currentBooking}}
            addState.allBookings[action.singleBooking.id] = action.singleBooking
        case DELETE_BOOKING:
            const deleteState = {...state, allBookings: {...state.allBookings}, currentBooking: {...state.currentBooking}}
            delete deleteState.allBookings[action.bookingId]
        default:
            return state;
    }
}

export default bookingsReducer
