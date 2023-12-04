from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text

def seed_reviews():
    burnout_review_1 = Review(
        recomended=False,
        game_id=1,
        user_id=3,
        review_text='Unrealistic premise. People can work more than 60 hours a week without issue. Refunded.'
    )
    africanus_review_1 = Review(
        recomended=True,
        game_id=2,
        user_id=2,
        review_text='The gameplay is solid, if not spectacular, but the setting itself really sets it apart from the other grand strategy games out there.'
    )
    spacefield_review_1 = Review(
        recomended=True,
        game_id=3,
        user_id=1,
        review_text="It wasn't the industry-defining standard we were hoping for, but it was certainly fun."
    )
    db.session.add(burnout_review_1)
    db.session.add(africanus_review_1)
    db.session.add(spacefield_review_1)
    db.session.commit()

def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
