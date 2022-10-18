import { useState, useEffect } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllReviewsBySpotId, thunkDeleteReview } from '../../store/reviews';
import { thunkGetAllSpots, thunkGetSpotById } from '../../store/spots';


import './SpotReviews.css'

const SpotReviews = ({ targetSpot }) => {
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(thunkGetAllReviewsBySpotId(targetSpot.id))
    }, [dispatch, targetSpot.id]);

    const sessionUser = useSelector(state => state.session.user)
    const targetReviews = useSelector(state => state.reviews.spot)
    const targetReviewArray = Object.values(targetReviews)
    if (!targetReviewArray.length) return null
    const sessionUserArray = Object.values(sessionUser)
    if (!sessionUserArray.length) return null

    // if (!targetReviewArray[targetReviewArray.length - 1]?.User?.firstName) return null

    let buttons;
    const reviewDeleteButton = (userReviewId, reviewId) => {
        if (sessionUser.id === userReviewId) {
            return buttons = (
                <button
                    onClick={() => {
                        let deletey = dispatch(thunkDeleteReview(reviewId))
                        if (deletey) {
                            setTimeout(() => {
                                dispatch(thunkGetSpotById(targetSpot.id))

                            }, 100);
                        }
                    }}
                >
                    Delete
                </button>
            )
        } else {
            return null
        }

    }

    return (
        <div className='review-card'>
            {targetReviewArray.map((review) => (
                <li key={review.id}>
                    <div>
                        "{review.review}"
                    </div>
                    <div>
                        {review.User && review.User?.firstName} rated this {review.stars} stars
                    </div>
                    <div>{reviewDeleteButton(review.userId, review.id)}</div>
                </li>
            ))}
        </div>
    )
}

export default SpotReviews
