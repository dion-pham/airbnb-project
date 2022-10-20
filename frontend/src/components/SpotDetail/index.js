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

    // if (!sessionUser) return null


    // if (sessionUser.id === targetSpot.ownerId) {
    //     buttons = (
    //         <div>
    //             <button
    //                 onClick={() => history.push(`/spots/${spotId}/edit`)}
    //             // <Redirect to={`/spots/${spotId}/edit`}
    //             >
    //                 Edit this spot!
    //             </button>
    //         </div>
    //     )
    // }

    let buttons;
    const editSpotButton = () => {
        if (sessionUser.id === targetSpot.ownerId) {
            return buttons = (
                <div>
                    <button
                        onClick={() => history.push(`/spots/${spotId}/edit`)}
                    // <Redirect to={`/spots/${spotId}/edit`}
                    >
                        Edit this spot!
                    </button>
                </div>
            )
        }
    }

    if (sessionUser) {
        return (
            <div className='spot-card'>
                < div className='spot-card-top'>
                    <h1>{targetSpot.name}</h1>
                    <div className='spot-card-top-ratings-location'>
                        <div>
                            <i className="fa-solid fa-star"></i> {targetSpot.avgStarRating} · {targetSpot.numReviews} Reviews · {targetSpot.city}, {targetSpot.state} {targetSpot.country}
                        </div>
                    </div>
                    <div>
                        <img src={targetSpot?.SpotImages[0]?.url} alt="Spot's image" width="500" height="600"></img>
                    </div>

                    {editSpotButton()}
                </div >
                <div className='spot-card-bottom'>
                    <div className='spot-card-bottom-left'>
                        <h2>Hosted by {targetSpot.Owner.firstName}</h2>
                        <h3>"{targetSpot.description}"</h3>
                        <SpotReviews targetSpot={targetSpot} />
                    </div>
                    <div className='spot-card-bottom-right' >
                        <div>${targetSpot.price} night </div>
                        <div>
                            <i className="fa-solid fa-star"></i> {targetSpot.avgStarRating} · {targetSpot.numReviews} Reviews · {targetSpot.city}, {targetSpot.state} {targetSpot.country}
                        </div>
                    </div>
                </div>
            </div >

            // add this for a non user BELOW after you are done with the sessionUser stuff!!!
        );
    } else {

        return (
            <div className='spot-card'>
                <h1>{targetSpot.name}</h1>
                <h3>"{targetSpot.description}"</h3>
                <div>{targetSpot.address}</div>
                <div>{targetSpot.city},</div>
                <div>{targetSpot.state}</div>
                <div>{targetSpot.country}</div>
                <div>Latitude: {targetSpot.lat}</div>
                <div>Longitude: {targetSpot.lng}</div>
                <div>Price per night: ${targetSpot.price}</div>
                <div>
                    <img src={targetSpot?.SpotImages[0]?.url} alt="Spot's image" width="500" height="600"></img>
                </div>
                <div>
                    {targetSpot.avgStarRating} - {targetSpot.numReviews} Reviews
                </div>
                <SpotReviews targetSpot={targetSpot} />
            </div>
        );
    }
};

export default SpotDetail
