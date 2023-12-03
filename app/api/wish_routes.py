# app/api/wish_routes.py

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Wish, Game, User, db, Game_Image

wish_routes = Blueprint('wishes', __name__)

# @wish_routes.route()
