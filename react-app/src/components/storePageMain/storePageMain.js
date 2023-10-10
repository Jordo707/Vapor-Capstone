import { useDispatch, useSelector } from "react-redux";
import React, {useEffect, useState} from "react";
import OpenModalButton from "../OpenModalButton";
import { getAllGames } from "../../store/games";
import { useHistory, Link } from "react-router-dom";
import NewGameForm from "../NewGameModal/newGameModal";
import './storePageMain.css'

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
                        <img
                            className="game-preview-image"
                            src={game.preview_image_url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo0nwDRO1dYTQIhm9Sz8sA20Wqk8xaiNyhQg&usqp=CAU"}
                        />
                        <h3>{game.name}</h3>
                        <p>{game.description}</p>
                        <p>Price: ${game.price}</p>
                        <Link to={`/store/${game.id}`}>Store Page</Link>
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
