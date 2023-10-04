// react-app/src/components/gameStorePage/gameStorePage.js

import { useDispatch, useSelector } from "react-redux";
import React, {useEffect, useState} from "react";
import OpenModalButton from "../OpenModalButton";
import { getSingleGame } from "../../store/games";
import { useHistory, useParams } from "react-router-dom";
import DeleteGameModal from "../deleteGameModal/deleteGameModal";

const GameStorePage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const game = useSelector( state => state.games.selectedGame)
    const sessionUserId = useSelector(state => state.session.user.id)

    const { gameId } = useParams()

    useEffect( async () => {
        await dispatch(getSingleGame(gameId))
    }, [dispatch])

    console.log('GAME DATA: ', game)

    if (!game) {
        return <div>Loading...</div>
    }

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

        </>
    )
}

export default GameStorePage
