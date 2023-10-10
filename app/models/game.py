from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

class Game(db.Model):
    __tablename__ = 'games'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    #Columns
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False, unique=True)
    price = db.Column(db.Float, nullable = False)
    developer_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    description = db.Column(db.String, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    #Relationships
    developer = db.relationship('User', back_populates='developed_games')
    game_reviews = db.relationship('Review', back_populates='review_game', cascade='all, delete-orphan')
    game_pics = db.relationship('Game_Image', back_populates='image_game', cascade='all, delete-orphan')

    def to_dict(self):
        return {
            'id':self.id,
            'name':self.name,
            'price':self.price,
            'developer_id':self.developer_id,
            'description':self.description,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
