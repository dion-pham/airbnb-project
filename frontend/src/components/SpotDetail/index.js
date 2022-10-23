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
    if (targetSpot?.avgStarRating === 'There are no reviews') {
        avgStarRating = "0"
    } else if (typeof targetSpot?.avgStarRating === "number") {
        avgStarRating = parseFloat(targetSpot?.avgStarRating).toFixed(1)
    } else if (typeof Number(targetSpot?.avgStarRating) === "number") {
        avgStarRating = Number(parseFloat(targetSpot?.avgStarRating).toFixed(1))
    }

    return (
        <div className='spot-card-container'>
            < div className='spot-card-top'>
                <h1>{targetSpot.name}</h1>
                <div className='spot-card-top-ratings-location'>
                    <div>
                        <i className="fa-solid fa-star"></i> {avgStarRating} · {targetSpot.numReviews} Reviews · {targetSpot.city}, {targetSpot.state}, {targetSpot.country}
                    </div>
                </div>
                <div className='spot-card-top-image'>
                    <img src={targetSpot?.SpotImages[0]?.url} alt="Spot's image" ></img>
                </div>

            </div >
            <div className='spot-card-bottom'>
                {/* <div className='outer-container-spot-card-bottom-left'> */}
                <div className='spot-card-bottom-left'>
                    {sessionUser && (<div>{editSpotButton()}</div>)}
                    <div className='spot-card-bottom-left-hosted-by'>
                        <h1 >Hosted by {targetSpot.Owner.firstName}</h1>
                        3 guests · 1 bedroom · 3 beds · 1 bath
                    </div>
                    <div className='spot-card-bottom-left-img'>
                        <img src='https://i.imgur.com/peICz9g.png' alt='air-cover' width='124' height='50' ></img>
                    </div>
                    <div className='spot-card-bottom-air-cover-info'>
                        Every booking includes free protection from Host cancellations, listing inaccuracies, and other issues like trouble checking in.
                    </div>
                    <h2>"{targetSpot.description}"</h2>
                    <div className='spot-card-bottom-left-ratings'><i className="fa-solid fa-star"></i> {avgStarRating} · {targetSpot.numReviews} Reviews</div>
                    <div className='spot-card-bottom-left-individual-reviews'>
                        <SpotReviews targetSpot={targetSpot} />
                    </div>
                </div>
                {/* </div> */}

                <div className='spot-card-bottom-right' >
                    <div className='container-price-rating-stars'>
                        <div className='spot-card-bottom-right-price'>${targetSpot.price} night </div>
                        <div>
                            <i className="fa-solid fa-star"></i> {avgStarRating} · {targetSpot.numReviews} Reviews
                        </div>
                    </div>
                    <div className='spot-card-bottom-right-pricing'>
                        <div className='bottom-description'>
                            <div>
                                ${targetSpot.price} x 5 nights
                            </div>
                            <div>
                                Cleaning fee
                            </div>
                            <div>
                                Service fee
                            </div>
                        </div>
                        <div className='bottom-prices'>
                            <div>
                                ${Math.ceil(targetSpot.price * 5)}
                            </div>
                            <div>
                                ${Math.ceil(targetSpot.price * .0625)}
                            </div>
                            <div>
                                ${Math.ceil(targetSpot.price * .1146)}
                            </div>
                        </div>
                    </div>
                    <div className='bottom-total-price'>
                        <div>
                            Total before taxes
                        </div>
                        <div>
                            ${Math.ceil((targetSpot.price * 5) + (targetSpot.price * .0625) + (targetSpot.price * .1146))}
                        </div>
                    </div>

                    <div className='spot-card-bottom-right-book'>This spot is currently unavailable. </div>
                </div>
            </div>
        </div >

    )
};


export default SpotDetail
