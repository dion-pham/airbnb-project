import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { thunkCreateReview } from '../../store/reviews';
import { thunkGetAllReviewsBySpotId } from '../../store/reviews';
import { thunkGetAllSpots, thunkGetSpotById } from '../../store/spots';
import './CreateReviewForm.css'

const CreateReviewForm = () => {
    const { spotId } = useParams()
    const history = useHistory()
    const dispatch = useDispatch()

    const userId = useSelector(state => state.session.user.id)
    // console.log(userId)

    const [review, setReview] = useState("")
    const [stars, setStars] = useState("")
    const [validationErrors, setValidationErrors] = useState([])
    const [hasSubmitted, setHasSubmitted] = useState(false);

    useEffect(() => {
        const errors = []
        if (review.length === 0) {
            errors.push("Review field is required")
        }
        if (!stars) {
            errors.push("Stars are required")
        }
        if (stars < 0 || stars > 5) {
            errors.push("Stars must be between 0-5")
        }
        setValidationErrors(errors)
    }, [review, stars])

    const handleSubmit = async (e) => {
        e.preventDefault();
        setHasSubmitted(true)
        if (validationErrors.length) return alert('Cannot submit')

        const payload = {
            review,
            stars
        };

        let createdReview = await dispatch(thunkCreateReview(spotId, payload))
        if (createdReview) {
            history.push(`/spots/${spotId}`);
            setReview('')
            setStars(0)
            setValidationErrors([]);
            setHasSubmitted(false);
            // hideForm();
        }
        dispatch(thunkGetSpotById(spotId))
        dispatch(thunkGetAllReviewsBySpotId(spotId))


    }


    return (
        <section className='new-review-container'>
            {hasSubmitted && validationErrors.length > 0 && (
                <div>
                    The following errors were found:
                    <ul>
                        {validationErrors.map((error) => (
                            <li key={error}> <i className='fa fa-exclamation-circle' />  {error}</li>
                        ))}
                    </ul>
                </div>
            )}
            <form className='create-review-form' onSubmit={handleSubmit}>
                <label>How was your stay? Leave a review</label>
                <textarea
                    // type="textarea"
                    placeholder='review'
                    value={review}
                    onChange={(e) => setReview(e.target.value)} />
                <input
                    type="number"
                    placeholder='rating from 0 to 5'
                    value={stars}
                    onChange={(e) => setStars(e.target.value)}
                />
                <button>
                    Submit
                </button>
            </form>
            {/* <button onClick={() => {
                deleteSpot()
            }}>
                Delete spot
            </button> */}
        </section>
    )
}



export default CreateReviewForm;
