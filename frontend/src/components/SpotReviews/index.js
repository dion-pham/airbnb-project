import { useState, useEffect } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllReviewsBySpotId } from '../../store/reviews';

import './SpotReviews.css'

const SpotReviews = ({ targetSpot }) => {
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(thunkGetAllReviewsBySpotId(targetSpot.id))
    }, [dispatch, targetSpot.id]);

    const targetReviews = useSelector(state => state.reviews.spot)

    const targetReviewArray = Object.values(targetReviews)
    if (!targetReviewArray.length) return null

    console.log(targetReviewArray, 'this is targetreviews')

    return (
        <div className='review-card'>
            {targetReviewArray.map((review) => (
                <li>
                    <div>
                        "{review.review}"
                    </div>
                    <div>
                        {review.User.firstName} rated this {review.stars} stars
                    </div>
                </li>
            ))}
        </div>
    )
}

export default SpotReviews
