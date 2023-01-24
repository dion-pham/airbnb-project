
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { thunkGetAllSpots, thunkGetSpotById } from '../../store/spots';
import './SearchSplash.css'
// import '../SpotsList/SpotsList.css';

const SearchSplash = () => {
    let { destination } = useParams()
    const dispatch = useDispatch()

    const allSpots = useSelector(state => Object.values(state.spots.allSpots))
    const filteredSpots = allSpots.filter(indSpot => {
        destination = destination.toLowerCase()
        return indSpot.name.toLowerCase().includes(destination) || indSpot.city.toLowerCase().includes(destination) || indSpot.state.toLowerCase().includes(destination) || indSpot.country.toLowerCase().includes(destination)
    })


    const clicketyClack = (id) => {
        dispatch(thunkGetSpotById(id))
    }

    useEffect(() => {
        dispatch(thunkGetAllSpots())
    }, [dispatch]);

    let filteredSpotsResults;
    filteredSpots.length ? filteredSpotsResults = <div className='search-spot-card-outer-container-flex'>
        <div className='search-spot-card-inner-container-grid'>
            {filteredSpots.map((spot) => (
                <div key={spot.id} className='search-spot-card'>
                    <Link className='search-spot-card-link' to={`/spots/${spot.id}`}
                        onClick={(() => clicketyClack(spot.id))}
                    >
                        <img src={spot?.previewImage} alt="Spot's image" className='search-spot-card-image'></img>
                        <div className='search-spot-card-inner-information'>
                            <div className='search-spot-card-inner-location'>
                                {spot.city}, {spot.state}
                            </div>
                            <div>
                                <i className="fa-solid fa-star"></i> {typeof spot.avgRating === "number" ? parseFloat(spot.avgRating).toFixed(1) : spot.avgRating}
                            </div>
                        </div>
                        <div className='search-spot-price'>${spot.price} per night</div>
                    </Link>
                </div >
            ))}
        </div>
    </div> :
        filteredSpotsResults = <div className='search-none-found'>
            0 search results matching '{destination}'
        </div>

    return (
        <div>
            {filteredSpotsResults}
        </div >
    );
}

export default SearchSplash
