from app.models import db, Game, environment, SCHEMA
from sqlalchemy.sql import text

def seed_games():
    burnout = Game(
        name='Burnout',
        price=59.99,
        developer_id=2,
        description='After the entire nation is wrecked by out of control burnout, the survivors must fight to survive. Are you a survivor?')
    africanus = Game(
        name='Africanus',
        price=49.99,
        developer_id=3,
        description='Explore the rich history of Africa. Lead your people to glory in this thrilling grand strategy game from Conundrum Entertainment.')
    space_field = Game(
        name='Space Field',
        price=79.99,
        developer_id=2,
        description='Explore the amazing setting of the 23rd century Milky Way. Face off against pirates, overreaching corperations, or government agents or throw your lot in with them. The galaxy is your oyster.')
    db.session.add(burnout)
    db.session.add(africanus)
    db.session.add(space_field)
    db.session.commit()

def undo_games():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.games RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM games"))

    db.session.commit()
