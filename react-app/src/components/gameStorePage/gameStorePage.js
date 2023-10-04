// react-app/src/components/gameStorePage/gameStorePage.js

import { useDispatch, useSelector } from "react-redux";
import React, {useEffect, useState} from "react";
import OpenModalButton from "../OpenModalButton";
import { getSingleGame } from "../../store/games";
import { useHistory, useParams } from "react-router-dom";
import DeleteGameModal from "../deleteGameModal/deleteGameModal";
import UpdateGameForm from "../updateGameModal/updateGameModal";

const GameStorePage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const game = useSelector( state => state.games.selectedGame.game)
    const reviews = useSelector (state => state.games.selectedGame.reviews)
    const sessionUserId = useSelector(state => state.session.user.id)

    console.log('SINGLE GAME REVIEWS',reviews)

    const { gameId } = useParams()

    useEffect( async () => {
        await dispatch(getSingleGame(gameId))
    }, [dispatch])

    console.log('GAME DATA: ', game)

    if (!game) {
        return <div>Loading...</div>
    }

    const isDeveloper = game.developer_id == sessionUserId;
    const hasReviewed = reviews.some((review) => review.review.user_id === sessionUserId);
    const shouldRenderButton = !isDeveloper && !hasReviewed;

    return (
        <>
            <div className="game-store-div">
                <h3>{game.name}</h3>
                <p>{game.description}</p>
                <p>Price: ${game.price}</p>
            </div>

            <span hidden={sessionUserId !== game.developer_id}>
                <OpenModalButton
                    modalComponent={<DeleteGameModal game={game}/>}
                    buttonText='Remove Game'
                />
            </span>
            <span hidden={sessionUserId !== game.developer_id}>
                <OpenModalButton
                    modalComponent={<UpdateGameForm game={game}/>}
                    buttonText='Update Game'
                />
            </span>
            <div className="reviews-container">
                <h3>Reviews</h3>
                {reviews.length === 0 ? (
                    <p>No reviews exist for this game.</p>
                ) : (
                    reviews.map((review) => (
                    <div className="review-box" key={review.review.id}>
                        <h4>{review.review.recomended ? 'Recommended' : 'Not Recommended'}</h4>
                        <p>{review.review.review_text}</p>
                        <p>{review.user.username}</p>
                    </div>
                    ))
                )}
                {shouldRenderButton && (
                    <button>Add Review</button>
                )}
            </div>
        </>
    )
}

export default GameStorePage
