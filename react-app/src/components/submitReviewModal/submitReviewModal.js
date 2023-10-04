// react-app/components/submitReviewModal/submitReviewModal.js

import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useState } from "react";
import { postReview } from "../../store/reviews";

const SubmitReviewModal = () => {
    const userId = useSelector(state => state.session.user.id);
    const gameId = useSelector(state => state.games.selectedGame.game.id)
    const dispatch = useDispatch();
    const history = useHistory();
    const [errorMessages,setErrorMessages] = useState({});
    const [recomended,setRecomended] = useState(true);
    const [reviewText,setReviewText] = useState('');
    const { closeModal } = useModal();

    const updateRecomended = (e) => setRecomended(e.target.checked);
    const updateReviewText = (e) => setReviewText(e.target.value);

    const handleReviewCreate = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (reviewText.trim() == '') {
            validationErrors.reviewText = 'Review Text is Required'
        }
        if (reviewText.trim().length < 3) {
            validationErrors.reviewText = 'Review must be at least three characters in length'
        }

        const payload = {
            recomended:recomended,
            game_id:gameId,
            user_id:userId,
            review_text:reviewText
        };

        if (Object.keys(validationErrors).length == 0) {
            try {
                const response = await dispatch(postReview(payload));
                console.log('RESPONSE CREATE REVIEW: ', response)
                const newReviewId = response.id;
                closeModal();
                history.push(`/store/${newReviewId.game_id}`)
            } catch (error) {
                setErrorMessages({ overall: error.toString().slice(7) })
            }
        } else {
            setErrorMessages(validationErrors)
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal()
    };

    return (
        <div className="new-review-container">
            <h2>Share Your Thoughts on this Game</h2>
            <form className="new-review-form">
                <div>
                    <label>
                        Recomended?
                    </label>
                    <input
                        type='checkbox'
                        checked={recomended}
                        onChange={updateRecomended}
                    />
                </div>

                <div>
                    <label>
                        Explain your reasoning:
                    </label>
                    <input
                        type="text"
                        placeholder="Your thoughts here..."
                        minLength={3}
                        maxLength={255}
                        required
                        value={reviewText}
                        onChange={updateReviewText}
                    />
                </div>

                <div className="create-new-review-button-container">
                    <button className="create-new-review-cancel-button" type="button" onClick={handleCancelClick}>Cancel</button>
                    <button className="create-new-review-button" type='button' onClick={handleReviewCreate}>Post Your Review</button>
                </div>
            </form>
        </div>
    )
}

export default SubmitReviewModal
