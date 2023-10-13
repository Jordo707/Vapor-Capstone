//react-app/src/components/NewGameModal/newGameModal.js

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { getSingleGame, getAllGames, postGame } from "../../store/games";
import { useModal } from "../../context/Modal";
import "./newGameModal.css"

const NewGameForm = () => {
    const userId = useSelector(state => state.session.user.id);
    const [errorMessages, setErrorMessages] = useState({});
    const dispatch = useDispatch();
    const history = useHistory();
    const [name, setName] = useState('');
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState('');
    const [previewImage, setPreviewImage] = useState('')
    const { isOpen, openModal,closeModal } = useModal();

    const updateName = (e) => setName(e.target.value);
    const updatePrice = (e) => setPrice(e.target.value);
    const updateDescription = (e) => setDescription(e.target.value);
    const updatePreviewImage = (e) => setPreviewImage(e.target.value);

    const validateImageUrl = (url) => {
        return new Promise((resolve) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(true);
          img.onerror = () => resolve(false);
        });
      };

    const handleGameCreate = async (e) => {
        e.preventDefault();
        const validationErrors = {}
        if (name.trim() == '') {
            validationErrors.name = 'Game name is required'
        }
        if (name.trim().length < 3) {
            validationErrors.name = 'Game name must be at least three characters long'
        }
        if (price <= 0) {
            validationErrors.price = 'Price cannot be less than or equal to zero'
        }
        if (description.trim() == '') {
            validationErrors.description = 'Description is required'
        }
        if (description.trim().length < 10) {
            validationErrors.description = 'Description must be at least ten characters in length'
        }
        if (previewImage.trim().length < 1) {
            validationErrors.previewImage = 'Preview Image is required'
        } else {
            // Validate the URL format
            const urlPattern = /^(http(s)?:\/\/.*\.(jpg|jpeg|png))$/;
            if (!urlPattern.test(previewImage)) {
              validationErrors.previewImage =
                "Invalid image URL. It should point to a .jpg, .jpeg, or .png image.";
            }

            // Load the image to validate it
            const isImageValid = await validateImageUrl(previewImage);
            if (!isImageValid) {
              validationErrors.previewImage =
                "The URL does not point to a valid image.";
            }
        }


        const payload = {
            name: name.trim(),
            price: price,
            developer_id: userId,
            description: description,
            preview_image: previewImage
        };
        if (Object.keys(validationErrors).length == 0) {
            try {
                const response = await dispatch(postGame(payload));
                console.log('RESPONSE CREATE GAME:', response)
                const newGameId = response.id;
                closeModal()
                history.push(`/store/${newGameId}`)
            } catch (error) {
                // If error is not a ValidationError, add slice at the end to remove extra
                // "Error: "
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
        <div className={`new-game-container ${isOpen ? 'open' : ''}`}>
            <h2>Create a New Game</h2>
            <form className="new-game-form" onSubmit={handleGameCreate}>
                <div>
                    <label>
                        Game Title
                    </label>
                    <div className="game-errors">{errorMessages.name}</div>
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
                    <div className="game-errors">{errorMessages.price}</div>
                    <input
                        type="number"
                        placeholder="USD"
                        step="0.01"
                        value={price}
                        onChange={updatePrice}
                    />
                </div>

                <div>
                    <label>
                        Description
                    </label>
                    <div className="game-errors">{errorMessages.description}</div>
                    <textarea
                        placeholder="Describe the game"
                        value={description}
                        onChange={updateDescription}
                        maxLength={2000}
                    />
                </div>

                <div>
                    <label>
                        Preview Image
                    </label>
                    <div className="game-errors">{errorMessages.previewImage}</div>
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={previewImage}
                        onChange={updatePreviewImage}
                    />
                </div>

                <div className="create-new-game-buttons-container">
                    <button className="create-new-game-button-modal" type='submit'>Publish Your Game</button>
                    <button className="create-new-game-cancel-button-modal" type='button' onClick={handleCancelClick}>Cancel</button>
                </div>

            </form>
        </div>
    );
};

export default NewGameForm
