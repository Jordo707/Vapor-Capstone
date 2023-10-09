

from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

class Game_Image(db.Model):
    __tablename__ = 'game_images'

    if environment == 'production':
        __table_args__ = {'schema':SCHEMA}

    # Columns
    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String, nullable=False)
    preview = db.Column(db.Boolean, nullable=False)
    game_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('games.id')), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    # Relationships
    image_game = db.relationship('Game', back_populates='game_pics')

    def to_dict(self):
        return {
            'id':self.id,
            'image':self.image,
            'preview':self.preview,
            'game_id':self.game_id,
            'created_at':self.created_at,
            'updated_at':self.updated_at,
        }
