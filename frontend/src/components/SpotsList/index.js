import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { thunkGetSpotById } from '../../store/spots';

import './SpotsList.css';

const SpotsList = () => {

    const spotList = useSelector((state) => Object.values(state.spots.allSpots))

    const dispatch = useDispatch()

    const clicketyClack = (id) => {
        dispatch(thunkGetSpotById(id))
    }

    if (!spotList.length) return null
    return (
        <>
            <h1>Home Page</h1>
            {spotList.map((spot) => (
                <div key={spot.id} className='spot-card'>
                    <Link to={`/spots/${spot.id}`}
                        onClick={(() => clicketyClack(spot.id))}
                    >
                        <img src={spot.previewImage} alt="Spot's image" width="265" height="252"></img>
                        <div>{spot.name}</div>
                    </Link>

                </div >
            ))}
        </>
    );
};
export default SpotsList;
