from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

class Wish(db.Model):
    __tablename__ = 'wishes'
    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    #Columns
    id = db.Column(db.Integer, primary_key=True)
    game = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')), nullable=False)
    user = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    #Relationships
    wish_games = db.relationship('Game', back_populates='game_wishes')
    wish_users = db.relationship('User', back_populates='user_wishes')

    def to_dict(self):
        return {
            'id':self.id,
            'game':self.game,
            'user':self.user,
            'created_at':self.created_at,
            'updated_at':self.updated_at
        }
