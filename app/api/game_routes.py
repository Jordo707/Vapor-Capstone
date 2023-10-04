# app/api/game_routes.py

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Game, User, Review, db
from app.forms.game_form import GameForm

game_routes = Blueprint('games', __name__)

@game_routes.route('')
def all_games():
    """
    Get all games
    """
    games = Game.query.all()
    return {'games':[game.to_dict() for game in games]}

@game_routes.route('/<game_id>')
def single_game(game_id):
    """
    Get details of a single game
    """
    single_game = Game.query.filter(Game.id == game_id)[0]
    return single_game.to_dict()

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
        new_game = Game(
            name = data['name'],
            price = data['price'],
            developer_id = user_id,
            description = data['description']
        )
        db.session.add(new_game)
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
        return 'Game Updated Successfully'
    return 'Failed to Update Game'
