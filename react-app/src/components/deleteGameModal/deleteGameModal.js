// react-app/src/components/deleteGameModal/deleteGameModal.js

import { useModal } from "../../context/Modal";
import { useDispatch } from "react-redux";
import { deleteGame, getAllGames } from "../../store/games";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const DeleteGameModal = ({game}) => {
    const {closeModal} = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const deleteGameHandler = async (e) => {
        e.preventDefault();
        await dispatch(deleteGame(game.id));
        await dispatch(getAllGames());
        history.push('/store');
        closeModal();
    }

    const cancelGameDelete = (e) => {
        closeModal();
    }

    return (
        <div className="delete-game-container">
            <div>
                <h2>Delete Game</h2>
                <h4>Are you sure you want to remove this game from Vapor? Think of your fans...</h4>
            </div>
            <div className="delete-game-buttons-container">
                <button className="cancel-delete-game-button" onClick={cancelGameDelete}>Cancel</button>
                <button className="delete-game-confirm" onClick={deleteGameHandler}>Yes, Remove the Game</button>
            </div>
        </div>
    )
}

export default DeleteGameModal
