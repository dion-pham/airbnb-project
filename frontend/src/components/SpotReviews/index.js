import { useState, useEffect } from 'react';
import { useHistory, useParams, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllReviewsBySpotId, thunkDeleteReview } from '../../store/reviews';
import { thunkGetAllSpots, thunkGetSpotById } from '../../store/spots';
import CreateReviewForm from '../CreateReviewForm';


import './SpotReviews.css'

const SpotReviews = ({ targetSpot }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(thunkGetAllReviewsBySpotId(targetSpot.id))
    }, [dispatch, targetSpot.id]);

    const targetReviews = useSelector(state => state.reviews.spot)
    const sessionUser = useSelector(state => state.session.user)
    const targetReviewArray = Object.values(targetReviews)
    if (!targetReviewArray.length) return null
    // const sessionUserArray = Object.values(sessionUser)
    // if (!sessionUserArray.length) return null

    // const sessionUserReview = targetReviewArray?.find(review => review?.User?.id === sessionUserArray[2])

    // if (!targetReviewArray[targetReviewArray.length - 1]?.User?.firstName) return null

    // const hideReviewForm = () => {
    //     if (sessionUserReview || sessionUser.id === targetSpot.ownerId) {
    //         return null
    //     } else {
    //         return <div>
    //             <CreateReviewForm />
    //         </div>
    //     }
    // }

    if (sessionUser) {
        const sessionUserArray = Object.values(sessionUser)
        if (!sessionUserArray.length) return null
        const sessionUserReview = targetReviewArray?.find(review => review?.User?.id === sessionUserArray[2])

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

        const hideReviewForm = () => {
            if (sessionUserReview || sessionUser.id === targetSpot.ownerId) {
                return null
            } else {
                return <div>
                    <CreateReviewForm />
                </div>
            }
        }

        return (
            <div className='review-card'>
                {targetReviewArray.map((review) => (
                    <li className='review-card-list' key={review.id}>
                        <div>
                            <i class="fa-solid fa-user"></i> "{review.review}"
                        </div>
                        <div>
                            {review.User && review.User?.firstName} rated this {review.stars} stars · {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                        <div>{reviewDeleteButton(review.userId, review.id)}</div>
                    </li>
                ))}
                {hideReviewForm()}
            </div>
        )
    } else {
        return (
            <div className='review-card'>
                {targetReviewArray.map((review) => (
                    <li key={review.id} >

                        <div>
                            {/* <i class="fa-solid fa-user"></i> */}
                            <i class="fa-solid fa-user"></i>  "{review.review}"
                        </div>
                        <div>
                            {review.User && review.User?.firstName} rated this {review.stars} stars · {new Date(review.createdAt).toLocaleDateString()}
                        </div>
                    </li>
                ))}
            </div>
        )
    }
}

export default SpotReviews
