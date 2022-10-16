import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetSpotById } from '../../store/spots';

import './SpotDetail.css'

const SpotDetail = () => {
    const { spotId } = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(thunkGetSpotById(spotId));
    }, [dispatch, spotId]);

    const targetSpot = useSelector(state => state.spots.singleSpot)
    if (!targetSpot) return null

    return (
        <div className='target-spot'>
            <div>{targetSpot.name}</div>
            <div>"{targetSpot.description}"</div>
            <div>{targetSpot.address}</div>
            <div>{targetSpot.city},</div>
            <div>{targetSpot.state}</div>
            <div>{targetSpot.country}</div>
            <div>Latitude: {targetSpot.lat}</div>
            <div>Longitude: {targetSpot.lng}</div>
            <div>Price per night: ${targetSpot.price}</div>
        </div>
    );
};

export default SpotDetail