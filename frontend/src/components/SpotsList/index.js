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

    let createLinkAccountLink;
    if (sessionUser) {
        createLinkAccountLink = (
            <div>
                <div>
                    <Link to='/spots/create'>Create a home for the phamily</Link>
                </div>
                <div>
                    <Link to='/account'>Account details</Link>
                </div>
            </div>
        )
    }

    if (!spotList.length) return null
    return (
        <>
            <h1>Home Page</h1>
            <div>
                {/* <Link to='/spots/create'>Create a home for the phamily</Link> */}
                {createLinkAccountLink}
            </div>
            {spotList.map((spot) => (
                <div key={spot.id} className='spot-card'>
                    <Link to={`/spots/${spot.id}`}
                        onClick={(() => clicketyClack(spot.id))}
                    >
                        <img src={spot?.previewImage} alt="Spot's image" width="265" height="252"></img>
                        <div>{spot.name}</div>
                    </Link>
                </div >
            ))}
            {/* if conditional is user */}

        </>
    );
};
export default SpotsList;
