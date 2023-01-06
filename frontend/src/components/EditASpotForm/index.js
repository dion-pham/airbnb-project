import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, useHistory, useParams } from 'react-router-dom';
import { thunkUpdateSpot, thunkDeleteSpot, thunkCreateSpotImage, thunkGetAllSpots, thunkGetSpotById } from '../../store/spots';
import './EditASpotForm.css'

const EditASpotForm = () => {
    const { spotId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const targetSpot = useSelector(state => state.spots.singleSpot)

    useEffect(() => {
        dispatch(thunkGetSpotById(spotId))
    }, [dispatch])

    const [address, setAddress] = useState(targetSpot ? targetSpot.address : "")
    const [city, setCity] = useState(targetSpot ? targetSpot.city : "")
    const [state, setState] = useState(targetSpot ? targetSpot.state : "")
    const [country, setCountry] = useState(targetSpot ? targetSpot.country : "")
    const [name, setName] = useState(targetSpot ? targetSpot.name : "")
    const [description, setDescription] = useState(targetSpot ? targetSpot.description : "")
    const [price, setPrice] = useState(targetSpot ? targetSpot.price : "")
    // const [url, setUrl] = useState(targetSpot ? targetSpot.SpotImages[0].url : "")
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = []
        if (name?.length === 0) {
            errors.push("Name field is required")
        }
        if (name?.length > 50) {
            errors.push("Name must be less than 50 characters")
        }
        if (address?.length === 0) {
            errors.push("Address field is required")
        }
        if (address?.length > 50) {
            errors.push("Address field must be less than 50 characters")
        }
        if (city?.length === 0) {
            errors.push("City field is required")
        }
        if (city?.length > 50) {
            errors.push("City field must be less than 50 characters")
        }
        if (state?.length === 0) {
            errors.push("State field is required")
        }
        if (state?.length > 50) {
            errors.push("State field must be less than 50 characters")
        }
        if (country?.length === 0) {
            errors.push("Country field is required")
        }
        if (country?.length > 50) {
            errors.push("Country field must be less than 50 characters")
        }
        if (description?.length === 0) {
            errors.push("Description is required")
        }
        if (description?.length > 256) {
            errors.push("Description must be less than 50 characters")
        }
        if (!validatePrice(price)) {
            errors.push("Please enter a valid price")
        }
        if (price?.length === 0) {
            errors.push("Price field is required")
        }
        if (price < 0) {
            errors.push("Price field must be valid")
        }
        // additional url validations
        setValidationErrors(errors)
    }, [name, address, city, state, country, description, price])

    const targetSpotArray = Object.values(targetSpot)
    if (!targetSpotArray.length) return null

    const deleteSpot = () => {
        const deletedSpot = dispatch(thunkDeleteSpot(spotId))
        if (deletedSpot) {
            return history.push('/spots')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        if (validationErrors.length) return alert('Cannot submit')

        const payload = {
            address,
            city,
            state,
            country,
            name,
            description,
            price
        };

        let edittedSpot = await dispatch(thunkUpdateSpot(spotId, payload))
        if (edittedSpot) {
            history.push(`/spots/${spotId}`);
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
                            <li key={error}> <i className='fa fa-exclamation-circle' /> {error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form className='create-spot-form' onSubmit={handleSubmit}>
                <label>Edit your Home!</label>
                <input
                    type="text"
                    placeholder='name'
                    value={name}
                    onChange={(e) => setName(e.target.value)} />
                <input
                    type="text"
                    placeholder='address'
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input
                    type="text"
                    placeholder='city'
                    value={city}
                    onChange={(e) => setCity(e.target.value)} />
                <input
                    type="text"
                    placeholder='state'
                    value={state}
                    onChange={(e) => setState(e.target.value)} />
                <input
                    type="text"
                    placeholder='country'
                    value={country}
                    onChange={(e) => setCountry(e.target.value)} />
                <input
                    type="text"
                    placeholder='description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} />
                <input
                    type="text"
                    placeholder='price per night'
                    value={price}
                    onChange={(e) => setPrice(e.target.value)} />
                <button>
                    Submit
                </button>
            </form>
            <button className='delete-button' onClick={() => {
                deleteSpot()
            }}>
                Delete spot
            </button>
        </section>
    )
}

// const isLat = number => {
//     if (Math.abs(number) <= 90) return true
// }
// const isLng = number => {
//     if (Math.abs(number) <= 180) return true
// }

const validatePrice = number => {
    if (isFinite(number)) return true
}


export default EditASpotForm;
