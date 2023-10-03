import { useDispatch, useSelector } from "react-redux";
import React, {useEffect, useState} from "react";
import OpenModalButton from "../OpenModalButton";
import { getAllGames } from "../../store/games";
import { useHistory } from "react-router-dom";
import NewGameForm from "../NewGameModal/newGameModal";

const StorePageMain = () => {


    const history = useHistory();
    const dispatch = useDispatch();
    const allGames = useSelector( state => state.games.allGames )

    useEffect( async () => {
        await dispatch(getAllGames())
    }, [dispatch])



    console.log('allGames Data: ', allGames);

    if (!allGames.length) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className="store-games">
                {allGames.map((game) => (
                    <div className="game-card" key={game.id}>
                        <h3>{game.name}</h3>
                        <p>{game.description}</p>
                        <p>Price: ${game.price}</p>
                    </div>
                ))}
            </div>
            <div className="new-game-button">
                    <OpenModalButton
                        modalComponent={<NewGameForm />}
                        buttonText="Publish a New Game"
                    />
            </div>
        </>
    );

}

export default StorePageMain
