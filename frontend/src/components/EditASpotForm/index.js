import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { thunkUpdateSpot } from '../../store/spots';
import { thunkDeleteSpot } from '../../store/spots';
import './EditASpotForm.css'

const isLat = number => {
    if (Math.abs(number) <= 90) return true
}
const isLng = number => {
    if (Math.abs(number) <= 180) return true
}

const validatePrice = number => {
    const regexValidator = /^(\$|)([1-9]\d{0,2}(\,\d{3})*|([1-9]\d*))(\.\d{2})?$/;
    if (number.match(regexValidator)) return true
}

const EditASpotForm = () => {
    const { spotId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    // useEffect(() => {
    //     dispatch(thunkGetSpotById(spotId));
    // }, [dispatch, spotId]);
    // console.log(spots, 'SPOTS')
    // const targetSpot = useSelector(state => state.spots.singleSpot)
    // const targetSpot = spot[spotId]
    const targetSpot = useSelector(state => state.spots.allSpots[+spotId])
    // console.log(targetSpot, "targetspot")
    // // gets a single spot based off the spotId

    const [address, setAddress] = useState(targetSpot ? targetSpot.address : "")
    const [city, setCity] = useState(targetSpot ? targetSpot.city : "")
    const [state, setState] = useState(targetSpot ? targetSpot.state : "")
    const [country, setCountry] = useState(targetSpot ? targetSpot.country : "")
    const [lat, setLat] = useState(targetSpot ? targetSpot.lat : "")
    const [lng, setLng] = useState(targetSpot ? targetSpot.lng : "")
    const [name, setName] = useState(targetSpot ? targetSpot.name : "")
    const [description, setDescription] = useState(targetSpot ? targetSpot.description : "")
    const [price, setPrice] = useState(targetSpot ? targetSpot.price : "")
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false);
    // console.log(targetSpot.address, "address")

    // const [address, setAddress] = useState('')
    // const [city, setCity] = useState('')
    // const [state, setState] = useState('')
    // const [country, setCountry] = useState('')
    // const [lat, setLat] = useState('')
    // const [lng, setLng] = useState('')
    // const [name, setName] = useState('')
    // const [description, setDescription] = useState('')
    // const [price, setPrice] = useState('')
    // const [validationErrors, setValidationErrors] = useState([])
    // const [hasSubmitted, setHasSubmitted] = useState(false);

    // add sessionUser validation??

    useEffect(() => {
        const errors = []
        if (name.length === 0) {
            errors.push("Name field is required")
        } else if (name.length > 50) {
            errors.push("Name must be less than 50 characters")
        } else if (address.length === 0) {
            errors.push("Address field is required")
        } else if (city.length === 0) {
            errors.push("City field is required")
        } else if (state.length === 0) {
            errors.push("State field is required")
        } else if (country.length === 0) {
            errors.push("Country field is required")
        } else if (!isLat(lat)) {
            errors.push("Latitude field must be less than or equal to 90 ")
        } else if (!isLng(lng)) {
            errors.push("Longitude field must be less than or equal to 180")
        } else if (description.length === 0) {
            errors.push("Description is required")
        } else if (!validatePrice(price)) {
            errors.push("Please enter a valid price")
        }
        setValidationErrors(errors)
    }, [name, address, city, state, country, lat, lng, description, price])

    // if (!targetSpot) return null

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        if (validationErrors.length) return alert('Cannot submit')

        const payload = {
            address,
            city,
            state,
            country,
            lat,
            lng,
            name,
            description,
            price
        };

        let createdSpot = await dispatch(thunkUpdateSpot(spotId, payload))
        if (createdSpot) {
            history.push(`/spots/${spotId}`);
            // setAddress('')
            // setCity('')
            // setState('')
            // setCountry('')
            // setLat('')
            // setLng('')
            // setName('')
            // setDescription('')
            // setPrice('')
            setValidationErrors([]);
            setHasSubmitted(false);
            // hideForm();
        }
    };

    return (
        <section className='new-form-container'>
            {hasSubmitted && validationErrors.length > 0 && (
                <div>
                    The following errors were found:
                    <ul>
                        {validationErrors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form className='create-spot-form' onSubmit={handleSubmit}>
                <label>Edit your Home!</label>
                <input
                    type="name"
                    placeholder='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <input
                    type="address"
                    placeholder='address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input
                    type="city"
                    placeholder='city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)} />
                <input
                    type="state"
                    placeholder='state'
                    value={state}
                    onChange={(e) => setState(e.target.value)} />
                <input
                    type="country"
                    placeholder='country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)} />
                <input
                    type="lat"
                    placeholder='latitude'
                    value={lat}
                    onChange={(e) => setLat(e.target.value)} />
                <input
                    type="lng"
                    placeholder='longitude'
                    value={lng}
                    onChange={(e) => setLng(e.target.value)} />
                <input
                    type="description"
                    placeholder='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                <input
                    type="price"
                    placeholder='price'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />
                <button>
                    Submit
                </button>
            </form>
            <button onClick={() => {
                dispatch(thunkDeleteSpot(spotId))
                return history.push(`/`);
            }}>
                Delete spot
            </button>
        </section>
    )
}


export default EditASpotForm;
