// react-app/src/store/wishlist.js

// Constants
const GET_USER_WISHLIST = 'wishlist/GET_USER_WISHLIST';
const POST_WISH = 'wishlist/POST_WISH';
const DELETE_WISH = 'wishlist/DELETE_WISH';

// Action Creators
const getUserWishes = (userWishes) => ({
    type: GET_USER_WISHLIST,
    payload: userWishes
})
const unwish = (wishId) => ({
    type:DELETE_WISH,
    payload: wishId
})

// Thunks
export const getUserWishlist = (userId) => async (dispatch) => {
    const response = await fetch(`/api/wishlist/${userId}`)
}

// Reducer
