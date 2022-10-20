import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { thunkGetAllSpots, thunkGetSpotById } from '../../store/spots';

import './SpotsList.css';

const SpotsList = () => {
    const spotList = useSelector((state) => Object.values(state.spots.allSpots))
    const sessionUser = useSelector((state) => state.session.user)
    const dispatch = useDispatch()

    const clicketyClack = (id) => {
        dispatch(thunkGetSpotById(id))
    }

    useEffect(() => {
        dispatch(thunkGetAllSpots())
    }, [dispatch]);

    // let createLinkAccountLink;
    // if (sessionUser) {
    //     createLinkAccountLink = (
    //         <div>
    //             <div>
    //                 <Link to='/spots/create'>Create a home for the phamily</Link>
    //             </div>
    //             {/* <div>
    //                 <Link to='/account'>Account details</Link>
    //             </div> */}
    //         </div>
    //     )
    // }

    if (!spotList.length) return null
    return (
        <div >

            <div className='spot-card-outer-container-flex'>
                <h1>Phamily Home Page</h1>
                <div className='spot-card-inner-container-grid'>
                    {spotList.map((spot) => (
                        <div key={spot.id} className='spot-card'>
                            <Link to={`/spots/${spot.id}`}
                                onClick={(() => clicketyClack(spot.id))}
                            >
                                <img src={spot?.previewImage} alt="Spot's image" className='spot-card-image'></img>
                                <div className='spot-card-inner-information'>
                                    <div className='spot-card-inner-location'>
                                        {spot.city}, {spot.state}
                                    </div>
                                    <div>
                                        <i class="fa-solid fa-star"></i> {spot.avgRating}
                                    </div>
                                </div>

                                <div>${spot.price} per night</div>
                            </Link>
                        </div >
                    ))}
                </div>
            </div>
        </div >
    );
};
export default SpotsList;
