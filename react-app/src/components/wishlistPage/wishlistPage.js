import { useDispatch, useSelector } from "react-redux";
import React, {useEffect} from "react";
import OpenModalButton from "../OpenModalButton";
import { useHistory, Link } from "react-router-dom/cjs/react-router-dom.min";
import './wishlistPage.css'

const WishlistPage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const wishlistGames = useSelector( state => state.games.wishlistGames);
    const sessionUserId = useSelector( state => state.session.user?.id);

    console.log('Wishlist Game Data: ', wishlistGames);

    if (!wishlistGames.length) {
        return <div>Loading...</div>
    }

    

}
