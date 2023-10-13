// react-app/src/components/submitReviewModal/submitReviewModal.js

import { useModal } from "../../context/Modal";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { postReview } from "../../store/reviews";
import { getSingleGame } from "../../store/games";
import './submitReviewModal.css'

const SubmitReviewModal = () => {
    const userId = useSelector(state => state.session.user.id);
    const selectedGame = useSelector(state => state.games.selectedGame);
    const dispatch = useDispatch();
    const [errorMessages, setErrorMessages] = useState({});
    const [recomended, setRecomended] = useState(true);
    const [reviewText, setReviewText] = useState('');
    const { closeModal } = useModal();

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
            game_id: gameId, // Use gameId obtained from state
            user_id: userId,
            review_text: reviewText
        };

        if (Object.keys(validationErrors).length === 0) {
            try {
                const response = await dispatch(postReview(payload));
                console.log('RESPONSE CREATE REVIEW: ', response);
                const newReviewId = response.id;
                await dispatch(getSingleGame(gameId));
                closeModal();
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
                    <button className="create-new-review-button" type='submit' onClick={handleReviewCreate}>Post Your Review</button>
                    <button className="create-new-review-cancel-button" type="button" onClick={handleCancelClick}>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default SubmitReviewModal;
