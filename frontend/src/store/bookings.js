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

const actionDeleteBooking = singleBooking => ({
    type: DELETE_BOOKING,
    singleBooking
})

// thunk action creators
export const thunkGetAllBookingsByCurrentUser = () => async dispatch => {
    const response = await csrfFetch(`/api/bookings/current`)

    if (response.ok) {
        const allReview = await response.json()
        dispatch(actionLoadAllBookingsbyCurrentUser(allBookings))
    }
}

// initialState
const initialState = {
    allBookings: {},
    currentBooking: {}
}

// reducers
