// react-app/src/components/updateReviewModal/updateReviewModal.js

// react-app/src/components/submitReviewModal/submitReviewModal.js

import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { updateReview } from "../../store/reviews";
import { getSingleGame } from "../../store/games";

const UpdateReviewModal = ({review}) => {
    const userId = useSelector(state => state.session.user.id);
    const selectedGame = useSelector(state => state.games.selectedGame);
    const dispatch = useDispatch();
    const [errorMessages, setErrorMessages] = useState({});
    const [recomended, setRecomended] = useState(review.recomended);
    const [reviewText, setReviewText] = useState(review.review_text);
    const { closeModal } = useModal();

    console.log('REVIEW:', review)

    useEffect(() => {
        // Check if selectedGame is defined before accessing its properties
        if (selectedGame && selectedGame.game) {
            setGameId(selectedGame.game.id);
        }
    }, [selectedGame]);

    const [gameId, setGameId] = useState(null); // Initialize gameId as null

    const updateRecomended = (e) => setRecomended(e.target.checked);
    const updateReviewText = (e) => setReviewText(e.target.value);

    const handleReviewCreate = async (e) => {
        e.preventDefault();
        const validationErrors = {};
        if (reviewText.trim() === '') {
            validationErrors.reviewText = 'Review Text is Required';
        }
        if (reviewText.trim().length < 3) {
            validationErrors.reviewText = 'Review must be at least three characters in length';
        }

        if (gameId === null) {
            // Handle the case where gameId is null (not available)
            setErrorMessages({ overall: 'Game information not available.' });
            return;
        }

        const payload = {
            recomended: recomended,
            game_id: gameId,
            user_id: userId,
            id: review.id,
            review_text: reviewText
        };

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await dispatch(updateReview(payload));
                console.log('RESPONSE UPDATE REVIEW: ', response);
                const newReviewId = response.id;
                await dispatch(getSingleGame(gameId));
                closeModal();
                // history.push(`/store/${newReviewId.game_id}`)
            } catch (error) {
                setErrorMessages({ overall: error.toString().slice(7) });
            }
        } else {
            setErrorMessages(validationErrors);
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal();
    };

    return (
        <div className="new-review-container">
            <h2>Share Your Thoughts on this Game</h2>
            <form className="new-review-form">
                <div>
                    <label>
                        Recommended?
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
                    <textarea
                        placeholder="Your thoughts here..."
                        minLength={3}
                        maxLength={255}
                        required
                        value={reviewText}
                        onChange={updateReviewText}
                    />
                </div>

                <div className="create-new-review-button-container">
                    <button className="create-new-review-button" type='button' onClick={handleReviewCreate}>Update Your Review</button>
                    <button className="create-new-review-cancel-button" type="button" onClick={handleCancelClick}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default UpdateReviewModal;
