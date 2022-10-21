import { useState, useEffect } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSpotById, thunkGetAllSpots } from '../../store/spots';
import SpotReviews from '../SpotReviews';
// import CreateReviewForm from '../CreateReviewForm';

import './SpotDetail.css'

const SpotDetail = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(thunkGetSpotById(spotId));
    }, [dispatch, spotId]);

    const targetSpot = useSelector(state => state.spots.singleSpot)
    console.log(targetSpot, 'this is targetspot')
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
    if (typeof targetSpot?.avgStarRating === "number") {
        avgStarRating = parseFloat(targetSpot?.avgStarRating).toFixed(1)
    } else if (typeof Number(targetSpot?.avgStarRating) === "number") {
        avgStarRating = Number(parseFloat(targetSpot?.avgStarRating).toFixed(1))
    }

    if (sessionUser) {
        return (
            <div className='spot-card'>
                < div className='spot-card-top'>
                    <h1>{targetSpot.name}</h1>
                    <div className='spot-card-top-ratings-location'>
                        <div>
                            <i className="fa-solid fa-star"></i> {avgStarRating} · {targetSpot.numReviews} Reviews · {targetSpot.city}, {targetSpot.state} {targetSpot.country}
                        </div>

                        <div>

                        </div>
                    </div>
                    <div className='spot-card-top-image'>
                        <img src={targetSpot?.SpotImages[0]?.url} alt="Spot's image" ></img>
                    </div>

                </div >
                <div className='spot-card-bottom'>
                    <div className='spot-card-bottom-left'>
                        <div>{editSpotButton()}</div>
                        <h1>Hosted by {targetSpot.Owner.firstName}</h1>
                        <h2>"{targetSpot.description}"</h2>
                        <div className='spot-card-bottom-left-ratings'><i className="fa-solid fa-star"></i> {avgStarRating} · {targetSpot.numReviews} Reviews</div>
                        <div>
                            <SpotReviews targetSpot={targetSpot} />
                        </div>
                    </div>
                    <div className='spot-card-bottom-right' >
                        <div className='spot-card-bottom-right-price'>${targetSpot.price} night </div>
                        <div>
                            <i className="fa-solid fa-star"></i> {avgStarRating} · {targetSpot.numReviews} Reviews
                        </div>
                        <div className='spot-card-bottom-right-book'>This spot is currently unavailable. </div>
                    </div>
                </div>
            </div >

        );
    } else {

        return (
            <div className='spot-card'>
                < div className='spot-card-top'>
                    <h1>{targetSpot.name}</h1>
                    <div className='spot-card-top-ratings-location'>
                        <div>
                            <i className="fa-solid fa-star"></i> {avgStarRating} · {targetSpot.numReviews} Reviews · {targetSpot.city}, {targetSpot.state} {targetSpot.country}
                        </div>
                        <div>

                        </div>
                    </div>
                    <div className='spot-card-top-image'>
                        <img src={targetSpot?.SpotImages[0]?.url} alt="Spot's image" ></img>
                    </div>

                </div >
                <div className='spot-card-bottom'>
                    <div className='spot-card-bottom-left'>
                        <h1>Hosted by {targetSpot.Owner.firstName}</h1>
                        <h2>"{targetSpot.description}"</h2>
                        <div> <i className="fa-solid fa-star"></i> {avgStarRating} · {targetSpot.numReviews} Reviews</div>
                        <div>
                            <SpotReviews targetSpot={targetSpot} />
                        </div>
                    </div>
                    <div className='spot-card-bottom-right' >
                        <div className='spot-card-bottom-right-price'>${targetSpot.price} night </div>
                        <div>
                            <i className="fa-solid fa-star"></i> {avgStarRating} · {targetSpot.numReviews} Reviews · {targetSpot.city}, {targetSpot.state} {targetSpot.country}
                        </div>
                        <div className='spot-card-bottom-right-book'>This spot is currently unavailable.</div>
                    </div>
                </div>
            </div >

            // add this for a non user BELOW after you are done with the sessionUser stuff!!!
        );
    }
};

export default SpotDetail
