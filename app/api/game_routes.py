from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Game, User, Review

game_routes = Blueprint('games', __name__)

@game_routes.route('')
def all_games():
    """
    Get all games
    """
    games = Game.query.all()
    return {'games':[game.to_dict() for game in games]}

