//react-app/src/store/games.js

// Constants
const GET_ALL_GAMES = 'games/GET_ALL_GAMES'
const GET_ONE_GAME = 'games/GET_ONE_GAME'
const GET_USER__OWNED_GAMES ='games/GET_USER__OWNED_GAMES'
const GET_WISHLIST_GAMES ='games/GET_WISHLIST_GAMES'
const EDIT_GAME ='games/EDIT_GAME'
const DELETE_GAME ='games/DELETE_GAME'

// Action Creators
const getGames = (allGames) => ({
    type:GET_ALL_GAMES,
    payload: allGames
})

const getOneGame = (game) => ({
    type:GET_ONE_GAME,
    payload: game
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
    } else {
        console.log(`Couldn't find game :-(`)
    }
}

export const postGame = (game) => async (dispatch) => {
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

// Reducer

const initialState = {
    allGames:{},
    selectedGame:{}
}

export default function gamesReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_GAMES:
            return {
                ...state,
                allGames: action.payload
            }
        case GET_ONE_GAME:
            return {
                ...state,
                selectedGame: action.payload
            }
        default:
            return state;
    }
}
