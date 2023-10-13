// react-app/src/components/gameStorePage/gameStorePage.js

import { useDispatch, useSelector } from "react-redux";
import React, {useEffect, useState} from "react";
import OpenModalButton from "../OpenModalButton";
import { getSingleGame } from "../../store/games";
import { useHistory, useParams } from "react-router-dom";
import DeleteGameModal from "../deleteGameModal/deleteGameModal";
import UpdateGameForm from "../updateGameModal/updateGameModal";
import SubmitReviewModal from "../submitReviewModal/submitReviewModal";
import UpdateReviewModal from "../updateReviewModal/updateReviewModal";
import DeleteReviewModal from "../deleteReviewModal/deleteReviewModal";
import AliceCarousel from "react-alice-carousel";
import 'react-alice-carousel/lib/alice-carousel.css';
import './GameStorePage.css';

const GameStorePage = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const game = useSelector( state => state.games.selectedGame.game)
    const reviews = useSelector (state => state.games.selectedGame.reviews)
    const sessionUserId = useSelector(state => state.session.user?.id)
    const gameImages = useSelector(state => state.games.selectedGame.images)

    console.log("GAME IMAGES",gameImages)

    const handleDragStart = (e) => e.preventDefault();

    const carouselImages = []

    if (gameImages) {
        gameImages.forEach(gameImage => {
          console.log("GAME IMAGE", gameImage.image.image);
          carouselImages.push(<img className="game-image" src={gameImage.image.image} onDragStart={handleDragStart} role="presentation"/>)
        });
    }

    console.log('SINGLE GAME REVIEWS',reviews)

    const { gameId } = useParams()

    useEffect( async () => {
        await dispatch(getSingleGame(gameId))
    }, [dispatch])

    console.log('GAME DATA: ', game)

    if (!game) {
        return <div>Loading Game Store Page...</div>
    }

    const isDeveloper = game.developer_id == sessionUserId;
    const hasReviewed = reviews.some((review) => review.review.user_id === sessionUserId);
    const shouldRenderButton = !isDeveloper && !hasReviewed && sessionUserId;

    return (
        <>
            <div className="game-header">
                <div className="images-div">
                    <AliceCarousel
                        mouseTracking={true}
                        items={carouselImages}
                        autoPlay={true}
                        keyboardNavigation={true}
                        autoPlayInterval={4000}
                        infinite={true}
                        responsive={{
                            // 0: {
                                items: 1,
                                itemsFit: 'fill',
                            // },
                            // 1024: {
                                // items: 1,
                                // itemsFit: 'fill'
                            // }
                          }}
                        />
                </div>

                <div className="game-store-div">
                    <h3>{game.name}</h3>
                    <p>{game.description}</p>
                    <p>Price: ${game.price}</p>
                </div>
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
                        {review.user.id === sessionUserId && (
                            <div>
                                <OpenModalButton
                                    modalComponent={<DeleteReviewModal review={review.review}/>}

                                    buttonText='Delete this Review'
                                />
                                <OpenModalButton
                                    modalComponent={<UpdateReviewModal review={review.review}/>}

                                    buttonText='Update Your Review'
                                />
                            </div>
                        )}
                    </div>
                    ))
                )}
                {shouldRenderButton && (

                    <OpenModalButton
                        modalComponent={<SubmitReviewModal game={game}/>}

                        buttonText='Post a Review'
                    />
                )}
            </div>
        </>
    )
}

export default GameStorePage
