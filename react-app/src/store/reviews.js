// react-app/src/store/reviews.js
import { getOneGame } from './games'

// Constants

// Action Creators

// Thunks

export const postReview = (review) => async (dispatch) => {
    // console.log('HIT POST REVIEW THUNK')
    const response = await fetch(`/api/reviews/${review.game_id}`, {
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(review)
    })
    console.log('POST REVIEW THUNK RESPONSE: ', response)
    if (response.ok) {
        const newReview = await response.json();
        console.log('NEW REVIEW THUNK DATA: ', newReview)
        console.log('NEW REVIEW:', newReview)
        const game = await dispatch(getOneGame(newReview.game_id))
        return game
    }
    return 'Failed to Create New Review :-('
}

export const updateReview = (review) => async (dispatch) => {
    console.log('HIT UPDATE REVIEW THUNK')
    console.log('THUNK UPDATED REVIEW ID', review.id)
    const response = await fetch(`/api/reviews/${review.id}`, {
        method:'PUT',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(review)})
    console.log('UPDATED REVIEW THUNK RESPONSE:', response)
    if (response.ok) {
        const updatedReview = await response.json();
        dispatch(getOneGame(review.id));
        return updatedReview
    }
}

// Reducer
const initialState = {

}

export default function reviewsReducer(state = initialState, action) {
    switch (action.type) {
        default:
            return state;
    }
}
