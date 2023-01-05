import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect, useParams } from 'react-router-dom';
import { thunkAddBooking, thunkGetAllBookingsByCurrentUser } from '../../store/bookings';
import './CreateABookingForm.css'
import EditABookingForm from './editBookingForm';

const CreateABookingForm = () => {
    const dispatch = useDispatch()
    const { spotId } = useParams()
    const sessionUserId = useSelector(state => state?.session.user.id)
    const targetSpot = useSelector(state => state.spots.singleSpot)
    const existingBookings = useSelector(state => Object.values(state.bookings.allBookings))
    const currentSpotUserBooked = existingBookings.find(booking => booking.spotId == spotId)

    const history = useHistory()
    const [startDate, setStartDate] = useState(currentSpotUserBooked ? new Date(currentSpotUserBooked?.startDate).toLocaleDateString('en-CA') : '')
    const [endDate, setEndDate] = useState(currentSpotUserBooked ? new Date(currentSpotUserBooked?.endDate).toLocaleDateString('en-CA') : '')
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [nights, setNights] = useState(0)


    useEffect(() => {
        const errors = []
        if (!startDate) {
            errors.push("Start Date is required")
        }
        if (!endDate) {
            errors.push("End Date is required")
        }
        if (startDate === endDate) {
            errors.push("Start Date cannot be the same as end date")
        }
        if (endDate < startDate) {
            errors.push("End Date cannot be before Start Date")
        }
        setValidationErrors(errors)
    }, [startDate, endDate])


    useEffect(() => {
        dispatch(thunkGetAllBookingsByCurrentUser())
        setNights((new Date(endDate) - new Date(startDate)) / (1000 * 3600 * 24))
    }, [dispatch, startDate, endDate])

    const targetSpotArray = Object.keys(targetSpot)
    if (!targetSpotArray.length) return null

    const changeStartDate = (e) => {
        setStartDate(e.target.value)
    }

    const changeEndDate = (e) => {
        setEndDate(e.target.value)
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        setHasSubmitted(true)
        console.log(startDate, 'startDate')
        if (validationErrors.length) return alert('Cannot submit')

        const payload = {
            spotId: spotId,
            userId: sessionUserId,
            startDate,
            endDate
        }

        let createdBooking = await dispatch(thunkAddBooking(spotId, payload))
        if (createdBooking) {
            history.push(`/spots/${spotId}`)
            setHasSubmitted(false)
        }
        dispatch(thunkGetAllBookingsByCurrentUser())
    }

    let currentlyBooked;
    !currentSpotUserBooked && sessionUserId ? currentlyBooked =
        <div className='bookings-dates-container'>
            {hasSubmitted && validationErrors.length > 0 && (
                <div>
                    The following errors were found:
                    <ul>
                        {validationErrors.map((error) => (
                            <li key={error}> <i className='fa fa-exclamation-circle' />  {error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form onSubmit={handleSubmit}>
                <div className='start-date-input'>
                    <label>
                        CHECK-IN
                        <input
                            type='date'
                            value={startDate}
                            onChange={changeStartDate}
                        />
                    </label>
                </div>
                <div className='end-date-input'>
                    <label>
                        CHECK-OUT
                        <input
                            type='date'
                            value={endDate}
                            onChange={changeEndDate}
                        />
                    </label>
                </div>
                <div>
                    <button className='reserve-button' type='submit'>Reserve</button>
                    {/* {!currentSpotUserBooked && sessionUserId ? <button className='reserve-button' type='submit'>Reserve</button> : null}
            {currentSpotUserBooked && sessionUserId && <EditABookingForm/> } */}
                    {/* technically dont need a modal because you can just replace the add form with edit form if a current reservation already exists */}
                </div>
            </form>
        </div>
        : currentlyBooked =
        <div>
            <EditABookingForm />
        </div>


    let priceRender;
    if (endDate && startDate) {
        priceRender =
            <div>
                <div className='spot-card-bottom-right-pricing'>
                    <div className='bottom-description'>
                        <div>
                            ${targetSpot.price} x {nights} nights
                        </div>
                        <div>
                            Cleaning fee
                        </div>
                        <div>
                            Service fee
                        </div>
                    </div>
                    <div className='bottom-prices'>
                        <div>
                            ${Math.ceil(targetSpot.price * nights)}
                        </div>
                        <div>
                            ${Math.ceil(targetSpot.price * nights * .0625)}
                        </div>
                        <div>
                            ${Math.ceil(targetSpot.price * nights * .1146)}
                        </div>
                    </div>
                </div>
                <div className='bottom-total-price'>
                    <div>
                        Total before taxes
                    </div>
                    <div>
                        ${Math.ceil((targetSpot.price * nights) + (targetSpot.price * nights * .0625) + (targetSpot.price * nights * .1146))}
                    </div>
                </div>
            </div>
    } else {
        priceRender =
            <div>
                <div className='spot-card-bottom-right-pricing'>
                    <div className='bottom-description'>
                        <div>
                            ${targetSpot.price} x 5 nights
                        </div>
                        <div>
                            Cleaning fee
                        </div>
                        <div>
                            Service fee
                        </div>
                    </div>
                    <div className='bottom-prices'>
                        <div>
                            ${Math.ceil(targetSpot.price * 5)}
                        </div>
                        <div>
                            ${Math.ceil(targetSpot.price * 5 * .0625)}
                        </div>
                        <div>
                            ${Math.ceil(targetSpot.price * 5 * .1146)}
                        </div>
                    </div>
                </div>
                <div className='bottom-total-price'>
                    <div>
                        Total before taxes
                    </div>
                    <div>
                        ${Math.ceil((targetSpot.price * 5) + (targetSpot.price * 5 * .0625) + (targetSpot.price * 5 * .1146))}
                    </div>
                </div>
            </div>
    }


    return (
        <div>
            <div>
                {currentlyBooked}
            </div>
            <div>
                {!currentSpotUserBooked ? priceRender: null}
            </div>
        </div>
    )
}





// after submitting booking, change reserve to update booking??
// then add update modal
//  have it so that if no bookings are chosen, conditionally render the example price for 5 nights
// pull validation errors from the front end?

export default CreateABookingForm
