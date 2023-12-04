# app/api/wish_routes.py

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Wish, Game, User, db, Game_Image

wish_routes = Blueprint('wishes', __name__)

@wish_routes.route('/<user_id>')
@login_required
def get_user_wishes(user_id):
    """
    Get all wishlist games of current user with their preview images
    """
    print('----------------------------------')
    print('HIT BACKEND WISH GET ROUTE')
    print('----------------------------------')
    try:
        user_id = int(user_id)

        wishes = Wish.query.filter_by(user = user_id).all()

        user_wishes = []
        for wish in wishes:
            game_id = wish.game
            game = Game.query.get(game_id)

            preview_image = Game_Image.query.filter_by(game_id=game_id, Preview=True).first()

            game_data = {
                'id': game.id,
                'name': game.name,
                'description': game.description,
                'price': game.price,
                'developer_id': game.developer_id,
                'preview_image_url': preview_image.image if preview_image else "default_image_url",
            }

            user_wishes.append(game_data)

        return jsonify({'user_wishes': user_wishes})
    except Exception as e:
        print(e)
        return jsonify({'error':'Internal Server Error'}), 500
