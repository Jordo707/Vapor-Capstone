# app/api/review_routes.py

from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Review, User, Game, db
from app.forms.review_form import ReviewForm

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/<game_id>', methods=['POST'])
@login_required
def create_review(game_id):
    """
    Create a New Review
    """
    print('----------------------------------')
    print('HIT BACKEND REVIEW POST ROUTE')
    print('----------------------------------')
    user_id = int(current_user.get_id())
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data=form.data
        new_review = Review(
            recomended = data['recomended'],
            game_id = game_id,
            user_id = user_id,
            review_text = data['review_text']
        )
        print('----------------------------------')
        print('NEW_REVIEW', new_review)
        print('----------------------------------')
        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    return

@review_routes.route('/<review_id>', methods=['PUT'])
@login_required
def update_review(review_id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        review_to_update = Review.query.get(review_id)
        print('---------------------------------')
        print('REVIEW TO UPDATE', review_to_update)
        print('---------------------------------')
        data = form.data
        review_to_update.recomended = data['recomended']
        review_to_update.review_text = data['review_text']
        db.session.commit()
        return jsonify(review_to_update.to_dict()), 200
    return 'Failed to Update Review :-('
