import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllSpots } from '../../store/spots';
import { Link } from 'react-router-dom';

import './SpotsList.css';
// import css

const SpotsList = () => {
    // const dispatch = useDispatch()
    const spotList = useSelector((state) => Object.values(state.spots.allSpots))

    // useEffect(() => {
    //     dispatch(thunkGetAllSpots());
    // }, [dispatch]);

    if (!spotList) return null
    return (
        <>
            <h1>Home Page</h1>
            {spotList.map((spot) => (
                <div key={spot.id} className='spot-card'>
                    <Link to={`/api/spots/${spot.id}`}>{spot.name}</Link>
                </div>

            ))}
        </>
    );
};
export default SpotsList;
