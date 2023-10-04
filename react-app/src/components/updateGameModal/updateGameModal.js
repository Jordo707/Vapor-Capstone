//react-app/src/components/updateGameModal/updateGameModal.js

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getSingleGame, getAllGames, updateGame } from "../../store/games";
import { useModal } from "../../context/Modal";

const UpdateGameForm = () => {
    const userId = useSelector(state => state.session.user.id);
    const gameToUpdate = useSelector(state => state.games.selectedGame.game)
    const [errorMessages, setErrorMessages] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();

    // Destructure properties from selectedGame
    // const { game, reviews } = selectedGame;
    const [name, setName] = useState(gameToUpdate?.name ||'');
    const [price, setPrice] = useState(gameToUpdate?.price ||0);
    const [description, setDescription] = useState(gameToUpdate?.description ||'');
    const { closeModal } = useModal();


    console.log('GAME TO UPDATE', gameToUpdate)

    const updateName = (e) => setName(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);

    const handleGameUpdate = async (e) => {
        e.preventDefault();
        console.log('HANDLE GAME UPDATE')
        const validationErrors = {}
        if (name.trim() == '') {
            validationErrors.name = 'Game name is required'
        }
        if (name.trim().length < 3) {
            validationErrors.name = 'Game name must be at least three characters long'
        }
        if (price < 0) {
            validationErrors.price = 'Price cannot be less than zero'
        }
        if (description.trim() == '') {
            validationErrors.description = 'Description is required'
        }
        if (description.trim().length < 10) {
            validationErrors.description = 'Description must be at least ten characters in length'
        }

        const payload = {
            name: name.trim(),
            price: price,
            developer_id: userId,
            description: description,
            id:gameToUpdate.id
        };
        console.log('PAYLOAD', payload)
        if (Object.keys(validationErrors).length == 0) {
            console.log('NO VALIDATION ERRORS')
            try {
                const response = await dispatch(updateGame(payload));
                console.log('RESPONSE UPDATE GAME:', response)
                // const newGameId = response.id;
                await dispatch(getSingleGame(gameToUpdate.id))
                closeModal()
                // history.push(`/store/${newGameId}`)
            } catch (error) {
                console.error('Error updating game:', error);
                console.log(error)
                setErrorMessages({ overall: error.toString().slice(7) });
            }
        } else {
            setErrorMessages(validationErrors)
        }
    };

    const handleCancelClick = (e) => {
        e.preventDefault();
        closeModal()
    };

    if (!gameToUpdate) {
        return <div>Loading...</div>;
    }

    return (
        <div className="new-game-container">
            <h2>Update Your Game</h2>
            <form className="new-game-form" onSubmit={handleGameUpdate}>
                <span className="game-errors">{errorMessages.name}</span>
                <div>
                    <label>
                        Game Title
                    </label>
                    <input
                        type='text'
                        placeholder="Game Title"
                        maxLength={50}
                        minLength={3}
                        required
                        value={name}
                        onChange={updateName}
                    />
                </div>

                <div>
                    <label>
                        Price
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={price}
                        onChange={updatePrice}
                    />
                </div>

                <div>
                    <label>
                        Description
                    </label>
                    <input
                        type='text'
                        value={description}
                        onChange={updateDescription}
                    />
                </div>

                <div className="create-new-game-buttons-container">
                    <button className="create-new-game-cancel-button-modal" type='button' onClick={handleCancelClick}>Cancel</button>
                    <button className="create-new-game-button-modal" type='submit'>Update Your Game</button>
                </div>

            </form>
        </div>
    );
};

export default UpdateGameForm
