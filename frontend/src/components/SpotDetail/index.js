import { useState, useEffect } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSpotById, thunkGetAllSpots } from '../../store/spots';

import './SpotDetail.css'

const SpotDetail = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        // dispatch(thunkGetAllSpots());
        dispatch(thunkGetSpotById(spotId));
    }, [dispatch, spotId]);

    const targetSpot = useSelector(state => state.spots.singleSpot)
    // const targetSpot = useSelector(state => state.spots.allSpots[spotId])
    const sessionUser = useSelector(state => state.session.user)
    // if (!targetSpot) return null
    let buttons;
    if (sessionUser.id === targetSpot.ownerId) {
        buttons = (
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

    return (
        <div className='spot-card'>
            <h1>{targetSpot && targetSpot.name}</h1>
            <h3>"{targetSpot && targetSpot.description}"</h3>
            <div>{targetSpot && targetSpot.address}</div>
            <div>{targetSpot && targetSpot.city},</div>
            <div>{targetSpot && targetSpot.state}</div>
            <div>{targetSpot && targetSpot.country}</div>
            <div>Latitude: {targetSpot && targetSpot.lat}</div>
            <div>Longitude: {targetSpot && targetSpot.lng}</div>
            <div>Price per night: ${targetSpot && targetSpot.price}</div>
            <div>
                <img src={targetSpot && targetSpot.SpotImages[0]?.url} alt="Spot's image" width="500" height="600"></img>
            </div>
            {/* add the image tag once you finish debugging */}
            {/* <img src="img_girl.jpg" alt="Girl in a jacket" width="500" height="600"></img> */}
            {/* change if you have multiple images in SpotImages array?? */}
            <div>{buttons}</div>
        </div>
    );
};

export default SpotDetail
