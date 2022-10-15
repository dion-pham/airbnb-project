import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { thunkGetAllSpots } from '../../store/spots';

import './SpotsList.css';
// import css

const SpotsList = () => {
    const dispatch = useDispatch()
    const spotList = useSelector((state) => Object.values(state.spots.allSpots))

    useEffect(() => {
        dispatch(thunkGetAllSpots());
    }, [dispatch]);

    if (!spotList) return null
    return (
        <>
            <h1>Spot List</h1>
            <ul>
                {spotList.map((ele) => (
                    <li key={ele.id} className='spot-card'>{ele.name}</li>
                ))}
            </ul>

        </>
    );
};
export default SpotsList;
