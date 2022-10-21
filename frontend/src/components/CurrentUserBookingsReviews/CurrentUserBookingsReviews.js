import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { thunkGetAllReviewsCurrentUser } from '../../store/reviews';
import { thunkGetSpotById } from '../../store/spots';
import './CurrentUserBookingsReviews.css'

const CurrentUserBookingsReviews = () => {
    const dispatch = useDispatch()

    const clicketyClack = (id) => {
        dispatch(thunkGetSpotById(id))
    }

    const spotList = useSelector((state) => Object.values(state.spots.allSpots))
    const sessionUser = useSelector((state) => state.session.user)
    const usersSpotList = spotList?.filter(spot => sessionUser?.id === spot.ownerId)
    const reviewsList = useSelector((state) => Object.values(state.reviews.user))
    console.log('reviewsList', reviewsList)

    useEffect(() => {
        dispatch(thunkGetAllReviewsCurrentUser());
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/" />;


    return (
        <div className='account-wrapper'>
            <h1>Your spots</h1>
            <div className='account-wrapper-top'>
                {usersSpotList.map((spot) => (
                    <div key={spot.id} className='account-spot-card'>
                        <Link to={`/spots/${spot.id}`}
                            onClick={(() => clicketyClack(spot.id))}
                        >
                            <div className='account-spot-card-name'>{spot.name}</div>
                            <img className='account-spot-card-image' src={spot.previewImage} alt="Spot's image" ></img>
                        </Link>
                    </div >
                ))}
            </div>
            <h1>Your reviews</h1>
            <div className='account-wrapper-bottom'>
                {reviewsList.map((review) => (
                    <div key={review.id} className='account-review-card'>
                        <Link className='account-review-card-link' to={`/spots/${review.spotId}`}
                            onClick={(() => clicketyClack(review.spotId))}
                        >
                            <div>{review.Spot.name}</div>
                        </Link>
                        <div>"{review.review}" · {new Date(review.createdAt).toLocaleDateString()}</div>
                        <div><i className="fa-solid fa-star"></i> {typeof review.stars === "number" ? parseFloat(review.stars).toFixed(1) : review.stars}</div>
                    </div >
                ))}
            </div>
        </div>
    )

}

export default CurrentUserBookingsReviews;
