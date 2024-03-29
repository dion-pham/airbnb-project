import { useState, useEffect } from 'react';
import { useHistory, useParams, Redirect, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSpotById, thunkGetAllSpots } from '../../store/spots';
import SpotReviews from '../SpotReviews';
// import CreateReviewForm from '../CreateReviewForm';

import './SpotDetail.css'
import CreateABookingForm from '../CreateABookingForm';
import LoginFormModal from '../LoginFormModal';
import { thunkGetAllBookingsByCurrentUser } from '../../store/bookings';

const SpotDetail = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(thunkGetSpotById(spotId));
        dispatch(thunkGetAllBookingsByCurrentUser())
    }, [dispatch, spotId]);

    const targetSpot = useSelector(state => state.spots.singleSpot)
    const sessionUser = useSelector(state => state.session.user)

    const targetSpotArray = Object.keys(targetSpot)
    if (!targetSpotArray.length) return null

    let buttons;
    const editSpotButton = () => {
        if (sessionUser.id === targetSpot.ownerId) {
            return buttons = (
                <div>
                    <button className='edit-button'
                        onClick={() => history.push(`/spots/${spotId}/edit`)}
                    >
                        Edit this spot!
                    </button>
                </div>
            )
        }
    }

    let avgStarRating;
    if (targetSpot?.avgStarRating === 'There are no reviews') {
        avgStarRating = "0"
    } else if (typeof targetSpot?.avgStarRating === "number") {
        avgStarRating = parseFloat(targetSpot?.avgStarRating).toFixed(1)
    } else if (typeof Number(targetSpot?.avgStarRating) === "number") {
        avgStarRating = Number(parseFloat(targetSpot?.avgStarRating).toFixed(1))
    }

    return (
        <div className='spot-card-container'>
            < div className='spot-card-top'>
                <h1>{targetSpot.name}</h1>
                <div className='spot-card-top-ratings-location'>
                    <div>
                        <i className="fa-solid fa-star"></i> {avgStarRating} · {targetSpot.numReviews} Reviews · {targetSpot.city}, {targetSpot.state}, {targetSpot.country}
                    </div>
                </div>
                <div className='spot-card-top-image'>
                    <img src={targetSpot?.SpotImages[0]?.url} alt="Spot's image" ></img>
                </div>

            </div >
            <div className='spot-card-bottom'>
                {/* <div className='outer-container-spot-card-bottom-left'> */}
                <div className='spot-card-bottom-left'>
                    {sessionUser && (<div>{editSpotButton()}</div>)}
                    <div className='spot-card-bottom-left-hosted-by'>
                        <h1 >Hosted by {targetSpot.Owner.firstName}</h1>
                        3 guests · 1 bedroom · 3 beds · 1 bath
                    </div>
                    <div className='spot-card-bottom-left-icons'>
                        <div>
                            <img src='https://i.imgur.com/MTE2zNy.png' className='spot-card-bottom-left-icons-image' alt='air-cover' width='20' height='20' ></img>
                            Self check-in.
                        </div>
                        <div>
                            <img src='https://i.imgur.com/ztXO2J4.png' className='spot-card-bottom-left-icons-image' alt='air-cover' width='20' height='20' ></img>
                            Popular location!
                        </div>
                        <div>
                            <img src='https://i.imgur.com/oGs0JTK.png' className='spot-card-bottom-left-icons-image' alt='air-cover' width='20' height='20' ></img>
                            Free cancellation for 48 hours.
                        </div>
                    </div>
                    <div className='spot-card-bottom-left-img'>
                        <img src='https://i.imgur.com/peICz9g.png' alt='air-cover' width='124' height='50' ></img>
                    </div>
                    <div className='spot-card-bottom-air-cover-info'>
                        Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
                    </div>
                    <h2>"{targetSpot.description}"</h2>
                    <div className='spot-card-bottom-left-ratings'><i className="fa-solid fa-star"></i> {avgStarRating} · {targetSpot.numReviews} Reviews</div>
                    <div className='spot-card-bottom-left-individual-reviews'>
                        <SpotReviews targetSpot={targetSpot} />
                    </div>
                </div>
                {/* </div> */}

                <div className='spot-card-bottom-right' >
                    <div className='container-price-rating-stars'>
                        <div className='spot-card-bottom-right-price'>${targetSpot.price} night </div>
                        <div>
                            <i className="fa-solid fa-star"></i> {avgStarRating} · {targetSpot.numReviews} Reviews
                        </div>
                    </div>
                    {sessionUser && targetSpot.Owner.id !== sessionUser.id && (<CreateABookingForm />)}
                    {!sessionUser &&
                    (<div className='spot-card-bottom-right-book'>
                        <div>
                            Please <Link to={'/login'} className='non-logged-in-link'>login</Link> or <Link to={'/sign-up'} className='non-logged-in-link'>signup</Link> to book this spot
                        </div>
                    </div>)}
                    {sessionUser && targetSpot.Owner.id === sessionUser.id && (<div className='spot-card-bottom-right-book'>This spot is owned by you. </div>)}


                </div>
            </div>
        </div >

    )
};


export default SpotDetail
