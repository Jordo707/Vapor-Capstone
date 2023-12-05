//react-app/src/store/games.js

import { json } from "sequelize"

// Constants
const GET_ALL_GAMES = 'games/GET_ALL_GAMES'
const GET_ONE_GAME = 'games/GET_ONE_GAME'
const GET_USER_OWNED_GAMES ='games/GET_USER__OWNED_GAMES'
const GET_WISHLIST_GAMES ='games/GET_WISHLIST_GAMES'
const ADD_WISH = 'games/ADD_WISH'
const REMOVE_WISH = 'games/REMOVE_WISH'
const EDIT_GAME ='games/EDIT_GAME'
const DELETE_GAME ='games/DELETE_GAME'

// Action Creators
const getGames = (allGames) => ({
    type:GET_ALL_GAMES,
    payload: allGames
})

export const getOneGame = (game) => ({
    type:GET_ONE_GAME,
    payload: game
})

const removeGame = (gameId) => ({
    type:DELETE_GAME,
    payload:gameId
})

const editGame = (gameId) => ({
    type:EDIT_GAME,
    payload:gameId
})

const getWishlist = (wishlist) => ({
    type:GET_WISHLIST_GAMES,
    payload: wishlist
})

const getOwnedGames = (userId) => ({
    type:GET_USER_OWNED_GAMES,
    payload: userId
})

const addWish = (userId,gameId) => ({
    type: ADD_WISH,
    payload: {userId,gameId}
})

// Thunks

export const getAllGames = () => async (dispatch) => {
    const response = await fetch('/api/games')
    console.log('----------------------------------')
    console.log('getAllGames Response: ', response)
    console.log('----------------------------------')

    if (response.ok) {
        const getAllGames = await response.json();
        const allGames = getAllGames.games
        console.log('allGames: ', allGames)
        dispatch(getGames(allGames))
    } else {
        console.log('Could not load games :-(')
    }
}

export const getSingleGame = (gameId) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}`)
    console.log('----------------------------------')
    console.log('getSingleGame Response: ', response)
    console.log('----------------------------------')

    if (response.ok) {
        const singleGame = await response.json()
        dispatch(getOneGame(singleGame))
        return singleGame
    } else {
        console.log(`Couldn't find game :-(`)
    }
}

export const postGame = (game) => async (dispatch) => {
    console.log('POST GAME PAYLOAD', game)
    const response = await fetch('/api/games', {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(game)
    })
    console.log('POST GAME RESPONSE: ', response)
    if(response.ok) {
        const newGame = await response.json();
        console.log("NEW GAME DATA: ", newGame);
        dispatch(getOneGame(newGame.id))
        return newGame
    }
}

export const deleteGame = (gameId) => async (dispatch) => {
    const response = await fetch(`/api/games/${gameId}`, {
        method:'DELETE',
    });
    if (response.ok) {
        dispatch(removeGame(gameId))
        console.log('HIT DELETE GAME THUNK')
        return gameId
    }
}

export const updateGame = (updatedGame) => async (dispatch) => {
    console.log('HIT UPDATE GAME THUNK')
    console.log("THUNK UPDATED GAME ID: ",updatedGame.id)
    const response = await fetch(`/api/games/${updatedGame.id}`, {
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(updatedGame)})
    console.log('UPDATE GAME THUNK RESPONSE: ', response)
    if (response.ok) {
        const updatedGameData = await response.json();
        dispatch(getOneGame(updatedGameData));
        return updatedGameData;
    }
}

export const postGameImage = (gameId) => async (dispatch) => {
    console.log('HIT POST IMAGE THUNK')
    console.log('THUNK NEW IMAGE GAME ID', gameId)
    const response = await fetch(`/api/games/${gameId}`,{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        }
    })
    console.log('THUNK NEW IMAGE POST RESPONSE', response)
    if(response.ok) {
        const newImage = await response.json();
        return newImage;
    }
}

export const getUserWishlist = (userId) => async (dispatch) => {
    console.log('HIT GET USER WISHLIST THUNK');
    console.log('USER ID: ',userId);
    const response = await fetch(`/api/wishes/${userId}`)

    if (response.ok) {
        const wishList = await response.json()
        console.log('----------------------------------')
        console.log('getUserWishlist Response: ', wishList)
        console.log('----------------------------------')
        dispatch(getWishlist(wishList))
        return wishList
    } else {
        console.log(`couldn't load user wishlist :-(`)
    }

}

export const addUserWish = (userId, gameId) => async (dispatch) => {
    console.log('ADD USER WISH THUNK');
    const response = await fetch(`api/wishes/${userId}`,{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(userId, gameId)
    })
}

// Reducer

const initialState = {
    allGames: {},
    selectedGame: {
        game: {},
        reviews: [],
    },
    wishlist: {}
};

export default function gamesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_GAMES:
            return {
                ...state,
                allGames: action.payload,
                selectedGame: {
                    game: {},
                    reviews: [],
                }
            }
        case GET_ONE_GAME:
            return {
                ...state,
                selectedGame: action.payload
            }
        case DELETE_GAME:
            return {
                ...state,
                selectedGame: {}
            }
        case GET_WISHLIST_GAMES:
            return {
                ...state,
                wishlist: action.payload
            }
        default:
            return state;
    }
}
