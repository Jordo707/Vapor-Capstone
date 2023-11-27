# app/api/game_routes.py

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Game, User, Review, db, Game_Image
from app.forms.game_form import GameForm
from app.forms.image_form import ImageForm

game_routes = Blueprint('games', __name__)

@game_routes.route('/wishlist/<user_id>')
def wishlist_games(user_id):
    """
    Get all the games in the current user's wishlist
    """
    

@game_routes.route('')
def all_games():
    """
    Get all games with their preview images
    """
    games = Game.query.all()

    games_with_images = []

    for game in games:
        preview_image = Game_Image.query.filter_by(game_id=game.id, preview=True).first()

        game_data = {
            'id': game.id,
            'name': game.name,
            'description': game.description,
            'price': game.price,
            'developer_id': game.developer_id,
            'preview_image_url': preview_image.image if preview_image else "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo0nwDRO1dYTQIhm9Sz8sA20Wqk8xaiNyhQg&usqp=CAU",
        }

        games_with_images.append(game_data)

    return {'games': games_with_images}

@game_routes.route('/<game_id>')
def single_game(game_id):
    """
    Get details of a single game and its reviews with user information
    """

    game = Game.query.get(game_id)

    reviews = (
        db.session.query(Review, User)
        .filter(Review.game_id == game_id)
        .join(User, Review.user_id == User.id)
        .all()
    )

    reviews_with_users = [
        {
            "review": review.to_dict(),
            "user": user.to_dict(),
        }
        for review, user in reviews
    ]

    game_images = db.session.query(Game_Image).filter(Game_Image.game_id == game_id).all()

    print('--------------------------')
    print('GAME IMAGES', game_images)
    print('--------------------------')

    game_images_dict = [
        {
            "image": image.to_dict() if image else None
        }
        for image in game_images
    ]

    # Print debug information for each image
    for image_dict in game_images_dict:
        print('Image Dictionary:', image_dict)

    game_data = {
        "game": game.to_dict(),
        "reviews": reviews_with_users,
        "images": game_images_dict
    }

    return game_data

@game_routes.route('', methods=['POST'])
@login_required
def create_game():
    """
    Create a new Game
    """
    print('-------------------------------')
    print('CURRENT USER', current_user.get_id())
    print('-------------------------------')
    user_id = int(current_user.get_id())
    form = GameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        print('--------------------------')
        print('DATA', data)
        print('--------------------------')
        new_game = Game(
            name = data['name'],
            price = data['price'],
            developer_id = user_id,
            description = data['description']
        )
        print('-------------------------------')
        print('NEW GAME', new_game.to_dict())
        print('-------------------------------')
        db.session.add(new_game)
        db.session.commit()
        print('-------------------------------')
        print('NEW GAME', new_game.to_dict()['id'])
        print('-------------------------------')
        new_preview_image = Game_Image(
            image = data['preview_image'],
            preview = True,
            game_id = new_game.to_dict()['id']
        )
        print('-------------------------------')
        print('NEW GAME IMAGE', new_preview_image)
        print('-------------------------------')
        db.session.add(new_preview_image)
        db.session.commit()
        return new_game.to_dict()
    return

@game_routes.route('/<game_id>', methods=['DELETE'])
@login_required
def delete_game(game_id):
    """
    Delete a game
    """
    game_to_delete = Game.query.get(game_id)
    db.session.delete(game_to_delete)
    db.session.commit()
    print('--------------------------------')
    print('GAME ', game_to_delete.id, ' DELETED' )
    print('--------------------------------')
    return {'message':'Game successfully deleted'}

@game_routes.route('/<game_id>', methods=['PUT'])
@login_required
def update_game(game_id):
    form = GameForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        game_to_update = Game.query.get(game_id)
        print('---------------------------------')
        print('GAME TO UPDATE', game_to_update)
        print('---------------------------------')
        data = form.data
        game_to_update.name = data['name']
        game_to_update.price = data['price']
        game_to_update.description = data['description']
        db.session.commit()
        return jsonify(game_to_update.to_dict()), 200
    return 'Failed to Update Game :-('

@game_routes.route('/<game_id>', methods=['POST'])
@login_required
def add_new_images(game_id):
    form = ImageForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        new_image = Game_Image(
            image = data['url'],
            preview = False,
            game_id = game_id
        )
        db.session.add(new_image)
        db.session.commit()
        return new_image.to_dict()
    return 'failed to create new image :-('
