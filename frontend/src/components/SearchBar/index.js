import { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import './SearchBar.css'


const SearchBar = () => {
    const history = useHistory()
    const [destination, setDestination] = useState('')

    const handleSearch = (e) => {
        // if (!destination) return
        e.preventDefault()
        history.push(`/search/${destination}`)
    }

    return (
        <div>
            <form onSubmit={handleSearch} className='search-bar'>
                <div>
                    <label className='search-bar-label'>Where</label>
                    <input
                        type='text'
                        placeholder='Search destinations'
                        className='search-bar-input'
                        value={destination}
                        onChange={e => setDestination(e.target.value)}
                        maxLength='140'
                    />
                </div>
                <div>
                    <button type='submit' className='search-bar-button'>
                        <i class="fa-solid fa-magnifying-glass-location"></i>
                    </button>
                </div>
            </form>
        </div>
    )
}

export default SearchBar
