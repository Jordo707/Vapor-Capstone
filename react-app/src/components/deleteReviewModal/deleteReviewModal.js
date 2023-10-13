// react-app/src/components/deleteReviewModal/deleteReviewModal.js

import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteReview } from "../../store/reviews";
import { getSingleGame } from "../../store/games";
import './deleteReviewModal.css'

const DeleteReviewModal = ({review}) => {

    const {closeModal} = useModal();
    const dispatch = useDispatch();
    const gameId = review.game_id

    const deleteReviewHandler = async (e) => {
        e.preventDefault();
        await dispatch(deleteReview(review.id));
        await dispatch(getSingleGame(gameId))
        closeModal();
    }

    const cancelReviewDelete = (e) => {
        closeModal()
    }

    return (
        <div className="delete-review-container">
            <div>
                <h2>Delete Review?</h2>
                <h4>Are you sure you want to delete this review? Your insights may be helpful for others...</h4>
            </div>
            <div className="delete-review-modal-buttons">
                <button className="cancel-delete-review" onClick={cancelReviewDelete}>Cancel</button>
                <button className="confirm-delete-review" onClick={deleteReviewHandler}>Yes, Remove this Review</button>
            </div>
        </div>
    )
}

export default DeleteReviewModal
