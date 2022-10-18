import { useState, useEffect } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllReviewsBySpotId } from '../../store/reviews';

import './SpotReviews.css'

const SpotReviews = ({ targetSpot }) => {
    // const { spotId } = useParams()
    const dispatch = useDispatch()


    useEffect(() => {
        dispatch(thunkGetAllReviewsBySpotId(targetSpot.id))
    }, [dispatch, targetSpot.id]);

    const targetReviews = useSelector(state => state.reviews.spot)
    const sessionUser = useSelector(state => state.session.user)

    const targetReviewArray = Object.values(targetReviews)
    if (!targetReviewArray.length) return null
    const sessionUserArray = Object.values(sessionUser)
    if (!sessionUserArray.length) return null


    return (
        <div className='review-card'>
            {targetReviewArray.map((review) => (
                <li key={review.id}>
                    <div>
                        "{review.review}"
                    </div>
                    <div>
                        {review.User && review.User.firstName} rated this {review.stars} stars
                    </div>
                </li>
            ))}
        </div>
    )
}

export default SpotReviews
