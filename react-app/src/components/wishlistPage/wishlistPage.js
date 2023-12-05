import { useDispatch, useSelector } from "react-redux";
import React, {useEffect} from "react";
import OpenModalButton from "../OpenModalButton";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
import { getUserWishlist } from "../../store/games";
import './wishlistPage.css'

const WishlistPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const wishlistGames = useSelector( state => state.games.wishlist);
    const sessionUserId = useSelector( state => state.session.user?.id);

    useEffect( async () => {
        await dispatch(getUserWishlist(sessionUserId))
    },[dispatch])

    console.log('Wishlist Game Data: ', wishlistGames);

    if (!wishlistGames?.length) {
        return <div>Loading...</div>
    }

    return (
        <>
            <div className="wishlist-games">
                {wishlistGames.map((game)=> (
                    <>
                        <Link to={`/store/${game.id}`}>
                            <div className="wish-game-card" key={game.id}>
                                <img
                                    className="game-preview-image"
                                    src={game.preview_image_url || "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo0nwDRO1dYTQIhm9Sz8sA20Wqk8xaiNyhQg&usqp=CAU"}
                                />
                                <div className="game-info">
                                    <h3>{game.name}</h3>
                                    <p>{game.description}</p>
                                    <p>Price: ${game.price}</p>
                                </div>
                            </div>
                        </Link>
                    </>
                ))}
            </div>
        </>
    )


}

export default WishlistPage
