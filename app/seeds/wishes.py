from app.models import db, Wish, environment, SCHEMA
from sqlalchemy.sql import text

def seed_wishes():
    demo_burnout_wish = Wish(
        game_id = 1,
        user_id = 1
    )
    demo_africanus_wish = Wish(
        game_id = 2,
        user_id = 1
    )
    db.session.add(demo_burnout_wish)
    db.session.add(demo_africanus_wish)
    db.session.commit()

def undo_wishes():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.wishes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text('DELETE FROM wishes'))

    db.session.commit()
