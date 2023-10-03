from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

class Review(db.Model):
    __tablename__ = 'reviews'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    #Columns
    id = db.Column(db.Integer, primary_key=True)
    recomended = db.Column(db.Boolean, nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    review_text = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    #relationships
    review_game = db.relationship('Game', back_populates='game_reviews')
    reviewer = db.relationship('User', back_populates='user_reviews')

    def to_dict(self):
        return {
            "id": self.id,
            "recomended": self.recomended,
            "game_id": self.game_id,
            "user_id": self.user_id,
            "review_text": self.review_text,
            "created_at": self.created_at,
            "updated_at": self.updated_at,
        }
