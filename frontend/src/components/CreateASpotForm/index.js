import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Redirect } from 'react-router-dom';
import { thunkCreateSpot, thunkCreateSpotImage } from '../../store/spots';
import './CreateASpotForm.css'



const CreateASpotForm = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user)

    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [state, setState] = useState("")
    const [country, setCountry] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [url, setUrl] = useState("")
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
        if (url.length === 0) {
            errors.push("Url is required")
        }
        if (!url.includes('.', 'jpg', 'jpeg', 'png')) {
            errors.push("Url must be valid")
        }
        if (!url.includes('jpg', 'jpeg', 'png')) {
            errors.push("Url must be valid")
        }
        // additional url validations
        setValidationErrors(errors)
    }, [name, address, city, state, country, description, price, url])

    if (!sessionUser) return <Redirect to="/" />;

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

        const imagePayload = {
            url,
            preview: true
        }

        let createdSpot = await dispatch(thunkCreateSpot(payload))
        if (createdSpot) {
            dispatch(thunkCreateSpotImage(createdSpot.id, imagePayload))
            history.push(`/spots/${createdSpot.id}`)
            setAddress('')
            setCity('')
            setState('')
            setCountry('')
            setName('')
            setDescription('')
            setPrice('')
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
                            <li key={error}><i className='fa fa-exclamation-circle' />  {error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form className='create-spot-form' onSubmit={handleSubmit}>
                <label>Create a spot for the phamily!</label>
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
                <input
                    type="text"
                    placeholder='image url'
                    value={url}
                    onChange={(e) => setUrl(e.target.value)} />
                <button>
                    Create Your Home!
                </button>
            </form>
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

export default CreateASpotForm;
