import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Link } from 'react-router-dom';
import { thunkGetAllReviewsCurrentUser } from '../../store/reviews';
import { thunkGetSpotById } from '../../store/spots';

const CurrentUserBookingsReviews = () => {
    const dispatch = useDispatch()

    const clicketyClack = (id) => {
        dispatch(thunkGetSpotById(id))
    }

    const spotList = useSelector((state) => Object.values(state.spots.allSpots))
    const sessionUser = useSelector((state) => state.session.user)
    const usersSpotList = spotList.filter(spot => sessionUser.id === spot.ownerId)
    const reviewsList = useSelector((state) => Object.values(state.reviews.user))
    console.log('reviewsList', reviewsList)

    useEffect(() => {
        dispatch(thunkGetAllReviewsCurrentUser());
    }, [dispatch]);

    if (!sessionUser) return <Redirect to="/" />;


    // only show this page if current user is logged in?
    // put users current bookings
    // put users current reviews (maybe don't put.)


    return (
        <div>
            <h1>Your spots</h1>
            {usersSpotList.map((spot) => (
                <div key={spot.id} className='spot-card'>
                    <Link to={`/spots/${spot.id}`}
                        onClick={(() => clicketyClack(spot.id))}
                    >
                        <img src={spot.previewImage} alt="Spot's image" width="265" height="252"></img>
                        <div>{spot.name}</div>
                    </Link>
                </div >
            ))}

            <h1>Your Reviews</h1>
            {reviewsList.map((review) => (
                <div key={review.id} className='review-card'>
                    <Link to={`/spots/${review.spotId}`}
                        onClick={(() => clicketyClack(review.spotId))}
                    >
                        <div>{review.Spot.name}</div>
                    </Link>
                    <div>"{review.review}" - {new Date(review.createdAt).toLocaleDateString()}</div>
                    <div>{review.stars} stars</div>
                </div >
            ))}
        </div>
    )

}

export default CurrentUserBookingsReviews;
