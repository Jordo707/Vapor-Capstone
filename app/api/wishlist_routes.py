# app/api/wishlist_routes.py

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Game, User, db, User_Wishlist

wishlist_routes = Blueprint('user_wishlist', __name__)

@wishlist_routes.route('/<user_id>')
@login_required
def current_wishlist(user_id):
    """
    Get all the games in the current user's wishlist
    """
    wishlist_games = (
        db.session.query(User_Wishlist, Game)
        .filter(User_Wishlist.user_id == user_id)
        .join(Game, User_Wishlist.game_id == Game.id)
        .all()
    )

    return wishlist_games

@wishlist_routes.route('/<user_id>', methods=['POST'])
@login_required
def wish_game(user_id, game_id):
    """
    Add a game to a user's wishlist
    """
    new_wish = User_Wishlist(
        game_id = game_id,
        user_id = user_id
    )
    db.session.add(new_wish)
    db.session.commit()
    return new_wish.to_dict()

@wishlist_routes.route('/<user_id>', methods=['DELETE'])
@login_required
def unwish_game(user_id, game_id):
    """
    Remove a game from a user's wishlist
    """
    wish_to_delete = User_Wishlist.query.filter(user_id == user_id & game_id == game_id).all()[0]
    db.session.delete(wish_to_delete)
    db.session.commit()
    return {'message':'game removed from wishlist'}
